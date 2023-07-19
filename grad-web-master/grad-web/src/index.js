import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);

export const navLinks = [
    {
        id:'home',
        title: 'Home',
    },
    {
        id:'logins',
        title:'Logins'
    },
    {
        id:'contact',
        title:'Contact Us'
    },
    

]
