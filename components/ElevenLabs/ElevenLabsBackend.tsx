import { ElevenLabsClient } from 'elevenlabs';
import { Readable } from 'stream';

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
});

const readableToBlob = async (readable: Readable): Promise<Blob> => {
  const chunks: Uint8Array[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk);
  }
  const arrayBuffer = await new Response(new Blob(chunks)).arrayBuffer();
  return new Blob([arrayBuffer], { type: 'audio/mpeg' });
};

export const generateAndPlayAudio = async (text: string, voice: string, model: string): Promise<void> => {
  const audioStream: Readable = await elevenlabs.generate({
    voice,
    text,
    model_id: model
  });

  const audioBlob = await readableToBlob(audioStream);
  const audioUrl = URL.createObjectURL(audioBlob);

  const audio = new Audio(audioUrl);
  await audio.play();
};