"use client";

import { generateResponse } from "./CloudflareAI";
import RecordAudio from "./RecordAudio";
import { useState, useRef } from "react";
import { Message } from "@/lib/message";
import { generateAndPlayAudio } from "./ElevenLabs/ElevenLabsBackend";

export function AudioManager({ characterName }: { characterName: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const recordAudioRef = useRef<{ startListening: () => void } | null>(null);

  const handleStartListening = () => {
    if (recordAudioRef.current) {
      recordAudioRef.current.startListening(); // Call the function from outside
    }
  };

  const handleMessage = async (message: string) => {
    setMessages(prevMessages => [...prevMessages, { role: "user", content: message }]);

    const response = await generateResponse(
      [...messages, { role: "user", content: message }],
      "llama-3-8b-instruct"
    );

    setMessages(prevMessages => [...prevMessages, { role: "assistant", content: response }]);
    
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
