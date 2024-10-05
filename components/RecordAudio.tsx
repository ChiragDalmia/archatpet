interface RecordAudioProps {}

function handleOnRecord() {
  const SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.start();

  recognition.onresult = async function(event) {
    const transcript = event.results[0][0].transcript;
    console.log('transcript', transcript)
  }
}

export default function RecordAudio(props: RecordAudioProps) {
  return <button onClick={handleOnRecord}>Record</button>;
}
