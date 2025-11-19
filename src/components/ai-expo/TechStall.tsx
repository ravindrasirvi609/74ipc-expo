"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Box, Cylinder, MeshWobbleMaterial, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";

export default function TechStall({ position = [0, 0, 0], rotation = [0, 0, 0], label = "AI Core" }: { position?: [number, number, number]; rotation?: [number, number, number]; label?: string }) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    const { scale } = useSpring({
        scale: hovered ? 1.15 : 1,
        config: { tension: 200, friction: 20 }
    });

    useFrame(() => {
        if (groupRef.current && hovered) {
            groupRef.current.rotation.y += 0.01;
        }
    });

    return (
        <animated.group
            ref={groupRef}
            position={position}
            rotation={rotation}
            scale={scale}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {/* Base Platform */}
            <Cylinder args={[1.8, 2, 0.2, 6]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[1.9, 2.1, 0.05, 6]} position={[0, 0.1, 0]}>
                <meshStandardMaterial color={hovered ? "#00ffff" : "#0088ff"} emissive={hovered ? "#00ffff" : "#0088ff"} emissiveIntensity={2} toneMapped={false} />
            </Cylinder>

            {/* Main Booth Structure */}
            <group position={[0, 1.5, -1]}>
                <Box args={[2.5, 3.5, 0.2]}>
                    <meshPhysicalMaterial color="#0f0f1a" metalness={0.9} roughness={0.1} transmission={0.5} thickness={1} />
                </Box>
                {/* Neon Borders */}
                <Box args={[2.6, 3.6, 0.1]} position={[0, 0, -0.1]}>
                    <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
                </Box>
            </group>

            {/* Holographic Display Screen */}
            <Float speed={5} rotationIntensity={0.2} floatIntensity={0.5}>
                <Box args={[2, 1.5, 0.05]} position={[0, 2, -0.8]}>
                    <MeshWobbleMaterial factor={0.1} speed={2} color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} transparent opacity={0.6} wireframe={hovered} />
                </Box>
                {/* Screen Content Placeholder */}
                <Text position={[0, 2, -0.75]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
                    {hovered ? "ACCESS GRANTED" : "SYSTEM ACTIVE"}
                </Text>
            </Float>

            {/* Floating Particles inside the booth */}
            <Sparkles count={20} scale={3} size={2} speed={0.4} opacity={0.5} color="#00ffff" position={[0, 1.5, 0]} />

            {/* Floating Label */}
            <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
                <Text
                    position={[0, 3.8, -1]}
                    fontSize={0.4}
                    font="/fonts/Inter-Bold.ttf" // Assuming default font or fallback
                    color={hovered ? "#ffffff" : "#a0a0ff"}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {label}
                </Text>
            </Float>

            {/* Side Pillars */}
            <Cylinder args={[0.1, 0.1, 3.5]} position={[-1.2, 1.75, -1]}>
                <meshStandardMaterial color="#555" metalness={1} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 3.5]} position={[1.2, 1.75, -1]}>
                <meshStandardMaterial color="#555" metalness={1} roughness={0.2} />
            </Cylinder>

        </animated.group>
    );
}
