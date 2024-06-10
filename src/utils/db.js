import { openDB } from "idb";

const DB_NAME = "movit_db";
const STORE_NAME = "profiles";

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

export async function getProfile() {
  const db = await dbPromise;
  return db.get(STORE_NAME, 1);
}

export async function saveProfile(profile) {
  const db = await dbPromise;
  await db.put(STORE_NAME, { id: 1, ...profile });
}
