export function speak(text, options = {}) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.rate = options.rate ?? 0.9;   // calm speed
  utterance.pitch = options.pitch ?? 1;
  utterance.volume = options.volume ?? 0.9;

  // Optional: choose a calm English voice
  const voices = window.speechSynthesis.getVoices();
  const calmVoice = voices.find(v =>
    v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
  );
  if (calmVoice) utterance.voice = calmVoice;

  window.speechSynthesis.cancel(); // stop overlap
  window.speechSynthesis.speak(utterance);
}

export function stopSpeak() {
  window.speechSynthesis.cancel();
}
