import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory, Subscribe } from "../controllers/user.controller.js";
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'coverImage',
            maxCount: 1
        }
    ]), registerUser)

router.route('/login').post(loginUser)

router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refresh').post(refreshAccessToken)
router.route('/change').post(verifyJWT, changeCurrentPassword)
router.route('/currentUser').post(verifyJWT, getCurrentUser);
router.route('/updatedetails').patch(verifyJWT, updateAccountDetails);
router.route('/avatar').post(verifyJWT, upload.single('avatar'), updateAvatar);
router.route('/coverImage').post(verifyJWT, upload.single('coverImage'), updateUserCoverImage);
router.route('/:username').get(verifyJWT, getUserChannelProfile)
router.route('/history').get(verifyJWT, getWatchHistory)
router.route('/subscribe').post(verifyJWT, Subscribe)
export default router