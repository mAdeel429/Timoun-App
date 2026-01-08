import { useRef, useEffect } from "react";

export default function ConfettiContainer() {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.innerHTML = "";
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none overflow-hidden"
    />
  );
}
