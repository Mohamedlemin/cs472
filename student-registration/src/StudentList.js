function StudentList({ students ,deleteStudent }) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Students</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 p-2 text-left">ID</th>
              <th className="border-b-2 p-2 text-left">Name</th>
              <th className="border-b-2 p-2 text-left">Program</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="border-b p-2">{student.id}</td>
                <td className="border-b p-2">{student.name}</td>
                <td className="border-b p-2">{student.program}</td>
                <td className="border-b p-2"> <button className="px-4 py-2 bg-orange-600 text-white rounded"  onClick={() => deleteStudent(Number(student.id))}>Delete</button></td>
              </tr>
              
            
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default StudentList;