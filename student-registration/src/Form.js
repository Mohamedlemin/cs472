import React from 'react';

function Form({ addStudent }) {
  const [form, setForm] = React.useState({ id: '', name: '', program: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({ id: '', name: '', program: '' });
  };

  const handleRegister = () => {
    addStudent(form);
    handleReset();
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Create a student</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-lg">id:</label>
          <input
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Enter student id"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-lg">name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter student name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-lg">program:</label>
          <input
            type="text"
            name="program"
            value={form.program}
            onChange={handleChange}
            placeholder="Enter student program"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Reset
          </button>
          <button
            onClick={handleRegister}
            className="px-4 py-2 bg-orange-600 text-white rounded"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;