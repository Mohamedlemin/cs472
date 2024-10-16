const students = [
    { id: 116257, name: "Anna Smith", program: "MBA" },
    { id: 615789, name: "John Doe", program: "Compro" },
    { id: 116868, name: "Tom Jerryh", program: "MBA" },
];

export default class Student {
    constructor(id, name, program) {
        this.id = id;
        this.name = name;
        this.program = program;
    }

    static getAll() {
        return structuredClone(students);
    }

    static getStudentById(id) {
        return students.find(e => e.id === id);
    }

    static deleteStudentById(id) {
        const index = students.findIndex(e => e.id === id);
        if (index !== -1) {
            students.splice(index, 1);
            return true;
        }
        return false;
    }

    static updateStudentById(id, data) {
        const student = students.find(e => e.id === id);
        if (student) {
            Object.assign(student, data);
            return true;
        }
        return false;
    }

    static getStudentsByQuery(query) {
        let filteredStudents = structuredClone(students);

        // Filter by name or program if provided
        if (query.name) {
            filteredStudents = filteredStudents.filter(student => student.name.toLowerCase().includes(query.name.toLowerCase()));
        }
        if (query.program) {
            filteredStudents = filteredStudents.filter(student => student.program.toLowerCase() === query.program.toLowerCase());
        }

        // Sort by name or program if specified
        if (query.sortBy) {
            const sortKey = query.sortBy;
            filteredStudents.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        }

        return filteredStudents;
    }

    create() {
        const student = students.find(e => e.id === this.id);
        if (!student) {
            students.push(this);
            return true;
        }
        return false;
    }
}