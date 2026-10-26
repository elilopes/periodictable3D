import React, {useRef, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {ElementData} from '../data/elements';

interface QuantumOrbitalModelProps {
  element: ElementData;
}

export function QuantumOrbitalModel({element}: QuantumOrbitalModelProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const lobesGroupRef = useRef<THREE.Group>(null!);

  // Determina se o átomo possui orbitais p, d, f com base no número atômico
  const hasPOrbitals = element.number >= 5; // A partir do Boro (Z=5)
  const hasDOrbitals = element.number >= 21; // A partir do Escândio (Z=21)

  // Gera nuvem estocástica de pontos quânticos com base na densidade de probabilidade radial |ψ|²
  const {positions, colors} = useMemo(() => {
    const pointCount = 2800;
    const posArray = new Float32Array(pointCount * 3);
    const colorArray = new Float32Array(pointCount * 3);

    const baseColor = new THREE.Color(element.colorHex || '#38bdf8');
    const phasePlus = new THREE.Color('#38bdf8'); // Fase positiva da função de onda
    const phaseMinus = new THREE.Color('#f43f5e'); // Fase negativa da função de onda

    for (let i = 0; i < pointCount; i++) {
      let x = 0, y = 0, z = 0;
      let col = baseColor;

      // Sorteia o tipo de orbital para distribuir a probabilidade
      const rand = Math.random();

      if (hasDOrbitals && rand > 0.6) {
        // Lóbulos d (em forma de trevo nos planos xy, yz, xz)
        const angle = Math.random() * Math.PI * 2;
        const r = (0.8 + Math.sqrt(-2 * Math.log(Math.max(0.001, Math.random()))) * 0.7);
        // Modulação quadrática d_xy: sin(2*theta)
        const clover = Math.sin(2 * angle);
        x = r * Math.cos(angle) * Math.abs(clover) * 1.4;
        y = r * Math.sin(angle) * Math.abs(clover) * 1.4;
        z = (Math.random() - 0.5) * 0.6;
        col = clover >= 0 ? phasePlus : phaseMinus;
      } else if (hasPOrbitals && rand > 0.25) {
        // Halteres orbitais p (p_x, p_y ou p_z)
        const axis = Math.floor(Math.random() * 3);
        const sign = Math.random() > 0.5 ? 1 : -1;
        // Distribuição ao longo do eixo com espessura radial
        const length = 0.5 + Math.sqrt(-2 * Math.log(Math.max(0.001, Math.random()))) * 0.9;
        const spread = (Math.random() - 0.5) * 0.55 * Math.sin((length / 2.5) * Math.PI);

        if (axis === 0) {
          x = sign * length;
          y = spread;
          z = (Math.random() - 0.5) * 0.55;
        } else if (axis === 1) {
          y = sign * length;
          x = spread;
          z = (Math.random() - 0.5) * 0.55;
        } else {
          z = sign * length;
          x = spread;
          y = (Math.random() - 0.5) * 0.55;
        }
        col = sign > 0 ? phasePlus : phaseMinus;
      } else {
        // Orbital s esférico (gaussiana radial central)
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        // Distribuição radial exponencial tipo Slater
        const r = 0.2 + (-Math.log(Math.max(0.001, Math.random())) * 0.7);
        const sinPhi = Math.sin(phi);
        x = r * sinPhi * Math.cos(theta);
        y = r * sinPhi * Math.sin(theta);
        z = r * Math.cos(phi);
        col = baseColor;
      }

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      colorArray[i * 3] = col.r;
      colorArray[i * 3 + 1] = col.g;
      colorArray[i * 3 + 2] = col.b;
    }

    return {positions: posArray, colors: colorArray};
  }, [element, hasPOrbitals, hasDOrbitals]);

  // Animação quântica suave de pulsação e precessão
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.25;
      pointsRef.current.rotation.x += delta * 0.12;
    }
    if (lobesGroupRef.current) {
      lobesGroupRef.current.rotation.y += delta * 0.25;
      lobesGroupRef.current.rotation.x += delta * 0.12;
      const pulse = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.03;
      lobesGroupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* Luz focal interna do núcleo quântico */}
      <pointLight position={[0, 0, 0]} intensity={3} color={element.colorHex || '#38bdf8'} distance={8} />

      {/* Núcleo Atômico Quântico Pontual */}
      <mesh>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive={element.colorHex || '#38bdf8'}
          emissiveIntensity={1.0}
          roughness={0.1}
        />
      </mesh>

      {/* Nuvem probabilística de elétrons (Point Cloud com densidade |ψ|²) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Superfícies de Contorno Quântico Isossuperficiais dos Orbitais s e p */}
      <group ref={lobesGroupRef}>
        {/* Orbital s central translúcido */}
        <mesh>
          <sphereGeometry args={[1.0, 32, 32]} />
          <meshStandardMaterial
            color={element.colorHex || '#38bdf8'}
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.1}
            depthWrite={false}
          />
        </mesh>

        {/* Lobos de orbitais p (se Z >= 5) */}
        {hasPOrbitals && (
          <group>
            {/* Lobo p_x positivo */}
            <mesh position={[1.3, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.55, 1.2, 24]} />
              <meshStandardMaterial color="#38bdf8" transparent opacity={0.22} depthWrite={false} />
            </mesh>
            {/* Lobo p_x negativo */}
            <mesh position={[-1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <coneGeometry args={[0.55, 1.2, 24]} />
              <meshStandardMaterial color="#f43f5e" transparent opacity={0.22} depthWrite={false} />
            </mesh>

            {/* Lobo p_y positivo */}
            <mesh position={[0, 1.3, 0]}>
              <coneGeometry args={[0.55, 1.2, 24]} />
              <meshStandardMaterial color="#38bdf8" transparent opacity={0.22} depthWrite={false} />
            </mesh>
            {/* Lobo p_y negativo */}
            <mesh position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.55, 1.2, 24]} />
              <meshStandardMaterial color="#f43f5e" transparent opacity={0.22} depthWrite={false} />
            </mesh>

            {/* Lobo p_z positivo */}
            <mesh position={[0, 0, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.55, 1.2, 24]} />
              <meshStandardMaterial color="#38bdf8" transparent opacity={0.22} depthWrite={false} />
            </mesh>
            {/* Lobo p_z negativo */}
            <mesh position={[0, 0, -1.3]} rotation={[-Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.55, 1.2, 24]} />
              <meshStandardMaterial color="#f43f5e" transparent opacity={0.22} depthWrite={false} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}
