import React from 'react';
import Nav from './Nav';
import Form from './Form';
import StudentList from './StudentList';
import Footer from './Footer';

function App() {
  const [students, setStudents] = React.useState([
    { id: '116257', name: 'Anna Smith', program: 'MBA' },
    { id: '615789', name: 'John Doe', program: 'Compro' },
    { id: '116868', name: 'Tom Jerryh', program: 'MBA' },
  ]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  return (
    <div className="p-8">
      <Nav />
      <Form addStudent={addStudent} />
      <StudentList students={students} />
      <Footer />
    </div>
  );
}

export default App;