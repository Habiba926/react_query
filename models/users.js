import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

const Users = mongoose.models.Users || mongoose.model("Users", UsersSchema);
export default Users