export function useAudioEffects() {
  const audioContext =
    new (window.AudioContext || window.webkitAudioContext)();

  const playTapSound = (frequency = 700, duration = 100) => {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.frequency.value = frequency;
    osc.type = "sine";

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration / 1000
    );

    osc.start();
    osc.stop(audioContext.currentTime + duration / 1000);
  };

  const playSuccessSound = () => {
    playTapSound(523, 100);
    setTimeout(() => playTapSound(659, 100), 100);
    setTimeout(() => playTapSound(784, 150), 200);
  };

  const playErrorSound = () => {
    playTapSound(400, 150);
    setTimeout(() => playTapSound(350, 200), 150);
  };

  return {
    playTapSound,
    playSuccessSound,
    playErrorSound
  };
}
