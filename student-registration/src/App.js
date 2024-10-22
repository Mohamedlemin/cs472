import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Form from './Form';
import StudentList from './StudentList';
import Footer from './Footer';
import Exo1 from './exo1';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const addStudent = (student) => {
    setLoading(true);
    fetch('http://localhost:3001/api/v1/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Student added:', data); // Debugging log
      setStudents((prevStudents) => [...prevStudents, data]);
    })
    .catch((error) => {
      console.error('Error adding student:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const deleteStudent = (id) => {
    setLoading(true);
    fetch(`http://localhost:3001/api/v1/students/${id}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting student:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const getStudents = () => {
    setLoading(true);
    fetch('http://localhost:3001/api/v1/students')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Fetched students:', data); // Debugging log
      setStudents(data);
    })
    .catch((error) => {
      console.error('Error fetching students:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="p-8">
      <Exo1/>
      {/* <Nav />
      {loading ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading...</h2>
        </div>
      ) : (
        <>
          <Form addStudent={addStudent} />
          <StudentList students={students} deleteStudent={deleteStudent} />
        </>
      )}
      <Footer /> */}
    </div>
  );
}

export default App;