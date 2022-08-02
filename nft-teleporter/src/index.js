import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import AccountPage from './components/AccountPage';
import CreateCollectionPage from './components/CreateCollectionPage';
import reportWebVitals from './reportWebVitals';
import LoginPortal from './components/LoginPortal';
import Experiences from './components/Experiences';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById("root")
);


function StartPage() {
  return (
    <LoginPortal stateCount={1}/>
  )
}

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="account" element={<AccountPage />} />
      <Route path="create-collection" element={<CreateCollectionPage />} />
      <Route path="experiences" element={<Experiences />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
