import mongoose from 'mongoose';

//описание схемы для отправки предмета
const LessonSchema = new mongoose.Schema({
    Lesson_Name: {
        type: String,
        required: true,
    },
    Lesson_type_id: {
        type: Boolean,
        required: true
        },
    },
    {
    timestamps:true,
});

export default mongoose.model('Lesson', LessonSchema )
