let audioContext: AudioContext | null = null;

export async function getAudioContext(): Promise<AudioContext> {
    if (typeof window === "undefined") {
        throw new Error("Audio context cannot be initialized in a non-browser environment");
    }

    try {
        if (!audioContext) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            audioContext = new AudioContext();
        }

        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }

        return audioContext;
    } catch (error) {
        console.error("Error initializing AudioContext:", error);
        throw error;
    }
}

export function closeAudioContext() {
    if (audioContext) {
        audioContext.close()
            .catch((error) => console.error("Error closing AudioContext:", error))
            .finally(() => {
                audioContext = null;
            });
    }
}

export function isAudioContextAvailable(): boolean {
    return !!(audioContext && audioContext.state === "running");
}
