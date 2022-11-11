import React, { useEffect, useState } from "react";
import {BufferGeometry, Controllers} from '@react-three/xr/dist/Controllers.js'
import {Hands} from '@react-three/xr/dist/Hands.js'
import {RayGrab} from '@react-three/xr/dist/Interactions.js'
import {VRButton, XR} from '@react-three/xr/dist/XR.js'
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Sky, Text } from '@react-three/drei'
import Ground from "./Ground.js";
import axios from 'axios';

function getCookie(cookieName) {
  let cookieValue = document.cookie
  .split('; ')
  .find((row) => row.startsWith(`${cookieName}=`))
  ?.split('=')[1];
  console.log(cookieValue)

  return cookieValue;
}


function NFTModel(props) {
  const gltf = useLoader(GLTFLoader, `https://yourmetaworld.mypinata.cloud/ipfs/${props.Hash}`)
  return <primitive object={gltf.scene} position={[0, 1, 0]} />
}

  function Floor() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    )
  }

  async function getObjectHash() {
    let response = await axios.post('https://shrouded-citadel-26581.herokuapp.com/users/object', {username: `${getCookie('currentUsername')}`})
    return response.data.imageHash
  }


function XRTest() {
  const [hash, setHash] = useState('QmbqbZ32qXUuLdVoMY7EeKqQPDHWaSCnQet25ndog3TJ4K');

  useEffect(() => {
    async function getData() {
      let data = await getObjectHash()
      console.log(data)
      setHash(data)
      return data
    }

    getData()
  }, [])


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
            <NFTModel Hash = {hash}/>
          </RayGrab>
        </XR>
      </Canvas>
    </>
  )
}

export default XRTest;