const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")
const intExamModel = require("./models/exam")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://adhy:kannan123@cluster0.v6yc0yl.mongodb.net/internalMarkDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/calculate", (request, response) => {
    const name = (request.body.name)
    const admno = (request.body.admno)
    const batch = (request.body.batch)
    const present = parseInt(request.body.present)
    const totalPresent = parseInt(request.body.totalp)
    const exam1 = parseInt(request.body.exam1)
    const totalExam1 = parseInt(request.body.totalExam1)
    const exam2 = parseInt(request.body.exam2)
    const totalExam2 = parseInt(request.body.totalExam2)
    const assignment1 = parseInt(request.body.assignment1)
    const assignment2 = parseInt(request.body.assignment2)
    const attendance = Math.ceil((present / totalPresent) * 8)
    const firstExam = Math.ceil((exam1 / totalExam1) * 10)
    const secondExam = Math.ceil((exam2 / totalExam2) * 10)
    const assignment = Math.ceil(assignment1 + assignment2)
    const total = Math.ceil(attendance + firstExam + secondExam + assignment)

    let data_store = new intExamModel(
        {
            name: name,
            admno: admno,
            batch: batch,
            present: present,
            totalPresent: totalPresent,
            exam1: exam1,
            totalExam1: totalExam1,
            exam2: exam2,
            totalExam2: totalExam2,
            assignment1: assignment1,
            assignment2: assignment2,
            assignment: assignment,
            total: total
        }
    )

    data_store.save()


    response.json({ "internalMark": total, "attandance": attendance, "Exam": firstExam + secondExam, "assignment": assignment, "name": name, "admno": admno, "batch": batch })
})

app.get("/viewall",(request,response)=>{
    intExamModel.find().then(
        (items)=>{
            response.json(items)
        }
    ).catch()
})

app.listen(4000, () => { console.log("Server is running") })