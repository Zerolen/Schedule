import mongoose from 'mongoose';


//определение и описание схемы "LessonSchema"
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
    },

)



//компилирование модели "Lesson" из схемы "LessonSchema"
export default mongoose.model('Lesson', LessonSchema )
