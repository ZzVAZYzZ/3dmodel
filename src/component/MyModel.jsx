import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import PathModel from '../assets/3Dmodel/hakos.glb';
import { Stats, OrbitControls } from '@react-three/drei';
import useSound from 'use-sound';
import playdice from "../assets/3Dmodel/kawaii_sound.mp3";

function AnimatedModel() {
  const groupRef = useRef();
  const gltf = useLoader(GLTFLoader, PathModel);
  const [isAnimationPaused, setAnimationPaused] = useState(false);
  const [play, { stop, pause, isPlaying }] = useSound(playdice);
  const [isSoundPaused, setSoundPaused] = useState(false);


  useFrame((state, delta) => {
    // Logic để thực hiện hoạt ảnh
    if (!isAnimationPaused) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  const handleSceneClick = () => {
    // Khi click vào scene, thay đổi trạng thái hoạt ảnh và điều khiển âm thanh
    if (isPlaying && !isSoundPaused) {
      pause(); // Tạm dừng âm thanh nếu đang phát
      setSoundPaused(true);
    } else {
      stop(); // Dừng và chuẩn bị phát lại âm thanh
      setSoundPaused(false);
      play();
    }
    setAnimationPaused(!isAnimationPaused); // Đảo ngược trạng thái hoạt ảnh
  };

  return (
    <group ref={groupRef} onClick={handleSceneClick}>
      <directionalLight position={[40, 1.0, 4.4]} castShadow />
      <primitive object={gltf.scene} position={[0, -0.15, 0]} rotation-y={Math.PI / 2} />
      <OrbitControls target={[0, 1, 0]} />
      <Stats />
    </group>
  );
}

function Model3D() {
  return (
    <>
      <div style={{ width: "500px", margin: "0 auto", textAlign: "center", color: "red" }}>
        <h1>HAKOS</h1>
      </div>
      <Canvas
        camera={{ position: [2, 1, 0] }}
        shadows
        style={{ width: "500px", height: "500px", border: "1px solid #333", margin: "0 auto" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedModel />
      </Canvas>
    </>
  );
}

export default Model3D;