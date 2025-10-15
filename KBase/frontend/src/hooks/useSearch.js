import { useState } from 'react';

const ENDPOINT = 'http://localhost:4000/api/search';

export default function useSearch() {
  const [results, setResults] = useState([]);

  function run(q) {
    if (!q) {
      setResults([]);
      return;
    }
    fetch(`${ENDPOINT}?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((data) => setResults(data));
  }

  return { results, run };
}