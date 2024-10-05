import React, { useState, useEffect, useMemo } from 'react';
import { ElevenLabsClient } from 'elevenlabs';
import { GetVoicesResponse } from 'elevenlabs/api/types';
import { Readable } from 'stream';

const ElevenLabsComponent: React.FC = () => {
  const [text, setText] = useState('');
  const [model, setModel] = useState('eleven_multilingual_v2');
  const [voices, setVoices] = useState<GetVoicesResponse>({ voices: [] });
  const [selectedVoice, setSelectedVoice] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const elevenlabs = useMemo(() => new ElevenLabsClient({
    apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
  }), []);

  useEffect(() => {
    const fetchVoices = async () => {
      const voices: GetVoicesResponse = await elevenlabs.voices.getAll();
      setVoices(voices);
      if (voices?.voices[0]?.name !== undefined) {
        setSelectedVoice(voices.voices[0].name);
      }
    };
    fetchVoices();
  }, [elevenlabs]);

  const generateAudio = async () => {
    const audioStream: Readable = await elevenlabs.generate({
      voice: selectedVoice,
      text: text,
      model_id: model
    });

    const audioBlob = await readableToBlob(audioStream);
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log('Generated audio URL:', audioUrl); // Debugging line
    setAudioUrl(audioUrl);
  };

  const readableToBlob = async (readable: Readable): Promise<Blob> => {
    const chunks: Uint8Array[] = [];
    for await (const chunk of readable) {
      chunks.push(typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk);
    }
    const arrayBuffer = await new Response(new Blob(chunks)).arrayBuffer();
    return new Blob([arrayBuffer], { type: 'audio/mpeg' });
  };

  return (
    <div>
      <h1>Eleven Labs Text-to-Speech</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
      />
      <div>
        <label>
          Select Model:
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="eleven_multilingual_v2">eleven_multilingual_v2</option>
            <option value="eleven_monolingual_v1">eleven_monolingual_v1</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Select Voice:
          <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
            {voices.voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={generateAudio}>Generate and Play Audio</button>
      {audioUrl && (
        <audio controls src={audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default ElevenLabsComponent;