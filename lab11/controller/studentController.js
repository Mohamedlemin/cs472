import Student from "../model/student.js";

const studentController = {
    getAllStudents: (req, res) => {
        const students = Student.getAll();
        res.status(200).json(students);
    },
    getStudentsByQuerystring: (req, res) => {
        const students = Student.getStudentsByQuery(req.query);
        res.status(200).json(students);
    },
    getStudentById: (req, res) => {
        const id = Number(req.params.id);
        const student = Student.getStudentById(id);
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    },
    createStudent: (req, res) => {
        const { id, name, program } = req.body;
        if (id && name && program) {
            const student = new Student(id, name, program);
            if (student.create()) {
                res.status(201).json({ message: "Student created" });
            } else {
                res.status(409).json({ message: "Student already exists" });
            }
        } else {
            res.status(400).json({ message: "Please provide all required information" });
        }
    },
    deleteStudentById: (req, res) => {
        const id = Number(req.params.id);
        if (Student.deleteStudentById(id)) {
            res.status(200).json({ message: "Student deleted" });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    },
    updateStudentById: (req, res) => {
        const id = Number(req.params.id);
        const { name, program } = req.body;
        if (name || program) {
            if (Student.updateStudentById(id, { name, program })) {
                res.status(200).json({ message: "Student updated" });
            } else {
                res.status(404).json({ message: "Student not found" });
            }
        } else {
            res.status(400).json({ message: "Please provide at least one field to update" });
        }
    },
};

export default studentController;