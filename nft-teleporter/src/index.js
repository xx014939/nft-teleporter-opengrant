import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import AccountPage from './components/AccountPage';
import CreateCollectionPage from './components/CreateCollectionPage';
import reportWebVitals from './reportWebVitals';
import LoginPortal from './components/LoginPortal';
import Experiences from './components/Experiences';
import VRExperience from './components/VRExperience';
import ARExperience from './components/ARExperience';
import TwoDExperience from './components/TwoDExperience';
import GLTFScene from './components/GLTFScene';
import ThreeDScene from './components/ThreeDScene';
import GenerateETHWallet from './components/GenerateETHWallet';
import XRTest from './components/3D/XRTest';
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
      <Route path="vr-experience" element={<VRExperience />} />
      <Route path="ar-experience" element={<ARExperience />} />
      <Route path="2d-experience" element={<TwoDExperience />} />
      <Route path="gltf" element={<GLTFScene />} />
      <Route path="3d-experience" element={<ThreeDScene />} />
      <Route path="generate-wallet" element={<GenerateETHWallet/>}/>
      <Route path="xr" element={<XRTest/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
