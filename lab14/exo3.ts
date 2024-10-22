// Student.ts
class Student {
    studentId: number;
    answers: Question[];
  
    constructor(studentId: number) {
      this.studentId = studentId;
      this.answers = [];
    }
  
    addAnswer(question: Question): void {
      this.answers.push(question);
    }
  }
  
  // Question.ts
  class Question {
    qid: number;
    answer: string;
  
    constructor(qid: number, answer: string) {
      this.qid = qid;
      this.answer = answer;
    }
  
    checkAnswer(answer: string): boolean {
      return this.answer === answer;
    }
  }
  
  // Quiz.ts
  class Quiz {
    questions: Map<number, string>;
    students: Student[];
  
    constructor(questions: Question[], students: Student[]) {
      this.questions = new Map<number, string>();
      questions.forEach(question => {
        this.questions.set(question.qid, question.answer);
      });
      this.students = students;
    }
  
    scoreStudentBySid(sid: number): number {
      const student = this.students.find(student => student.studentId === sid);
      if (!student) return 0;
  
      let score = 0;
      student.answers.forEach(answer => {
        if (this.questions.get(answer.qid) === answer.answer) {
          score++;
        }
      });
      return score;
    }
  
    getAverageScore(): number {
      const totalScore = this.students.reduce((sum, student) => {
        return sum + this.scoreStudentBySid(student.studentId);
      }, 0);
      return totalScore / this.students.length;
    }
  }
  

  const student1 = new Student(10);
  student1.addAnswer(new Question(2, 'a'));
  student1.addAnswer(new Question(3, 'b'));
  student1.addAnswer(new Question(1, 'b'));
  
  const student2 = new Student(11);
  student2.addAnswer(new Question(3, 'b'));
  student2.addAnswer(new Question(2, 'a'));
  student2.addAnswer(new Question(1, 'd'));
  
  const students = [student1, student2];
  const questions = [new Question(1, 'b'), new Question(2, 'a'), new Question(3, 'b')];
  const quiz = new Quiz(questions, students);
  
  let scoreforStudent10 = quiz.scoreStudentBySid(10);
  console.log(scoreforStudent10); 
  
  let scoreforStudent11 = quiz.scoreStudentBySid(11);
  console.log(scoreforStudent11); 
  
  let average = quiz.getAverageScore();
  console.log(average); 