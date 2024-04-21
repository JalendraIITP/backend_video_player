import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
const videoSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        likes: {
            type: Number,
            default: 0
        },
        dislikes: {
            type: Number,
            default: 0
        },
        comments: {
            type: Array,
            default: []
        }, isPublished: {
            type: Boolean,
            default: false
        }, owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    }, {
    timestamps: true
}
)

videoSchema.plugin(mongooseAggregatePaginate({}))
export const Videos = mongoose.model('Videos', videoSchema);