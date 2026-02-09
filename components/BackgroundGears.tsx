'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const Gear = ({ position, rotationSpeed, scale, type = 'torus' }: { position: [number, number, number], rotationSpeed: number, scale: number, type?: 'torus' | 'cylinder' }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.z += rotationSpeed * delta;
        }
    });

    const materialProps = {
        color: "#2b2b2b",
        metalness: 0.8,
        roughness: 0.2,
    };

    if (type === 'cylinder') {
        return (
            <group position={position} scale={scale}>
                <Cylinder args={[1, 1, 0.2, 16]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial {...materialProps} />
                </Cylinder>
                {/* Teeth simulation - simplified */}
                <Cylinder args={[1.1, 1.1, 0.2, 8]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial {...materialProps} />
                </Cylinder>
            </group>
        )
    }

    return (
        <Torus ref={meshRef} position={position} args={[1, 0.3, 16, 32]} scale={scale}>
            <meshStandardMaterial {...materialProps} />
        </Torus>
    );
};

export const BackgroundGears = () => {
    return (
        <div className="absolute inset-0 pointer-events-none -z-10">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Gear position={[-3, 2, -5]} rotationSpeed={0.2} scale={1.5} />
                <Gear position={[3, -2, -5]} rotationSpeed={-0.15} scale={2} />
                <Gear position={[-4, -3, -8]} rotationSpeed={0.1} scale={1.2} />
                <Gear position={[4, 3, -6]} rotationSpeed={-0.1} scale={1.8} />
                <Gear position={[0, 0, -10]} rotationSpeed={0.05} scale={3} />
                <Gear position={[-6, 0, -6]} rotationSpeed={-0.2} scale={1} />
                <Gear position={[6, 1, -7]} rotationSpeed={0.15} scale={1.4} />

            </Canvas>
        </div>
    );
};
