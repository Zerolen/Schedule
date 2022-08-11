import mongoose from 'mongoose';

//определение и описание схемы "TimeDateSchema"
const TimeDateSchema = new mongoose.Schema({
        TimeDate_id: {
            type: mongoose.SchemaTypes.Number,
            required: true,
        },
        Lesson_id: {
            type: mongoose.SchemaTypes.ObjectId
        },
    },
    {
        timestamps:true,
    },


);

//компилирование модели "Lesson" из схемы "LessonSchema"
export default mongoose.model('TimeDate', TimeDateSchema )
