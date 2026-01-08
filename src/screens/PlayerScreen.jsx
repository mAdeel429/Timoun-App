import { useEffect, useRef, useState } from "react";
import { useAudioEffects } from "../hooks/useAudioEffects";
import { mediaStore } from "../hooks/mediaStore";

export default function PlayerScreen({ showScreen }) {
  const containerRef = useRef(null);
  const video = mediaStore.video; // ✅ GLOBAL VIDEO
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const { playTapSound } = useAudioEffects();

  useEffect(() => {
    if (!containerRef.current) return;

    // attach SAME video element
    if (!containerRef.current.contains(video)) {
      containerRef.current.appendChild(video);
    }

    // stop music before video
    mediaStore.audio.pause();
    mediaStore.audio.currentTime = 0;

    if (!window.__selectedVideo) return;

    video.src = window.__selectedVideo.file;
    video.currentTime = 0;

    video.play().then(() => setIsPlaying(true));

    const onTime = () =>
      setProgress((video.currentTime / video.duration) * 100);

    const onEnded = () => finishVideo();

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);

    return () => {
      video.pause();
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
    };
  }, [window.__selectedVideo]);

  const togglePlay = () => {
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const finishVideo = () => {
    setIsPlaying(false);
    showScreen("watch-screen");
  };

  const handleBack = () => {
    video.pause();
    video.currentTime = 0;
    playTapSound();
    showScreen("watch-screen");
  };

  return (
    <div id="player-screen" className="screen bg-slate-900 flex flex-col">

      <button onClick={handleBack}
        className="tap-feedback absolute top-4 left-4 z-10 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center">
        ←
      </button>

      <div ref={containerRef} className="flex-1 relative overflow-hidden" />

      <button
        onClick={togglePlay}
        className="tap-feedback absolute bottom-20 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center"
      >
        <span className="text-4xl ml-1">{isPlaying ? "⏸" : "▶"}</span>
      </button>

      <div className="px-8 pb-8">
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-pink-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
