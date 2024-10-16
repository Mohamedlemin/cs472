import express from "express";
import studentController from "../controller/studentController.js";

const router = express.Router();

router.route('/')
    .get(studentController.getAllStudents, studentController.getStudentsByQuerystring)
    .post(express.json(), studentController.createStudent);

router.route('/:id')
    .get(studentController.getStudentById)
    .put(express.json(), studentController.updateStudentById)
    .delete(studentController.deleteStudentById);

export default router;