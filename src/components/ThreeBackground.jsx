import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function DNAHelix() {
  const groupRef = useRef();
  const helix = useMemo(() => {
    const points1 = [];
    const points2 = [];
    const connectors = [];
    const spheres = [];
    const turns = 4;
    const height = 8;
    const radius = 1.8;
    const segments = turns * 40;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;
      const y = (t - 0.5) * height;
      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;
      points1.push(new THREE.Vector3(x1, y, z1));
      points2.push(new THREE.Vector3(x2, y, z2));

      if (i % 5 === 0) {
        const mx = (x1 + x2) / 2;
        const my = y;
        const mz = (z1 + z2) / 2;
        connectors.push({ start: new THREE.Vector3(x1, y, z1), end: new THREE.Vector3(x2, y, z2) });
        spheres.push({ pos: [x1, y, z1], color: '#ffffff' });
        spheres.push({ pos: [x2, y, z2], color: '#888888' });
      }
    }
    return { points1, points2, connectors, spheres };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Line points={helix.points1} color="#ffffff" lineWidth={1} transparent opacity={0.35} />
      <Line points={helix.points2} color="#888888" lineWidth={1} transparent opacity={0.35} />
      {helix.connectors.map((c, i) => (
        <Line key={`conn-${i}`} points={[c.start, c.end]} color="#333333" lineWidth={0.4} transparent opacity={0.2} />
      ))}
      {helix.spheres.map((s, i) => (
        <Sphere key={`sphere-${i}`} position={s.pos} args={[0.06, 8, 8]}>
          <meshStandardMaterial color={s.color} emissive={s.color} emissiveIntensity={0.3} />
        </Sphere>
      ))}
    </group>
  );
}

function Particles() {
  const particlesRef = useRef();
  const particleData = useMemo(() => {
    const count = 150;
    const positions = new Float32Array(count * 3);
    const speeds = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds.push(0.002 + Math.random() * 0.006);
    }
    return { positions, speeds };
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        pos.array[i * 3 + 1] += particleData.speeds[i];
        if (pos.array[i * 3 + 1] > 5) pos.array[i * 3 + 1] = -5;
        if (pos.array[i * 3 + 1] < -5) pos.array[i * 3 + 1] = 5;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleData.positions.length / 3}
          array={particleData.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <DNAHelix />
        <Particles />
        <fog attach="fog" args={['#000000', 5, 20]} />
      </Canvas>
    </div>
  );
}
