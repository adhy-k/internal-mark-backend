const mongoose = require("mongoose")
const intExamSchema = mongoose.Schema(
    {
        name: String,
        admno: String,
        batch: String,
        present: String,
        totalPresent: String,
        exam1: String,
        totalExam1: String,
        exam2: String,
        totalExam2: String,
        assignment1: String,
        assignment2: String,
        assignment: String,
        total: String
    }
)
const intExamModel = mongoose.model("internalMarks",intExamSchema)
module.exports=intExamModel