import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

interface GearProps {
    initialX: number; // Base X position
    direction: 1 | -1; // Direction to fly out (1 = right, -1 = left)
    color?: string;
    speed?: number;
    reverse?: boolean;
    scale?: number;
}

export const Gear: React.FC<GearProps> = ({
    initialX,
    direction,
    color = "#FB923C", // Orange-400 default
    speed = 1,
    reverse = false,
    scale = 1
}) => {
    const meshRef = useRef<Mesh>(null);
    const groupRef = useRef<Group>(null); // Ref for the group to control position

    // Количество зубьев
    const teethCount = 8;
    const teeth = Array.from({ length: teethCount });

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Базовое вращение
            const rotationSpeed = delta * speed * (reverse ? -1 : 1);
            meshRef.current.rotation.z += rotationSpeed;
        }

        if (groupRef.current) {
            // Fly-out animation logic based on scroll
            const scrollY = window.scrollY;
            const normalizedScroll = Math.min(scrollY / 1000, 1);

            // Move outwards by up to 4 units based on scroll
            const currentX = initialX + (normalizedScroll * 4 * direction);

            // Smoothly interpolate current position if desired, or set directly
            // For performance, direct setting is fine here as scroll is input
            groupRef.current.position.set(currentX, 0, -2);
        }
    });

    return (
        <group ref={groupRef} scale={[scale, scale, scale]}>
            {/* Группа вращающихся частей */}
            <mesh ref={meshRef}>
                {/* Основное кольцо */}
                <torusGeometry args={[1, 0.3, 16, 32]} />
                <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />

                {/* Зубья - создаем их как кубики */}
                {teeth.map((_, i) => (
                    <mesh
                        key={i}
                        rotation={[0, 0, (i * (Math.PI * 2) / teethCount)]}
                        position={[
                            Math.cos((i * (Math.PI * 2) / teethCount)) * 1.2,
                            Math.sin((i * (Math.PI * 2) / teethCount)) * 1.2,
                            0
                        ]}
                    >
                        <boxGeometry args={[0.4, 0.4, 0.4]} />
                        <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
                    </mesh>
                ))}

                {/* Спицы (перекрестие внутри) */}
                <mesh rotation={[0, 0, 0]} scale={[0.2, 1.8, 0.2]}>
                    <boxGeometry />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
                </mesh>
                <mesh rotation={[0, 0, Math.PI / 2]} scale={[0.2, 1.8, 0.2]}>
                    <boxGeometry />
                    <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
                </mesh>
            </mesh>
        </group>
    );
};
