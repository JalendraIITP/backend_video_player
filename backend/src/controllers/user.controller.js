import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import mongoose from 'mongoose'
import { Subscription } from "../models/subscription.model.js"
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch {
        throw new ApiError(500, "Something went wrong")
    }
}
const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists:username,email
    // check for image, check for avatar
    // upload them to cloudinary server
    // create user object = create entry in db
    // remove password from user object
    // check for user creation
    // return user object

    const { fulname, email, username, password } = req.body
    if ([fulname, email, username, password].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All fields must not be empty");
    }
    const existingUser = await User.findOne({ $or: [{ email, username }] })
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }
    let coverImageLocalPath, avatarLocalPath

    if (req.files) {
        if (req.files.avatar && req.files.avatar.length > 0) avatarLocalPath = req.files.avatar[0].path;
        if (req.files.coverImage && req.files.coverImage.length > 0) coverImageLocalPath = req.files.coverImage[0].path;
    }

    if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required")

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) throw new ApiError(400, "Avatar file is required")

    const user = await User.create({
        fulname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) throw new ApiError(500, "Something went wrong");

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"))
})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim() === '')) {
        throw new ApiError(400, "All fields must not be empty");
    }

    const user = await User.findOne({ email })

    if (!user) throw new ApiError(404, "User not found")

    const isMatch = await user.isPasswordCorrect(password)

    if (!isMatch) throw new ApiError(401, "Invalid password")

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options).
        json(
            new ApiResponse(200, {
                user: loggedInUser, accessToken: accessToken, refreshToken: refreshToken
            }, "User Logged In")
        );
})
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        { new: true }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(
            new ApiResponse(200, {
                message: "User Logged Out"
            }, "User Logged Out")
        );
})
const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookie.refreshToken || req.body.refreshToken;
        if (!incomingRefreshToken) {
            throw new ApiError(401, "unauthenticated request");
        }
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }

        if (incomingRefreshToken !== user.refreshToken) throw new ApiError(401, "Invalid Refresh Token")
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options).
            json(
                new ApiResponse(200, {
                    user: user, accessToken: accessToken, refreshToken: refreshToken
                }, "Access Token refreshed successfully")
            );
    } catch (err) {
        throw new ApiError(401, "Invalid Refresh Token")
    }
})
const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isMatch = user.isPasswordCorrect(oldPassword);
    if (!isMatch) throw new ApiError(400, "Invalid Password")
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully")
    )
})
const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200).json(new ApiResponse(200, req.user, "current user"))
})
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fulname, email } = req.body;
    if (!fulname || !email) throw new ApiError(400, "Invalid")
    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: {
            fulname,
            email
        }
    }, { new: true }).select("-password")
    return res.status(200).json(new ApiResponse(200, user, "Account details updated"))
})
const updateAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) throw new ApiError(400, "Missing avatar path")

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url) throw new ApiError(400, "Error uploading avatar");
    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: {
            avatar: avatar.url
        }
    }, { new: true }
    ).select("-password")
    return res.status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully"))
})
const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverLocalPath = req.file?.path;

    if (!coverLocalPath) throw new ApiError(400, "Missing CoverImage path")

    const coverImage = await uploadOnCloudinary(coverLocalPath);
    if (!coverImage?.url) throw new ApiError(400, "Error uploading CoverImage");
    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: {
            coverImage: coverImage.url
        }
    }, { new: true }
    ).select("-password")
    return res.status(200)
        .json(new ApiResponse(200, user, "coverImage updated successfully"))
})
const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params
    if (!username?.trim()) throw new Error(400, "usernames cannot be empty")
    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        }, {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            }
        }, {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo",
            }
        }, {
            $addFields: {
                subscribersCnt: {
                    $size: "$subscribers",
                }, channelsSubscribedToCnt: {
                    $size: "$subscribedTo",
                }, isScuscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false,
                    }
                }
            }
        }, {
            $project: {
                username: 1,
                fulname: 1,
                avatar: 1,
                coverImage: 1,
                isScuscribed: 1,
                subscribersCnt: 1,
                channelsSubscribedToCnt: 1,
                email: 1,
            }
        }
    ])
    if (!channel?.length) throw new Error(404, "Channel not found")
    return res.status(200).json(new ApiResponse(200, channel[0], "Channel found"))
})
const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        }, {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fulname: 1,
                                        username: 1,
                                        avatar: 1,
                                        coverImage: 1
                                    }
                                }
                            ]
                        }
                    }, {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])
    return res
        .status(200)
        .json(new ApiResponse(200, "watchHistory fetched successfully", user[0].watchHistory))
})
const Subscribe = asyncHandler(async (req, res) => {
    const { username } = req.body
    if (!username?.trim()) throw new Error(400, "usernames cannot be empty")
    const user = await User.findOne({ username });
    if (!user) throw new Error(404, "User not found")
    const { subscriber } = req.user;
    const isSubscribed = await Subscription.findOne({ subscriber: subscriber, channel: user });
    if (isSubscribed) throw new ApiError(200, "Already subscribed")
    await Subscription.create({
        subscriber: subscriber,
        channel: user
    })
    res.status(200)
        .json(new ApiResponse(200, "Subscribed successfully"));
})
export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
    Subscribe
}