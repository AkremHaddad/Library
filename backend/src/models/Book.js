import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
        },
        comment:
        {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model("Book", bookSchema)

export default Book