import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
/*This is the main classof my application where the component app is call and render */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(   
    <React.StrictMode>
        <App />
    </React.StrictMode>
); 

reportWebVitals();
