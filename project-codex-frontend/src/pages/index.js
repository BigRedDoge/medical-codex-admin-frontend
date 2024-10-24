import React, { useState, useEffect } from 'react';
import styles from './Homepage.module.css';
import { Dropdown } from "flowbite-react";

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
    console.log('Fetching fuzzy matching data...');
    console.log('Source Language:', sourceLanguage);
    console.log('Query:', query);
    console.log('Threshold:', threshold);
    console.log('Number of Max Results:', nbMaxResults);
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
    if (e) e.preventDefault();
    console.log('Fetching translation data...');
    console.log('Query:', query);
    console.log('Source Language:', sourceLanguage);
    console.log('Target Language:', targetLanguage);
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

  const MedInput = () => {
    const [dropdownLabel, setDropdownLabel] = useState("Language");
    /*
    <button id="dropdownDefault" data-dropdown-toggle="dropdown1" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{dropdownLabel}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" d="m1 1 4 4 4-4"/>
        </svg>
        </button>

        <div id="dropdown1" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
              {languageOptions.map((language) => (
                <li key={language} className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <button onClick={() => {
                    setSourceLanguage(language);
                    setDropdownLabel(language);
                  }} className="block w-full px-4 py-2 text-left"> {language} </button>
                </li> 
              ))}
            </ul>
        </div>
    */
    return (
      
      <div className="flex flex-col items-center justify-center">
      
        <div className="flex items-end justify-between w-full space-x-4">
          <div className="flex flex-col mx-1">
            <label htmlFor="language-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Select Language: 
            </label>
            <Dropdown label={dropdownLabel}>
              <Dropdown.Header>
                Select Language
              </Dropdown.Header>
                {languageOptions.map((language) => (
                  <Dropdown.Item 
                    key={language}
                    onClick={() => {
                      setSourceLanguage(language);
                      setDropdownLabel(language);
                    }
                  }>
                    {language}
                  </Dropdown.Item>
                ))}
            </Dropdown>
          </div>
          <div className="flex flex-col mx-1">
            <label htmlFor="result-count-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Number of Results: 
            </label>
            <input 
              type="number" 
              id="result-count-input" 
              aria-describedby="helper-text-explanation" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="5" 
              defaultValue="5"
              onChange={(e) => setNbMaxResults(e.target.value)}
              required 
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="threshold-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Threshold: 
            </label>
            <input 
              type="number" 
              id="threshold-input" 
              aria-describedby="helper-text-explanation" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="5" 
              defaultValue="5"
              onChange={(e) => setThreshold(e.target.value)}
              required 
            />
          </div>  
        </div>
        <input 
          type="text" 
          id="large-input" 
          className="block mt-2 w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setQuery(e.target.value)}   
        ></input>
        <button 
          type="button" 
          className="w-full max-w-full mt-2 text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleFuzzyFetch}
        >
          Search for Matching Medications
        </button>
      </div>
    );
  };

  /*
    <div className="flex flex-col mx-1">
      <button className="w-full ml-2 bg-cyan-700 text-white hover:bg-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        Translate Medication
      </button>
    </div>
  */
  const MedResults = () => {
    return (
      <div>
        {results.length > 0 ? (
          <div>
            <div className="mt-2 mb-4 flex flex-row w-full">
              <div className="flex flex-col mx-1">
                <h1 className="font-bold">Matching Results:</h1>
              </div>
              <div className="flex flex-col mx-1 ml-auto">
                <Dropdown label="Target Language">
                  <Dropdown.Header>
                    Select Language
                  </Dropdown.Header>
                    {languageOptions.map((language) => (
                      <Dropdown.Item 
                        key={language}
                        onClick={() => {
                          setSourceLanguage(language);
                          setDropdownLabel(language);
                        }
                      }>
                        {language}
                      </Dropdown.Item>
                    ))}
                </Dropdown>
              </div>
              
            </div>
            {results.map((result, index) => (
              <button key={index}
                className="block w-full px-4 py-1 my-1 text-left bg-gray-100 rounded-lg text-gray-700  hover:bg-gray-200"
                onClick={() => {
                  setQuery(result.matching_name);
                  handleTranslationFetch();
                  console.log(translationResult);
                }}
              >
                {result.matching_name}
              </button>
            ))}
          </div>
        ) : (
          <p>No results yet. Submit a query above.</p>
        )}
      </div>
    );
  };
  /*

  <section className={styles.hero}>
  <div className={styles.heroText}>
    <h1>Drug Name Fuzzy Matching & Translation</h1>
    <p>Your one-stop solution for accurate drug name matching and translation.</p>
  </div>
</section>


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
  */
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto rounded-md px-8 py-3">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Medication Translation</h1>
        <p className="mt-3 mb-5 text-sm text-gray-600 dark:text-gray-400">Your one-stop solution for accurate drug name matching and translation.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
            <MedInput />
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
            <MedResults />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
