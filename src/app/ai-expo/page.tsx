import Scene from "@/components/ai-expo/Scene";
import HeroOverlay from "@/components/ai-expo/HeroOverlay";

export const metadata = {
    title: "AI Expo | 74th IPC",
    description: "Experience the future of pharmacy with AI technology.",
};

export default function AIExpoPage() {
    return (
        <main className="relative w-full min-h-screen bg-black">
            <Scene />
            <HeroOverlay />
        </main>
    );
}
