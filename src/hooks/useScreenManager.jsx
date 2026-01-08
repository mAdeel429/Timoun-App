import { useState } from "react";

export function useScreenManager(initial = "login-screen") {
  const [screen, setScreen] = useState(initial);

  const showScreen = (id) => {
    setScreen(id);
  };

  return {
    screen,
    showScreen
  };
}
