// import { songs } from "../data/videos";

// export default function VideoGrid({ onSelect }) {
//   return (
//     <div id="watch-grid" className="grid grid-cols-2 gap-4 max-w-md mx-auto">
//       {songs.map((song, index) => (
//         <button
//           key={index}
//           className="video-card tap-feedback aspect-video rounded-3xl bg-gradient-to-br from-emerald-300 to-green-400 shadow-xl flex flex-col items-center justify-center border-4 border-white/50 overflow-hidden"
//           onClick={() => onSelect(song)}
//         >
//           <span className="text-5xl mb-1">{song.emoji}</span>
//         </button>
//       ))}
//     </div>
//   );
// }


import { songs } from "../data/videos";
import { useAudioEffects } from "../hooks/useAudioEffects";

export default function VideoGrid({ onSelect }) {
  const { playTapSound } = useAudioEffects();

  return (
    <div id="watch-grid" className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {songs.map((song, index) => (
        <button
          key={index}
          className="video-card tap-feedback aspect-video rounded-3xl bg-gradient-to-br from-emerald-300 to-green-400 shadow-xl flex flex-col items-center justify-center border-4 border-white/50 overflow-hidden"
          onClick={() => {
            playTapSound();
            onSelect(song);
          }}
        >
          <span className="text-5xl mb-1">{song.emoji}</span>
        </button>
      ))}
    </div>
  );
}
