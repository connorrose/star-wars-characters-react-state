import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

// import dummyData from './dummy-data';
import endpoint from './endpoint';

import './styles.scss';

const createAction = (type, payload = {}) => ({
  type,
  payload,
})

const initialState = {
  result: null,
  loading: false,
  error: null,
}

const LOADING = 'LOADING';
const COMPLETED = 'COMPLETED';
const ERROR = 'ERROR';

const fetchReducer = (state, action) => {
  const { type, payload } = action;
  if (type === LOADING) {
    return {
      result: null,
      loading: true,
      error: null,
    }
  }

  if (type === COMPLETED) {
    return {
      result: payload.response,
      loading: false,
      error: null,
    }
  }

  if (type === ERROR) {
    return {
      result: null,
      loading: false,
      error: payload.error,
    }
  }

  return state;
}

const useFetch = (url) => {
  const [values, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch(createAction(LOADING))

    fetch(url)
      .then(res => res.json())
      .then(response => dispatch(createAction(COMPLETED, { response })))
      .catch(error => dispatch(createAction(ERROR, { error })))
  }, [url])

  return values;
}

const Application = () => {
  const { result, loading, error } = useFetch(endpoint + '/characters');

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading && <p>Loading...</p>}
          {result && <CharacterList characters={result.characters} />}
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
