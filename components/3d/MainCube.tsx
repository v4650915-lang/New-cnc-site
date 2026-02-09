
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';

export const MainCube = () => {
    const meshRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Базовая скорость (медленная) + скорость от скролла
            const baseSpeed = 0.2;
            const scrollMultiplier = 5.0; // Насколько сильно скролл ускоряет

            // Get scroll directly from window, normalized
            const scrollY = window.scrollY; // 0 to whatever
            const normalizedScroll = Math.min(scrollY / 1000, 1);

            const currentSpeed = baseSpeed + (normalizedScroll * scrollMultiplier);

            meshRef.current.rotation.x += delta * currentSpeed * 0.5;
            meshRef.current.rotation.y += delta * currentSpeed;
        }
    });

    const faces = [
        {
            // FRONT - FANUC (Yellow)
            rotation: [0, 0, 0] as [number, number, number],
            position: [0, 0, 1.51] as [number, number, number], // slightly offset to prevent z-fighting if we had a mesh
            bg: 'linear-gradient(to bottom, #fff04d 0%, #FFE600 30%, #f2d900 100%)',
            text: 'FANUC',
            textColor: '#ED1C24',
            fontSize: '2.5rem',
            letterSpacing: '-1px'
        },
        {
            // RIGHT - SIEMENS (Teal)
            rotation: [0, Math.PI / 2, 0] as [number, number, number],
            position: [1.51, 0, 0] as [number, number, number],
            bg: '#009999',
            text: 'SIEMENS',
            textColor: '#ffffff',
            fontSize: '1.8rem',
            letterSpacing: '0.5px'
        },
        {
            // BACK - HAAS (Gray)
            rotation: [0, Math.PI, 0] as [number, number, number],
            position: [0, 0, -1.51] as [number, number, number],
            bg: '#C0C0C0',
            text: 'HAAS',
            textColor: '#000000',
            fontSize: '2.5rem',
            letterSpacing: '0.5px'
        },
        {
            // LEFT - FMS (Blue)
            rotation: [0, -Math.PI / 2, 0] as [number, number, number],
            position: [-1.51, 0, 0] as [number, number, number],
            bg: '#003DA5',
            text: 'FMS',
            textColor: '#ffffff',
            fontSize: '2.8rem',
            letterSpacing: '0.5px'
        },
        {
            // TOP - MAZAK (Red)
            rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
            position: [0, 1.51, 0] as [number, number, number],
            bg: '#E31E24',
            text: 'MAZAK',
            textColor: '#ffffff',
            fontSize: '2.2rem',
            letterSpacing: '0.5px'
        },
        {
            // BOTTOM - SYNTEC (Orange)
            rotation: [Math.PI / 2, 0, 0] as [number, number, number],
            position: [0, -1.51, 0] as [number, number, number],
            bg: '#FF6600',
            text: 'SYNTEC',
            textColor: '#ffffff',
            fontSize: '2rem',
            letterSpacing: '0.5px'
        },
    ];

    return (
        <mesh ref={meshRef}>
            {/* Invisible box to catch raycasts if needed, or just as a placeholder */}
            <boxGeometry args={[3, 3, 3]} />
            <meshStandardMaterial transparent opacity={0} />

            {faces.map((face, index) => (
                <Html
                    key={index}
                    transform
                    occlude
                    rotation={face.rotation}
                    position={face.position}
                    style={{
                        width: '300px',
                        height: '300px',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            background: face.bg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid rgba(255,255,255,0.3)',
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "Arial, sans-serif", // Simplified font
                                fontSize: face.fontSize,
                                fontWeight: 900,
                                color: face.textColor,
                                textTransform: 'uppercase',
                                letterSpacing: face.letterSpacing,
                                lineHeight: 1,
                                WebkitFontSmoothing: 'antialiased',
                                textAlign: 'center',
                            }}
                        >
                            {face.text}
                        </div>
                    </div>
                </Html>
            ))}
        </mesh>
    );
};
