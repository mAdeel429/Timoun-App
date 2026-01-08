// import { music } from "../data/music";

// export default function MusicGrid({ onPlay }) {
//   return (
//     <div
//       id="music-grid"
//       className="grid grid-cols-2 gap-4 max-w-md mx-auto"
//     >
//       {music.map((song, index) => (
//         <button
//           key={index}
//           className="
//             song-card tap-feedback aspect-square rounded-3xl
//             bg-gradient-to-br from-violet-200 to-purple-300
//             shadow-xl flex flex-col items-center justify-center
//             border-4 border-white/50
//           "
//           onClick={() => onPlay(index)}
//         >
//           <span className="text-6xl mb-2">{song.icon}</span>
//           <span className="text-violet-700 font-bold">{song.title}</span>
//         </button>
//       ))}
//     </div>
//   );
// }

import { music } from "../data/music";
import { useAudioEffects } from "../hooks/useAudioEffects";

export default function MusicGrid({ onPlay }) {
  const { playTapSound } = useAudioEffects();

  return (
    <div id="music-grid" className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {music.map((song, index) => (
        <button
          key={index}
          className="
            song-card tap-feedback aspect-square rounded-3xl
            bg-gradient-to-br from-violet-200 to-purple-300
            shadow-xl flex flex-col items-center justify-center
            border-4 border-white/50
          "
          onClick={() => {
            playTapSound();
            onPlay(index);
          }}
        >
          <span className="text-6xl mb-2">{song.icon}</span>
          <span className="text-violet-700 font-bold">{song.title}</span>
        </button>
      ))}
    </div>
  );
}
