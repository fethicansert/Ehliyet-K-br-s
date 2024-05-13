import React, { useEffect, useRef, useState } from 'react'
import QuestionPage from "./components/QuestionPage/QuestionPage";
import AdminPage from "./components/AdminPage/AdminPage";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import Levhalar from './components/Levhalar/Levhalar';
import Register from './components/Register/Register';
import QuestionsMenu from './components/QuestionPage/QuestionsMenu';
import Login from './components/Register/Login';
import SoforOkullari from './components/SoforOkullariPage/SoforOkullari';
import User from './components/User/User';
import RequireAuth from './middleware/RequireAuth';
import PersistLogin from './middleware/PersistLogin';


function App() {
 
  const [isClose, setIsClose] = useState(true);
  const appRef = useRef();

  return (
    <div className="App" ref={appRef} onClick={() => setIsClose(true)}>

      <Header isClose={isClose} setIsClose={setIsClose} />

      <Routes>

        <Route element={<PersistLogin />}>

          <Route path="/" element={<HomePage />} />

          <Route path='/kaydol' element={<Register />} />

          <Route path='/giris-yap' element={<Login />} />

          <Route path='/sofor-okullari' element={<SoforOkullari />} />

          <Route path='/levhalar' element={<Levhalar />} />

          <Route path="/sorular" element={<QuestionsMenu />} />

          <Route path='/sorular/:soru_param' element={<QuestionPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/user" element={<User />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

        </Route>

        <Route path='*' element={<p>Missing Page</p>} />

      </Routes>

    </div>
  );
}

export default App;
