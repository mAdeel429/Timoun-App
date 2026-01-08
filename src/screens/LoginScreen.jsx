import { useState, useRef } from "react";
import Bear from "../components/Bear";
import PinDisplay from "../components/PinDisplay";
import Keypad from "../components/Keypad";
import ConfettiContainer from "../components/ConfettiContainer";

const CORRECT_PIN = "1234";

export default function LoginScreen({ showScreen }) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const bearRef = useRef(null);

  // ======= AUDIO =======
  const audioCtx = useRef(null);
  if (!audioCtx.current) {
    audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
  }

  const playTap = (freq = 700, duration = 100) => {
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.current.destination);

    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.3, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.current.currentTime + duration / 1000
    );

    osc.start();
    osc.stop(audioCtx.current.currentTime + duration / 1000);
  };

  const playErrorSound = () => {
    playTap(400, 150);
    setTimeout(() => playTap(350, 200), 150);
  };

  const playCelebrationSound = () => {
    const notes = [
      { freq: 523, time: 0 },
      { freq: 659, time: 100 },
      { freq: 784, time: 200 },
      { freq: 1047, time: 350 }
    ];

    notes.forEach(n =>
      setTimeout(() => playTap(n.freq, 140), n.time)
    );

    setTimeout(() => playTap(1400, 80), 500);
  };

  // ======= CELEBRATION =======
  const createSparkles = () => {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    const sparkles = ["✨", "⭐", "🌟", "💫"];

    for (let i = 0; i < 15; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      container.appendChild(s);
    }

    setTimeout(() => (container.innerHTML = ""), 1500);
  };

  const createMegaCelebration = () => {
    const container = document.getElementById("confetti-container");
    if (!container) return;

    const emojis = ["🎉", "🌈", "⭐", "✨", "💫", "🎈"];

    for (let i = 0; i < 40; i++) {
      const el = document.createElement("div");
      el.className = "sparkle";
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.top = Math.random() * 100 + "%";
      el.style.fontSize = 30 + Math.random() * 30 + "px";
      container.appendChild(el);
    }

    setTimeout(() => (container.innerHTML = ""), 2000);
  };

  const celebrateBear = () => {
    if (!bearRef.current) return;

    bearRef.current.classList.remove("wiggle", "scale-125");
    void bearRef.current.offsetWidth; // force reflow
    bearRef.current.classList.add("wiggle", "scale-125");

    setTimeout(() => {
      bearRef.current.classList.remove("wiggle", "scale-125");
    }, 1000);
  };

  // ======= INPUT =======
  const handleNumber = (num, button) => {
    if (pin.length >= 4) return;

    button.classList.add("wiggle");
    setTimeout(() => button.classList.remove("wiggle"), 500);

    playTap();
    navigator.vibrate?.(30);

    const newPin = pin + num;
    setPin(newPin);

    if (newPin.length === 4) {
      setTimeout(() => checkPin(newPin), 300);
    }
  };

  const handleClear = (button) => {
    button.classList.add("wiggle");
    setTimeout(() => button.classList.remove("wiggle"), 500);

    playTap();
    navigator.vibrate?.(30);
    setPin("");
  };

  const checkPin = (enteredPin) => {
    if (enteredPin === CORRECT_PIN) {
      playCelebrationSound();

      requestAnimationFrame(() => {
        createSparkles();
        createMegaCelebration();
        celebrateBear();
      });

      setTimeout(() => {
        setPin("");
        showScreen("menu-screen");
      }, 1500);
    } else {
      playErrorSound();
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin("");
    }
  };

  return (
    <div className="screen gradient-warm flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="text-center mb-10 relative">
        <Bear id="login-bear" ref={bearRef} />
        <h1 className="text-5xl font-black text-amber-600">Timoun</h1>
        <p className="text-amber-500 mt-2 text-lg font-semibold">Parent Access</p>
      </div>

      <PinDisplay pin={pin} shake={shake} />
      <Keypad onNumber={handleNumber} onClear={handleClear} />

      {/* ALWAYS MOUNTED */}
      <ConfettiContainer />
      <div
        id="confetti-container"
        className="fixed inset-0 pointer-events-none overflow-hidden z-50"
      />
    </div>
  );
}
