"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function Molecule({ position = [0, 0, 0], scale = 1, color = "#00ff88" }: { position?: [number, number, number]; scale?: number; color?: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <group ref={groupRef} position={position} scale={scale}>
                {/* Center Atom */}
                <Sphere args={[1, 32, 32]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.1} metalness={0.8} />
                </Sphere>

                {/* Orbiting Atoms */}
                <group rotation={[0, 0, Math.PI / 4]}>
                    <Sphere args={[0.3, 16, 16]} position={[2, 0, 0]}>
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
                    </Sphere>
                    <Sphere args={[0.3, 16, 16]} position={[-2, 0, 0]}>
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
                    </Sphere>
                </group>

                <group rotation={[0, Math.PI / 2, Math.PI / 4]}>
                    <Sphere args={[0.3, 16, 16]} position={[0, 2, 0]}>
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
                    </Sphere>
                    <Sphere args={[0.3, 16, 16]} position={[0, -2, 0]}>
                        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.2} />
                    </Sphere>
                </group>

                {/* Bonds */}
                <mesh rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.1, 0.1, 4]} />
                    <meshStandardMaterial color="white" transparent opacity={0.3} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 4]} />
                    <meshStandardMaterial color="white" transparent opacity={0.3} />
                </mesh>
            </group>
        </Float>
    );
}
