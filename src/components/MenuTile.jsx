// export default function MenuTile({
//   emoji,
//   label,
//   onClick,
//   gradient,
//   locked = false,
//   delay = "0s",
//   spanTwo = false
// }) {
//   return (
//     <button
//       disabled={locked}
//       onClick={!locked ? onClick : undefined}
//       style={{ animationDelay: delay }}
//       className={`
//         menu-tile pulse-animation
//         ${spanTwo ? "col-span-2 h-28" : "col-span-1 aspect-square"}
//         rounded-3xl shadow-xl
//         flex flex-col items-center justify-center p-4
//         border-4
//         ${locked ? "border-white/30 opacity-60" : "border-white/50"}
//         bg-gradient-to-br ${gradient}
//         relative overflow-hidden
//       `}
//     >
//       <div className={`text-5xl mb-2 ${locked ? "grayscale-[30%]" : ""}`}>
//         {emoji}
//       </div>

//       <span
//         className={`font-bold text-lg ${
//           locked ? "text-black/40" : "text-white drop-shadow"
//         }`}
//       >
//         {label}
//       </span>

//       {locked && (
//         <div className="absolute top-3 right-3 text-xl">
//           🔒
//         </div>
//       )}
//     </button>
//   );
// }


import { useAudioEffects } from "../hooks/useAudioEffects";

export default function MenuTile({
  emoji,
  label,
  onClick,
  gradient,
  locked = false,
  delay = "0s",
  spanTwo = false
}) {
  // const { playTapSound } = useAudioEffects();

  return (
    <button
      disabled={locked}
      onClick={(e) => {
        if (!locked) {
          // playTapSound();
          onClick?.(e);
        }
      }}
      style={{ animationDelay: delay }}
      className={`
        menu-tile pulse-animation
        ${spanTwo ? "col-span-2 h-28" : "col-span-1 aspect-square"}
        rounded-3xl shadow-xl
        flex flex-col items-center justify-center p-4
        border-4
        ${locked ? "border-white/30 opacity-60" : "border-white/50"}
        bg-gradient-to-br ${gradient}
        relative overflow-hidden
      `}
    >
      <div className={`text-5xl mb-2 ${locked ? "grayscale-[30%]" : ""}`}>
        {emoji}
      </div>

      <span
        className={`font-bold text-lg ${locked ? "text-black/40" : "text-white drop-shadow"}`}
      >
        {label}
      </span>

      {locked && (
        <div className="absolute top-3 right-3 text-xl">🔒</div>
      )}
    </button>
  );
}
