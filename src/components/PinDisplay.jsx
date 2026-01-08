import { forwardRef } from "react";

const PinDisplay = forwardRef(({ pin, shake }, ref) => (
  <div
    ref={ref}
    id="pin-display"
    className={`flex gap-6 mb-10 transition-all duration-300 ${
      shake ? "shake" : ""
    }`}
  >
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        className={`pin-dot w-7 h-7 rounded-full transition-all duration-300 ${
          i < pin.length ? "bg-amber-500 scale-125" : "bg-amber-200"
        }`}
      />
    ))}
  </div>
));

export default PinDisplay;
