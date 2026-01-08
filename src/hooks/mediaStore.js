// EXACTLY like HTML globals

export const mediaStore = {
  audio: new Audio(),
  video: document.createElement("video"),
};

mediaStore.audio.preload = "auto";
mediaStore.audio.loop = false;

mediaStore.video.playsInline = true;
mediaStore.video.preload = "auto";
