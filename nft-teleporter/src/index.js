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
import ThreeJS from './components/ThreeJS';
import { Canvas, useFrame } from '@react-three/fiber';
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
      <Route path="threejs" element={
        <div style={{height: '100vh'}}>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ThreeJS position={[-1.2, 0, 0]}/>
          <ThreeJS position={[1.2, 0, 0]} />
        </Canvas>
        </div>
      } />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
