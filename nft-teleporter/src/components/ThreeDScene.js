import React, { useEffect } from "react";
import { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// import backgroundPNG from '../HDR/background.png'
// import background from '../HDR/background.hdr'
import Model from '../GLTF/Model.js'

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);

      controls.minDistance = 3;
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

function ThreeDScene() {
  return (
    <div style={{height: '100vh'}}>
      <Canvas>
      <CameraController />
      <ambientLight />
        <Suspense fallback={null}>
          <Model/>
          <spotLight intensity={0.3} position={[5, 10, 50]} />
          <Environment preset="sunset" background/>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeDScene;