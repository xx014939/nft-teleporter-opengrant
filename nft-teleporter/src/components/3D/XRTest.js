import {BufferGeometry, Controllers} from '@react-three/xr/dist/Controllers.js'
import {Hands} from '@react-three/xr/dist/Hands.js'
import {RayGrab} from '@react-three/xr/dist/Interactions.js'
import {VRButton, XR} from '@react-three/xr/dist/XR.js'
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Sky, Text } from '@react-three/drei'
import Ground from "./Ground.js";


function NFTModel() {
    const gltf = useLoader(GLTFLoader, `https://yourmetaworld.mypinata.cloud/ipfs/QmbqbZ32qXUuLdVoMY7EeKqQPDHWaSCnQet25ndog3TJ4K`)
    return <primitive object={gltf.scene} position={[-1.5, 1, 0]} />
  }

  function Floor() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    )
  }

function XRTest() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
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
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Controllers />
          <Hands />
          <RayGrab>
                <NFTModel/>
          </RayGrab>
        </XR>
      </Canvas>
    </>
  )
}

export default XRTest;