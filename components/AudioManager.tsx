"use client";

import { generateResponse } from "./CloudflareAI";
import RecordAudio from "./RecordAudio";
import { useState, useRef } from "react";
import { Message } from "@/lib/message";
import { generateAndPlayAudio } from "./ElevenLabs/ElevenLabsBackend";

export function AudioManager({ characterName }: { characterName: string }) {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<Message[]>([]);
  const recordAudioRef = useRef<{ startListening: () => void } | null>(null);

  const prompt = "You are an adorable and playful virtual pet who responds with warmth and affection. Your responses should be cute, simple, and filled with joy, as if you're trying to cheer up and make your owner happy. Use endearing pet-like language and behaviors—short phrases, playful sounds, and loyal gestures. Your tone should always be friendly, comforting, and eager to please. Occasionally include responses that mimic a pet’s physical behavior, such as tail wags, purrs, or happy barks. Respond in short bursts, always conveying love and loyalty like a faithful companion."

  const handleStartListening = () => {
    if (recordAudioRef.current) {
      recordAudioRef.current.startListening(); // Call the function from outside
    }
  };

  const handleMessage = async (message: string) => {
    // setMessages(prevMessages => [...prevMessages, { role: "user", content: message }]);

    const response = await generateResponse(
      [{ role: "user", content: message }, {role: "assistant", content: prompt}],
      "llama-3-8b-instruct"
    );

    // setMessages(prevMessages => [...prevMessages, { role: "assistant", content: response }]);
    
    await generateAndPlayAudio(response, "Bill", "eleven_monolingual_v1");

    handleStartListening();
  };

  return (
    <div>
      <RecordAudio
        ref={recordAudioRef}
        characterName={characterName}
        handleMessage={handleMessage}
      />
    </div>
  );
}
