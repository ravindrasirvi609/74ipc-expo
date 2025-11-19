"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars, PerspectiveCamera, Sparkles, Cloud } from "@react-three/drei";
import { Suspense } from "react";
import Molecule from "./Molecule";
import TechStall from "./TechStall";

export default function Scene() {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />
                <Suspense fallback={null}>
                    <color attach="background" args={["#020205"]} />
                    <fog attach="fog" args={["#020205", 10, 40]} />

                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
                    <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />

                    <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={500} scale={20} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
                    <Cloud opacity={0.3} speed={0.2} segments={10} position={[0, -5, -10]} color="#1a1a2e" />

                    <group position={[0, 0, 0]}>
                        <Molecule position={[-4, 3, -5]} scale={0.5} color="#00ffff" />
                        <Molecule position={[4, -1, -3]} scale={0.6} color="#ff00ff" />
                        <Molecule position={[0, 6, -8]} scale={0.4} color="#00ff88" />
                    </group>

                    <group position={[0, -2.5, 0]}>
                        <TechStall position={[0, -1, 0]} label="AI Core" />
                        <TechStall position={[-5, -1, 2]} rotation={[0, Math.PI / 6, 0]} label="Pharma AI" />
                        <TechStall position={[5, -1, 2]} rotation={[0, -Math.PI / 6, 0]} label="Robotics" />
                    </group>

                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
                </Suspense>
            </Canvas>
        </div>
    );
}
