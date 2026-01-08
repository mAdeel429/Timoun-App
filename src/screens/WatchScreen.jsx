// import { useEffect } from "react";
// import { songs } from "../data/videos";

// export default function WatchScreen({ showScreen }) {

//   useEffect(() => {
//     const grid = document.getElementById("watch-grid");
//     grid.innerHTML = "";

//     songs.forEach(song => {
//       const btn = document.createElement("button");
//       btn.className =
//         "video-card tap-feedback aspect-video rounded-3xl bg-gradient-to-br from-emerald-300 to-green-400 shadow-xl flex flex-col items-center justify-center border-4 border-white/50 overflow-hidden";

//       btn.innerHTML = `<span class="text-5xl mb-1">${song.emoji}</span>`;

//       btn.onclick = () => {
//         window.__selectedVideo = song;
//         showScreen("player-screen");
//       };

//       grid.appendChild(btn);
//     });
//   }, [showScreen]);

//   return (
//     <div id="watch-screen" className="screen gradient-mint flex flex-col">

//       <div className="flex items-center p-4 bg-white/40">
//         <button
//           id="watch-back-btn"
//           onClick={() => showScreen("menu-screen")}
//           className="tap-feedback w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center"
//         >
//           ←
//         </button>

//         <h2 className="flex-1 text-center text-2xl font-black text-emerald-600">
//           Watch!
//         </h2>

//         <div className="w-14" />
//       </div>

//       <div className="flex-1 overflow-auto p-4">
//         <div id="watch-grid" className="grid grid-cols-2 gap-4 max-w-md mx-auto" />
//       </div>

//     </div>
//   );
// }


import { useEffect } from "react";
import { songs } from "../data/videos";
import { useAudioEffects } from "../hooks/useAudioEffects";

export default function WatchScreen({ showScreen }) {
    const { playTapSound } = useAudioEffects();

  useEffect(() => {
    const grid = document.getElementById("watch-grid");
    grid.innerHTML = "";
    // Predefined gradients for each song card
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

    songs.forEach((song, index) => {
      const btn = document.createElement("button");

      const gradient = gradients[index % gradients.length]; // Cycle if more songs than colors

      btn.className = `
        video-card tap-feedback aspect-video rounded-3xl bg-gradient-to-br ${gradient} 
        shadow-xl flex flex-col items-center justify-center border-4 border-white/50 overflow-hidden
      `;

      btn.innerHTML = `<span class="text-5xl mb-1">${song.emoji}</span>`;

      btn.onclick = () => {
        window.__selectedVideo = song;
        showScreen("player-screen");
      };

      grid.appendChild(btn);
    });
  }, [showScreen]);

  return (
    <div id="watch-screen" className="screen gradient-mint flex flex-col">
      {/* HEADER */}
      <div className="flex items-center p-4 bg-white/40">
        <button
          id="watch-back-btn"
          onClick={() =>{
            playTapSound()
             showScreen("menu-screen")
            }}
          className="tap-feedback w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          ←
        </button>

        <h2 className="flex-1 text-center text-2xl font-black text-emerald-600">
          Watch!
        </h2>

        <div className="w-14" />
      </div>

      {/* GRID */}
      <div className="flex-1 overflow-auto p-4">
        <div id="watch-grid" className="grid grid-cols-2 gap-4 max-w-md mx-auto" />
      </div>
    </div>
  );
}
