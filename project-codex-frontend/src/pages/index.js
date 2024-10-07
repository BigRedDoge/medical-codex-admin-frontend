import React, { useState } from 'react';
import styles from './Homepage.module.css';

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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Drug Name Fuzzy Matching</h1>
          <p>Your one-stop solution for accurate drug name matching.</p>
        </div>
      </section>

      {/* Content Section */}
      <div className={styles.content}>
        <form onSubmit={handleFetch} className={styles.formContainer}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Source Language:</label>
            <input
              type="text"
              className={styles.formInput}
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              placeholder="Enter source language"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Query (Drug Name):</label>
            <input
              type="text"
              className={styles.formInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter drug name"
              required
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Threshold:</label>
            <input
              type="number"
              className={styles.formInput}
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              placeholder="Enter threshold"
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Number of Max Results:</label>
            <input
              type="number"
              className={styles.formInput}
              value={nbMaxResults}
              onChange={(e) => setNbMaxResults(e.target.value)}
              placeholder="Max results"
            />
          </div>

          <button type="submit" className={styles.submitButton}>Fetch Matching Drugs</button>
        </form>

        {/* Results Section */}
        <div className={styles.results}>
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
    </div>
  );
};

export default Home;