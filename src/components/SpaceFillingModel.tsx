import React, {useRef, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {ElementData} from '../data/elements';

interface SpaceFillingModelProps {
  element: ElementData;
}

export function SpaceFillingModel({element}: SpaceFillingModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const color = element.colorHex || '#38bdf8';

  // Raio proporcional aproximado de Van der Waals (em unidades da cena: ~0.8 a 1.6)
  const vdwRadius = useMemo(() => {
    // Estimativa baseada no período e massa: elementos maiores têm raio de Van der Waals maior
    const periodFactor = 0.75 + (element.period * 0.14);
    return Math.min(1.5, Math.max(0.7, periodFactor));
  }, [element]);

  // Se for diatômico ou poliátomo, mostra esferas interpenetradas (Calotte)
  const {spheres} = useMemo(() => {
    const num = element.number;
    const r = vdwRadius;

    // Diatômicos: H, N, O, F, Cl, Br, I (duas esferas com sobreposição de Van der Waals)
    if ([1, 7, 8, 9, 17, 35, 53].includes(num)) {
      const overlapDist = r * 0.85; // Interpenetração das calotas
      return {
        spheres: [
          {pos: [-overlapDist, 0, 0] as [number, number, number], r},
          {pos: [overlapDist, 0, 0] as [number, number, number], r},
        ],
      };
    }

    // Carbono / Silício / Germânio: Cluster denso tetraédrico de Van der Waals
    if ([6, 14, 32].includes(num)) {
      const dist = r * 0.82;
      return {
        spheres: [
          {pos: [0, 0, 0] as [number, number, number], r},
          {pos: [dist * 0.577, dist * 0.577, dist * 0.577] as [number, number, number], r: r * 0.95},
          {pos: [-dist * 0.577, -dist * 0.577, dist * 0.577] as [number, number, number], r: r * 0.95},
          {pos: [-dist * 0.577, dist * 0.577, -dist * 0.577] as [number, number, number], r: r * 0.95},
          {pos: [dist * 0.577, -dist * 0.577, -dist * 0.577] as [number, number, number], r: r * 0.95},
        ],
      };
    }

    // Gases Nobres: Esfera única maciça de Van der Waals
    if (element.category === 'gas-nobre') {
      return {
        spheres: [{pos: [0, 0, 0] as [number, number, number], r: r * 1.25}],
      };
    }

    // Metais e sólidos gerais: empacotamento denso de esferas tangentes (Cluster compacto)
    const dist = r * 0.92;
    return {
      spheres: [
        {pos: [0, 0, 0] as [number, number, number], r},
        {pos: [dist, 0, 0] as [number, number, number], r},
        {pos: [-dist, 0, 0] as [number, number, number], r},
        {pos: [0, dist, 0] as [number, number, number], r},
        {pos: [0, -dist, 0] as [number, number, number], r},
        {pos: [0, 0, dist] as [number, number, number], r},
        {pos: [0, 0, -dist] as [number, number, number], r},
      ],
    };
  }, [element, vdwRadius]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {spheres.map((s, idx) => (
        <mesh key={`vdw-${idx}`} position={s.pos}>
          <sphereGeometry args={[s.r, 48, 48]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.15}
            roughness={0.25}
            clearcoat={0.3}
            clearcoatRoughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
