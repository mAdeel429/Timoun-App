export default function Keypad({ onNumber, onClear }) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0];

  return (
    <div id="keypad" className="grid grid-cols-3 gap-3 max-w-xs w-full">
      {numbers.map((num, i) => {
        if (num === "") return <div key={i}></div>;

        return (
          <button
            key={i}
            className="keypad-btn h-20 rounded-3xl bg-white/80 shadow-lg text-3xl font-bold text-amber-600 hover:bg-white"
            onClick={(e) => onNumber(num, e.currentTarget)}
          >
            {num}
          </button>
        );
      })}

      <button
        className="h-20 rounded-3xl bg-rose-100 shadow-lg text-2xl font-bold text-rose-400 hover:bg-rose-200"
        onClick={(e) => onClear(e.currentTarget)}
      >
        ✕
      </button>
    </div>
  );
}
