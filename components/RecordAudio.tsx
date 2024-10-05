"use client";

import "regenerator-runtime/runtime";
import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const RecordAudio = () => {
  const [message, setMessage] = useState("");

  const audioCallback = (command: string, spokenPhrase: string, similarityRatio: number) => {
    setMessage(
      `${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`
    );
  };

  const commands = [
    {
      command: "hey jellybean *",
      callback: audioCallback,
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
  ];

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  // continuous listening
  SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  return (
    <div>
      <p>Microphone: {listening ? "on" : "off"}</p>
      <p>{transcript}</p>
      <p>Message: {message}</p>
    </div>
  );
};
export default RecordAudio;
