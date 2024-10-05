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

const RecordAudio = forwardRef(({ characterName, handleMessage }: { characterName: string; handleMessage: (message: string) => void }, ref) => {
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
    [isTalking, message, prevTranscript, lowerCaseCharacterName]
  );

  // Function to start listening, reset transcript, and clear the message
  const startListening = useCallback(() => {
    setMessage(""); // Clear message
    resetTranscript(); // Reset transcript
    SpeechRecognition.startListening({ continuous: true }); // Start listening
  }, [resetTranscript]);

  // Expose the startListening function to parent components
  useImperativeHandle(ref, () => ({
    startListening,
  }));

  // Start continuous listening on mount
  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      startListening(); // Use the new startListening function
    }
    return () => {
      SpeechRecognition.stopListening();
      if (stopTalkingTimeout.current) {
        clearTimeout(stopTalkingTimeout.current);
      }
    };
  }, [browserSupportsSpeechRecognition, startListening]);

  // Update state based on transcript changes
  useEffect(() => {
    updateIsTalking(transcript);
    setPrevTranscript(transcript);
  }, [transcript, updateIsTalking]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  return (
    <div>
      <p>{isTalking ? "Listening!" : "Not listening!"}</p>
      <p>Message: {message}</p>
    </div>
  );
});

export default RecordAudio;
