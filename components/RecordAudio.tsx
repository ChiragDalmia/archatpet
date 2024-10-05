"use client";

import "regenerator-runtime/runtime";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface RecordAudioProps {
  characterName: string;
  handleMessage: (message: string) => void;
}

const RecordAudio = forwardRef<
  { startListening: () => void },
  RecordAudioProps
>(({ characterName, handleMessage }, ref) => {
  const lowerCaseCharacterName = characterName.toLowerCase();
  const stopTalkingTimeout = useRef<NodeJS.Timeout | null>(null);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [isTalking, setIsTalking] = useState(false);
  const [message, setMessage] = useState("");
  const [prevTranscript, setPrevTranscript] = useState("");

  const updateIsTalking = useCallback(
    (currentTranscript: string) => {
      const relevantSpeech = currentTranscript.slice(prevTranscript.length);

      if (isTalking) {
        setMessage((prev) => prev + relevantSpeech);

        if (stopTalkingTimeout.current) {
          clearTimeout(stopTalkingTimeout.current);
        }

        stopTalkingTimeout.current = setTimeout(() => {
          setIsTalking(false);
          handleMessage(message);
          console.log("Stopped paying attention");
        }, 4000);
      }

      const lowerTranscript = currentTranscript.toLowerCase();
      if (
        lowerTranscript.includes(lowerCaseCharacterName) &&
        !isTalking &&
        message === ""
      ) {
        setIsTalking(true);
        console.log("Started paying attention");
      }
    },
    [isTalking, message, prevTranscript, lowerCaseCharacterName, handleMessage]
  );

  const startListening = useCallback(() => {
    setMessage("");
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  }, [resetTranscript]);

  useImperativeHandle(ref, () => ({
    startListening,
  }));

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      startListening();
    }
    return () => {
      SpeechRecognition.stopListening();
      if (stopTalkingTimeout.current) {
        clearTimeout(stopTalkingTimeout.current);
      }
    };
  }, [browserSupportsSpeechRecognition, startListening]);

  useEffect(() => {
    updateIsTalking(transcript);
    setPrevTranscript(transcript);
  }, [transcript, updateIsTalking]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn&apos;t support speech recognition.</p>;
  }

  return (
    <div>
      <p>{isTalking ? "Listening!" : "Not listening!"}</p>
      <p>Message: {message}</p>
    </div>
  );
});

RecordAudio.displayName = "RecordAudio";

export default RecordAudio;
