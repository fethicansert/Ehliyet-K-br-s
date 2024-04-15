import React, { useEffect, useState } from 'react'
import QuestionPage from "./components/QuestionPage/QuestionPage";
import AdminPage from "./components/AdminPage/AdminPage";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import Levhalar from './components/Levhalar/Levhalar';
import Register from './components/Register/Register';
import QuestionsMenu from './components/QuestionPage/QuestionsMenu';
// import HomePage from "./components/HomePage/HomePage";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>

        <Route path="/" element={<HomePage />}></Route>
        <Route path='/sofor-okullari' element={<Register />} />
        <Route path='/levhalar' element={<Levhalar />} />
        <Route path='/kaydol' element={<Register />} />


        <Route path="/sorular-menu" element={<QuestionsMenu />}/>

        <Route path='/sorular/:soru' element={<QuestionPage />}></Route>

        <Route path="/admin" element={<AdminPage />}></Route>


      </Routes>

    </div>
  );
}

export default App;
