import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import log from 'loglevel';
import  AuthProvider  from './components/AuthContext';
import Routes from "./components/routes/roads";

log.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');

/*This is the main component of my front you can find the stucture of the app*/
export default function App() {
  return (
    <AuthProvider>
      <div className="bg-dark text-white min-vh-100">
        <Routes />
      </div>
    </AuthProvider>
  );
}
