import {useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import {Text} from '@react-three/drei';
import * as THREE from 'three';
import {ElementData} from '../data/elements';

interface ElementSphereProps {
  element: ElementData;
  position: [number, number, number];
  onClick: (element: ElementData) => void;
}

export function ElementSphere({element, position, onClick}: ElementSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh
      position={position}
      ref={meshRef}
      onClick={() => onClick(element)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'cyan'} />
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {element.symbol}
      </Text>
    </mesh>
  );
}
