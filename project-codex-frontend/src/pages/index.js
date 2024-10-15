import React, { useState } from 'react';
import styles from './Homepage.module.css';

const Home = () => {
  const [sourceLanguage, setSourceLanguage] = useState('English'); // Default language
  const [targetLanguage, setTargetLanguage] = useState('Russian'); // Default target language
  const [query, setQuery] = useState('');
  const [threshold, setThreshold] = useState(5); 
  const [nbMaxResults, setNbMaxResults] = useState(5); 
  const [results, setResults] = useState([]);
  const [translationResult, setTranslationResult] = useState(null);

  // Language options
  const languageOptions = ['English', 'Russian', 'Ukrainian', 'French'];

  // Function to handle fuzzy matching form submission and fetch the API
  const handleFuzzyFetch = async (e) => {
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

  // Function to handle translation request
  const handleTranslationFetch = async (e) => {
    e.preventDefault();

    const body = {
      translation_query: {
        matching_name: query,
        matching_source: sourceLanguage,
      },
      target_language: targetLanguage,
    };

    try {
      const response = await fetch('http://localhost:8000/translate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setTranslationResult(data.results[0]); 
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Drug Name Fuzzy Matching & Translation</h1>
          <p>Your one-stop solution for accurate drug name matching and translation.</p>
        </div>
      </section>

      {/* Fuzzy Matching Section */}
      <div className={styles.content}>
        <form onSubmit={handleFuzzyFetch} className={styles.formContainer}>
          <h2>Fuzzy Matching</h2>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Source Language:</label>
            <select
              className={styles.formInput}
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              required
            >
              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
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
          <h2>Fuzzy Matching Results:</h2>
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

      {/* Translation Section */}
      <div className={styles.content}>
        <form onSubmit={handleTranslationFetch} className={styles.formContainer}>
          <h2>Drug Name Translation</h2>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Target Language:</label>
            <select
              className={styles.formInput}
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              required
            >
              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>Translate Drug Name</button>
        </form>

        {/* Translation Result Section */}
        <div className={styles.results}>
          <h2>Translation Result:</h2>
          {translationResult ? (
            <div>
              <p><strong>Translated Name:</strong> {translationResult.translated_name}</p>
              <p><strong>Source Language:</strong> {translationResult.translated_source}</p>
            </div>
          ) : (
            <p>No translation yet. Submit a query above.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
