import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import './css/index.css';
import './css/header.css';
import './css/sorular.css';
import './css/registration.css';
import QuestionProvider from './context/QuestionProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <AuthProvider>
            <QuestionProvider>
                <App />
            </QuestionProvider>
        </AuthProvider>
    </BrowserRouter>
);

