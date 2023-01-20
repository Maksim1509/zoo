import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import WinnersPage from './pages/WinnersPage';
import Navigation from './components/Navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/winners' element={<WinnersPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
