import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

// import dummyData from './dummy-data';
import endpoint from './endpoint';

import './styles.scss';

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setResponse(null);

    fetch(url)
      .then(res => res.json())
      .then(res => setResponse(res))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [url])

  return [response, loading, error];
}

const Application = () => {
  const [response, loading, error] = useFetch(endpoint + '/characters');

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading && <p>Loading...</p>}
          {response && <CharacterList characters={response.characters} />}
          {error && <p className="error">{JSON.stringify(error)}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
