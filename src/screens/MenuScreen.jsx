import Bear from "../components/Bear";
import MenuTile from "../components/MenuTile";
import { useAudioEffects } from "../hooks/useAudioEffects";

export default function MenuScreen({ showScreen  }) {
    // const { playTapSound } = useAudioEffects();
  
  return (
    <div
      id="menu-screen"
      className="screen gradient-sky flex flex-col p-6 overflow-hidden"
    >
      {/* ===== TITLE ===== */}
      <div className="text-center mb-6">
        <h1
          id="menu-title"
          className="text-3xl font-black text-sky-600"
        >
          Let's Play!
        </h1>

        {/* ⭐🌈⭐ */}
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-2xl wiggle inline-block" style={{ animationDelay: "0s" }}>
            ⭐
          </span>
          <span className="text-2xl wiggle inline-block" style={{ animationDelay: "0.1s" }}>
            🌈
          </span>
          <span className="text-2xl wiggle inline-block" style={{ animationDelay: "0.2s" }}>
            ⭐
          </span>
        </div>
      </div>

      {/* ===== MENU GRID ===== */}
      <div className="flex-1 grid grid-cols-2 gap-4 content-center max-w-md mx-auto w-full">
        {/* WATCH */}
        <MenuTile
          emoji="📺"
          label="Watch!"
          gradient="from-rose-300 to-rose-400"
          onClick={() => showScreen("watch-screen")}
        />

        {/* TUNES */}
        <MenuTile
          emoji="🎵"
          label="Tiny Tunes"
          gradient="from-violet-300 to-violet-400"
          delay="0.2s"
          onClick={() => showScreen("tunes-screen")}
        />

        {/* LOCKED: Learn & Play */}
        <MenuTile
          emoji="🎮"
          label="Learn & Play"
          locked
          gradient="from-emerald-200 to-emerald-300"
        />

        {/* LOCKED: Piano */}
        <MenuTile
          emoji="🎹"
          label="Piano Pal"
          locked
          gradient="from-amber-200 to-amber-300"
        />

        {/* LOCKED: ABC */}
        <MenuTile
          emoji="🔤"
          label="A-B-C-D"
          locked
          spanTwo
          gradient="from-cyan-200 to-cyan-300"
        />
      </div>

      {/* ===== BEAR ===== */}
      {/* <div className="pointer-events-none">
        <Bear id="menu-bear" />
      </div> */}
      <div id="menu-bear" className="pointer-events-none float-animation">
  <img src="./4.png" alt="Bear friend"
       className="w-full h-auto" />
</div>

      {/* ===== EXIT ===== */}
      <button
        id="exit-btn"
        aria-label="Go to Home"
        onClick={() =>
          // playTapSound();
         showScreen("login-screen")
        }
        className="
          tap-feedback mt-6 mx-auto
          w-16 h-16 rounded-full
          bg-white/70 shadow-xl
          flex items-center justify-center
          active:scale-90
          transition-transform duration-150
          select-none
        "
      >
        <img
          src="./logo v1.png"
          alt="Timoun Home"
          className="w-12 h-auto pointer-events-none"
          draggable={false}
        />
      </button>
    </div>
  );
}
