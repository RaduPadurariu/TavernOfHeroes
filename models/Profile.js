import mongoose from "mongoose";

const ProfileSchema = mongoose.Schema ({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    status: {
        type: String,
    },

    gender: {
        type: String,
    },

    nickname: {
        type: String, 
    },

    creationDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Profile', ProfileSchema);