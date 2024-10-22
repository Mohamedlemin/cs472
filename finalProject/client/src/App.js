// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [term, setTerm] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [popularTerms, setPopularTerms] = useState([]);
  const [error, setError] = useState(null);
  const [counter, setCounter] = useState(25);

  useEffect(() => {
    const fetchPopularTerms = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/popular');
        setPopularTerms(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPopularTerms();

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter === 1) {
          fetchPopularTerms();
          return 25;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term) {
      setError('Please enter a term to search');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/search?term=${term}`);
      setDefinitions(response.data);
      setError(null);
    } catch (err) {
      setError('Term not found');
      setDefinitions([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Online English Dictionary</h1>
      <form onSubmit={handleSearch} className="w-full max-w-md mb-6">
        <div className="flex items-center border-b border-blue-500 py-2">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for a term"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Search
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {definitions.length > 0 && (
        <div className="w-full min-w-md bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Definitions:</h2>
          <ul className="list-none">
            {definitions.map((entry, index) => (
              <li key={index} className="mb-4">
                <div className="text-lg font-bold text-gray-800">Word : {entry.word}</div>
                {entry.wordtype && (
                  <div className="text-md text-gray-500 italic">Word Type : {entry.wordtype}</div>
                )}
                <div className="text-gray-700">Definition : {entry.definition}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Popular Terms (refreshing in {counter}s)</h2>
        <ol className="list-disc list-inside">
          {popularTerms.map((term, index) => (
            <li key={index} className="mb-2">{term}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;