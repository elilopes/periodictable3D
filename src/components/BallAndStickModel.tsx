import React, {useRef, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {ElementData} from '../data/elements';

interface BallAndStickModelProps {
  element: ElementData;
}

export function BallAndStickModel({element}: BallAndStickModelProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const color = element.colorHex || '#38bdf8';

  // Configuração geométrica de acordo com o elemento
  const {atoms, bonds, label} = useMemo(() => {
    const num = element.number;

    // 1. Diatômicos: H, N, O, F, Cl, Br, I
    if ([1, 7, 8, 9, 17, 35, 53].includes(num)) {
      const d = 1.1;
      return {
        atoms: [
          {pos: [-d, 0, 0] as [number, number, number], r: 0.48},
          {pos: [d, 0, 0] as [number, number, number], r: 0.48},
        ],
        bonds: [
          {from: [-d, 0, 0], to: [d, 0, 0]},
        ],
        label: `${element.symbol}₂ (Molécula Diatômica)`,
      };
    }

    // 2. Fósforo P₄ (Tetraedro)
    if (num === 15) {
      const s = 1.1;
      const p1: [number, number, number] = [s, s, s];
      const p2: [number, number, number] = [-s, -s, s];
      const p3: [number, number, number] = [-s, s, -s];
      const p4: [number, number, number] = [s, -s, -s];
      return {
        atoms: [{pos: p1, r: 0.42}, {pos: p2, r: 0.42}, {pos: p3, r: 0.42}, {pos: p4, r: 0.42}],
        bonds: [
          {from: p1, to: p2}, {from: p1, to: p3}, {from: p1, to: p4},
          {from: p2, to: p3}, {from: p2, to: p4}, {from: p3, to: p4},
        ],
        label: 'P₄ (Fósforo Branco Tetraédrico - 60°)',
      };
    }

    // 3. Enxofre S₈ (Anel em Coroa)
    if (num === 16) {
      const rRing = 1.6;
      const hRing = 0.5;
      const ringAtoms: Array<{pos: [number, number, number]; r: number}> = [];
      const ringBonds: Array<{from: [number, number, number]; to: [number, number, number]}> = [];

      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        const y = i % 2 === 0 ? hRing : -hRing;
        ringAtoms.push({
          pos: [Math.cos(ang) * rRing, y, Math.sin(ang) * rRing],
          r: 0.38,
        });
      }
      for (let i = 0; i < 8; i++) {
        ringBonds.push({
          from: ringAtoms[i].pos,
          to: ringAtoms[(i + 1) % 8].pos,
        });
      }
      return {
        atoms: ringAtoms,
        bonds: ringBonds,
        label: 'S₈ (Anel Octogonal em Coroa)',
      };
    }

    // 4. Carbono / Silício / Germânio (Coordenação Tetraédrica sp³)
    if ([6, 14, 32].includes(num)) {
      const dist = 1.35;
      const center: [number, number, number] = [0, 0, 0];
      const t1: [number, number, number] = [dist * 0.577, dist * 0.577, dist * 0.577];
      const t2: [number, number, number] = [-dist * 0.577, -dist * 0.577, dist * 0.577];
      const t3: [number, number, number] = [-dist * 0.577, dist * 0.577, -dist * 0.577];
      const t4: [number, number, number] = [dist * 0.577, -dist * 0.577, -dist * 0.577];
      return {
        atoms: [
          {pos: center, r: 0.44},
          {pos: t1, r: 0.38},
          {pos: t2, r: 0.38},
          {pos: t3, r: 0.38},
          {pos: t4, r: 0.38},
        ],
        bonds: [
          {from: center, to: t1},
          {from: center, to: t2},
          {from: center, to: t3},
          {from: center, to: t4},
        ],
        label: `${element.symbol} (Geometria Tetraédrica - 109,5°)`,
      };
    }

    // 5. Gases Nobres (Monoatômico com esfera central e coordenação de Van der Waals)
    if (element.category === 'gas-nobre') {
      const center: [number, number, number] = [0, 0, 0];
      return {
        atoms: [{pos: center, r: 0.75}],
        bonds: [],
        label: `${element.symbol} (Monoatômico Gás Nobre)`,
      };
    }

    // 6. Metais e outros elementos sólidos: Célula unitária metálica cúbica (BCC/FCC)
    const a = 1.25;
    const vertices: [number, number, number][] = [
      [-a, -a, -a], [a, -a, -a], [a, a, -a], [-a, a, -a],
      [-a, -a, a], [a, -a, a], [a, a, a], [-a, a, a],
      [0, 0, 0], // Átomo central do corpo (BCC)
    ];

    const metalBonds: Array<{from: [number, number, number]; to: [number, number, number]}> = [];
    // Arestas do cubo
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
    edges.forEach(([i1, i2]) => {
      metalBonds.push({from: vertices[i1], to: vertices[i2]});
    });
    // Ligações do átomo central com os vértices
    for (let i = 0; i < 8; i++) {
      metalBonds.push({from: [0, 0, 0], to: vertices[i]});
    }

    return {
      atoms: vertices.map((pos, idx) => ({pos, r: idx === 8 ? 0.42 : 0.32})),
      bonds: metalBonds,
      label: `${element.symbol} (Retículo Cristalino Metálico Cúbico)`,
    };
  }, [element]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Átomos (Esferas) */}
      {atoms.map((at, idx) => (
        <mesh key={`atom-${idx}`} position={at.pos}>
          <sphereGeometry args={[at.r, 32, 32]} />
          <meshStandardMaterial
            color={color}
            metalness={0.4}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* Bastões de Ligação (Cilindros) */}
      {bonds.map((bond, idx) => {
        const vA = new THREE.Vector3(...bond.from);
        const vB = new THREE.Vector3(...bond.to);
        const mid = new THREE.Vector3().addVectors(vA, vB).multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(vB, vA);
        const length = dir.length();
        const orientation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize()
        );

        return (
          <mesh
            key={`bond-${idx}`}
            position={mid.toArray()}
            quaternion={orientation}
          >
            <cylinderGeometry args={[0.07, 0.07, length, 16]} />
            <meshStandardMaterial
              color="#cbd5e1"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
