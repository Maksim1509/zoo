import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import WinnersPage from './pages/WinnersPage';
import Navigation from './components/Navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/winners' element={<WinnersPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
