import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    Lesson_Name: {
        type: String,
        required: true,
    },},
    {
    timestamps:true,
});

export default mongoose.model('User', UserSchema )
