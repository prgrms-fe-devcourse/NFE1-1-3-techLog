import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PATH from './constants/path';
import Main from './pages/main';
import MainLayout from './components/Layout/MainLayout';
import DefaultLayout from './components/Layout/DefaultLayout';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={PATH.LOGIN} element={<DefaultLayout />}>
          <Route index element={<Login />} />
        </Route>
        {/* <Route path={PATH.SIGNUP} element={<DefaultLayout />}>
          <Route index element={<Signup />} />
        </Route> */}
        <Route path={PATH.MAIN} element={<MainLayout />}>
          <Route index element={<Main />} />
        </Route>
        {/* <Route path={PATH.MYPAGE} element={<MainLayout />}>
          <Route path=":userId" element={<Mypage />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
