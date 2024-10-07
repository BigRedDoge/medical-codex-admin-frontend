import React, { useState } from 'react';

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [query, setQuery] = useState('');
  const [threshold, setThreshold] = useState(5); 
  const [nbMaxResults, setNbMaxResults] = useState(5); 
  const [results, setResults] = useState([]);

  // Function to handle form submission and fetch the API
  const handleFetch = async (e) => {
    e.preventDefault();

    const body = {
      source_language: sourceLanguage,
      query: query,
      threshold: threshold,
      nb_max_results: nbMaxResults,
    };

    try {
      const response = await fetch('http://localhost:8000/fuzzymatching/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setResults(data.results); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Drug Name Fuzzy Matching</h1>

     
      <form onSubmit={handleFetch}>
        <div>
          <label>Source Language:</label>
          <input
            type="text"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            placeholder="Enter source language"
            required
          />
        </div>

        <div>
          <label>Query (Drug Name):</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter drug name"
            required
          />
        </div>

        <div>
          <label>Threshold:</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="Enter threshold"
          />
        </div>

        <div>
          <label>Number of Max Results:</label>
          <input
            type="number"
            value={nbMaxResults}
            onChange={(e) => setNbMaxResults(e.target.value)}
            placeholder="Max results"
          />
        </div>

        <button type="submit">Fetch Matching Drugs</button>
      </form>

     
      <div>
        <h2>Results:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>Name:</strong> {result.matching_name} <br />
                <strong>Source:</strong> {result.matching_source} <br />
                <strong>UID:</strong> {result.matching_uid}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results yet. Submit a query above.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
