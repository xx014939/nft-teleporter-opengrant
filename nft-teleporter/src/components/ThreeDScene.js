import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Ground from "./3D/Ground.js";
import Model from '../GLTF/Model.js'



function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color arg={[0, 0, 0]} attach=" background"/>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={3}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Model position={[0, 1.25, 0]}/>
      <Ground />
    </>
  )
}


function ThreeDScene() {
  return (
    <div style={{height: '100vh'}}>
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
    <div style={{color: 'white', background: 'transparent', position: 'fixed', bottom: '250px', paddingLeft: '50px'}}>
      <h2>NFT STATS</h2>
      <div>Example Attribute One - Value</div>
      <div>Example Attribute Two - Value</div>
      <div>Example Attribute Three - Value</div>
    </div>
    </div>
  )
}

export default ThreeDScene;