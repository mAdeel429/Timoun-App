const DB_NAME = "timoun-media-db";
const STORE = "media";

export function openDB() {
  return new Promise((resolve) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE);
    };

    req.onsuccess = () => resolve(req.result);
  });
}

export async function saveMedia(key, blob) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(blob, key);
}

export async function getMedia(key) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readonly");
  return tx.objectStore(STORE).get(key);
}
