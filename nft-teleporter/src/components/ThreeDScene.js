import React, { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Ground from "./3D/Ground.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import axios from 'axios';

// GLB BEE - https://yourmetaworld.mypinata.cloud/ipfs/QmQPx8kUf99uNC88Hu7sk5w15YmzAs9ARfKGpdVQLR7tGZ
// GLTF HELMET - https://yourmetaworld.mypinata.cloud/ipfs/QmbqbZ32qXUuLdVoMY7EeKqQPDHWaSCnQet25ndog3TJ4K
// GLB TROLLEY - https://yourmetaworld.mypinata.cloud/ipfs/QmfGcoY5KehXkUjNsQTEApFnNLAkwqLF9S2PntcokW2RvF 

function getCookie(cookieName) {
  let cookieValue = document.cookie
  .split('; ')
  .find((row) => row.startsWith(`${cookieName}=`))
  ?.split('=')[1];
  console.log(cookieValue)

  return cookieValue;
}


function NFTModel(props) {
  console.log('COMPONENT STARTING')

  const gltf = useLoader(GLTFLoader, `https://yourmetaworld.mypinata.cloud/ipfs/${props.Hash}`)
  return <primitive object={gltf.scene} position={[0, 1, 0]} />
}

function CarShow() {

  const [hash, setHash] = useState('QmbqbZ32qXUuLdVoMY7EeKqQPDHWaSCnQet25ndog3TJ4K');

  async function getObjectHash() {
    let response = await axios.post('https://shrouded-citadel-26581.herokuapp.com/users/object', {username: `${getCookie('currentUsername')}`})
    return response.data.imageHash
  }

  useEffect(() => {
    async function getData() {
      let data = await getObjectHash()
      console.log(data)
      setHash(data)
      return data
    }

    getData()
    // objectHash = getData().catch(console.error)
    // objectReady = true
    console.log(hash, 'NEW HASH VALUE')
  }, [])

  //const objectHash = getObjectHash().catch(console.error);

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
      <NFTModel Hash = {hash}/>
      <Ground />
    </>
  )
}


function ThreeDScene() {
  return (
    <div style={{height: '100vh'}}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
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