import React from 'react';
import Header from './components/Layout/Header';
import Filters from './components/Filters/Filters';
import CallList from './components/CallList/CallList';
import LoadingState from './components/CallList/LoadingState';
import ErrorState from './components/CallList/ErrorState';
import { useCalls } from './hooks/useCalls';
import './styles/main.scss';

const App = () => {
  const { calls, loading, error, handleFilterChange } = useCalls();

  return (
    <div className="app">
      <Header />
      <Filters onFilterChange={handleFilterChange} />
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <CallList calls={calls} />
      )}
    </div>
  );
};

export default App;