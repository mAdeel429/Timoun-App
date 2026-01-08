// import { useRef, useState, useEffect } from "react"; 
// import { music } from "../data/music";
// import { useAudioEffects } from "../hooks/useAudioEffects";

// export default function TunesScreen({ showScreen }) {
//   const audioRef = useRef(new Audio());
//   const [currentIndex, setCurrentIndex] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const { playTapSound } = useAudioEffects();

//   // Predefined gradients for song cards
//   const gradients = [
//     "from-rose-300 to-rose-400",
//     "from-violet-300 to-violet-400",
//     "from-emerald-300 to-green-400",
//     "from-amber-300 to-yellow-400",
//     "from-cyan-300 to-blue-400",
//     "from-pink-300 to-pink-400",
//     "from-orange-300 to-orange-400",
//     "from-lime-300 to-green-300",
//     "from-purple-300 to-purple-400",
//     "from-teal-300 to-cyan-400",
//     "from-red-300 to-red-400",
//     "from-indigo-300 to-blue-400",
//     "from-fuchsia-300 to-pink-400",
//     "from-green-300 to-lime-400",
//     "from-yellow-300 to-amber-400"
//   ];

//   // Play a song by index
//   const playMusic = (index) => {
//     const song = music[index];
//     setCurrentIndex(index);
//     audioRef.current.src = song.file;
//     audioRef.current.play();
//     setIsPlaying(true);
//   };

//   // Toggle play/pause
//   const togglePlay = () => {
//     if (!audioRef.current.src) return;
//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   // Next song
//   const playNext = () => {
//     if (currentIndex === null) return;
//     const nextIndex = (currentIndex + 1) % music.length;
//     playMusic(nextIndex);
//   };

//   // Previous song
//   const playPrev = () => {
//     if (currentIndex === null) return;
//     const prevIndex = (currentIndex - 1 + music.length) % music.length;
//     playMusic(prevIndex);
//   };

//   // Stop audio when leaving screen
//   const handleBack = () => {
//     if (audioRef.current) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0;
//       setIsPlaying(false);
//     }
//     playTapSound();
//     showScreen("menu-screen");
//   };

//   // Auto-play next song when current ends
//   useEffect(() => {
//     const audio = audioRef.current;
//     const handleEnded = () => {
//       const nextIndex = (currentIndex + 1) % music.length;
//       playMusic(nextIndex);
//     };
//     audio.addEventListener("ended", handleEnded);
//     return () => audio.removeEventListener("ended", handleEnded);
//   }, [currentIndex]);

//   return (
//     <div id="tunes-screen" className="screen gradient-lavender flex flex-col">

//       {/* HEADER */}
//       <div className="flex items-center p-4 bg-white/40">
//         <button
//           onClick={handleBack}
//           className="tap-feedback w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center"
//         >
//           ←
//         </button>

//         <h2 className="flex-1 text-center text-2xl font-black text-violet-600">
//           Tiny Tunes
//         </h2>

//         <div className="w-14" />
//       </div>

//       {/* NOW PLAYING */}
//       {currentIndex !== null && (
//         <div className="mx-4 mt-4 p-6 rounded-3xl bg-white/60 shadow-xl">
//           <div className="flex items-center gap-4">
//             <div
//               className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-300 to-purple-400 flex items-center justify-center text-4xl"
//             >
//               {music[currentIndex].icon}
//             </div>
//             <div className="flex-1">
//               <div className="text-violet-600 font-bold text-lg">
//                 Now Playing
//               </div>
//               <div className="text-violet-800 font-black text-xl">
//                 {music[currentIndex].title}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-end justify-center gap-1 h-12 mt-4">
//             <div className="visualizer-bar w-3 bg-violet-400 rounded-full" style={{ animationDelay: "0s" }}></div>
//             <div className="visualizer-bar w-3 bg-pink-400 rounded-full" style={{ animationDelay: "0.1s" }}></div>
//             <div className="visualizer-bar w-3 bg-violet-400 rounded-full" style={{ animationDelay: "0.2s" }}></div>
//             <div className="visualizer-bar w-3 bg-pink-400 rounded-full" style={{ animationDelay: "0.3s" }}></div>
//             <div className="visualizer-bar w-3 bg-violet-400 rounded-full" style={{ animationDelay: "0.4s" }}></div>
//             <div className="visualizer-bar w-3 bg-pink-400 rounded-full" style={{ animationDelay: "0.1s" }}></div>
//             <div className="visualizer-bar w-3 bg-violet-400 rounded-full" style={{ animationDelay: "0.3s" }}></div>
//           </div>

//           <div className="flex items-center justify-center gap-6 mt-4">
//             <button onClick={playPrev} className="tap-feedback w-14 h-14 rounded-full bg-violet-200 flex items-center justify-center text-2xl">
//               ⏮
//             </button>
//             <button onClick={togglePlay} className="tap-feedback w-20 h-20 rounded-full bg-violet-500 shadow-lg flex items-center justify-center text-3xl text-white">
//               {isPlaying ? "⏸" : "▶"}
//             </button>
//             <button onClick={playNext} className="tap-feedback w-14 h-14 rounded-full bg-violet-200 flex items-center justify-center text-2xl">
//               ⏭
//             </button>
//           </div>
//         </div>
//       )}

//       {/* SONG GRID */}
//       <div className="flex-1 overflow-auto p-4">
//         <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//           {music.map((song, index) => {
//             const gradient = gradients[index % gradients.length];
//             return (
//               <button
//                 key={index}
//                 onClick={() => playMusic(index)}
//                 className={`song-card tap-feedback aspect-square rounded-3xl bg-gradient-to-br ${gradient} shadow-xl flex flex-col items-center justify-center border-4 border-white/50`}
//               >
//                 <span className="text-6xl mb-2">{song.icon}</span>
//                 <span className="text-violet-700 font-bold">{song.title}</span>
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { music } from "../data/music";
import { useAudioEffects } from "../hooks/useAudioEffects";
import { mediaStore } from "../hooks/mediaStore";

export default function TunesScreen({ showScreen }) {
  const audio = mediaStore.audio; // ✅ GLOBAL AUDIO
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { playTapSound } = useAudioEffects();

  const gradients = [
    "from-rose-300 to-rose-400",
    "from-violet-300 to-violet-400",
    "from-emerald-300 to-green-400",
    "from-amber-300 to-yellow-400",
    "from-cyan-300 to-blue-400",
    "from-pink-300 to-pink-400",
    "from-orange-300 to-orange-400",
    "from-lime-300 to-green-300",
    "from-purple-300 to-purple-400",
    "from-teal-300 to-cyan-400",
    "from-red-300 to-red-400",
    "from-indigo-300 to-blue-400",
    "from-fuchsia-300 to-pink-400",
    "from-green-300 to-lime-400",
    "from-yellow-300 to-amber-400"
  ];

  const playMusic = async (index) => {
    audio.pause();
    audio.currentTime = 0;

    audio.src = music[index].file;
    setCurrentIndex(index);

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      console.warn("Audio play blocked");
    }
  };

  const togglePlay = async () => {
    if (!audio.src) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const playNext = () => {
    if (currentIndex === null) return;
    playMusic((currentIndex + 1) % music.length);
  };

  const playPrev = () => {
    if (currentIndex === null) return;
    playMusic((currentIndex - 1 + music.length) % music.length);
  };

  const handleBack = () => {
    audio.pause(); // ✅ HTML style
    audio.currentTime = 0;
    setIsPlaying(false);

    playTapSound();
    showScreen("menu-screen");
  };

  // auto next (HTML style)
  useEffect(() => {
    const onEnded = () => playNext();
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [currentIndex]);

  return (
    <div id="tunes-screen" className="screen gradient-lavender flex flex-col">

      {/* HEADER */}
      <div className="flex items-center p-4 bg-white/40">
        <button onClick={handleBack}
          className="tap-feedback w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center">
          ←
        </button>

        <h2 className="flex-1 text-center text-2xl font-black text-violet-600">
          Tiny Tunes
        </h2>

        <div className="w-14" />
      </div>

      {/* NOW PLAYING */}
      {currentIndex !== null && (
        <div className="mx-4 mt-4 p-6 rounded-3xl bg-white/60 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-300 to-purple-400 flex items-center justify-center text-4xl">
              {music[currentIndex].icon}
            </div>

            <div className="flex-1">
              <div className="text-violet-600 font-bold">Now Playing</div>
              <div className="text-violet-800 font-black text-xl">
                {music[currentIndex].title}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <button onClick={playPrev} className="tap-feedback w-14 h-14 rounded-full bg-violet-200 text-2xl">⏮</button>
            <button onClick={togglePlay} className="tap-feedback w-20 h-20 rounded-full bg-violet-500 text-white text-3xl">
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button onClick={playNext} className="tap-feedback w-14 h-14 rounded-full bg-violet-200 text-2xl">⏭</button>
          </div>
        </div>
      )}

      {/* GRID */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {music.map((song, index) => (
            <button
              key={index}
              onClick={() => playMusic(index)}
              className={`tap-feedback aspect-square rounded-3xl bg-gradient-to-br ${gradients[index % gradients.length]} shadow-xl flex flex-col items-center justify-center border-4 border-white/50`}
            >
              <span className="text-6xl mb-2">{song.icon}</span>
              <span className="text-violet-700 font-bold">{song.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
