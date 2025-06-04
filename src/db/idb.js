import { openDB } from 'idb';

// One database for everything!
const DB_NAME = 'boardgame-db';
const MYSTERY_BOXES_STORE = 'mystery-boxes';
const SIDEQUESTS_STORE = 'sidequests';
const QUIZ_FINISHED_CITIES_STORE = 'finished-cities';

export async function getDB() {
  return openDB(DB_NAME, 3, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(MYSTERY_BOXES_STORE)) {
        db.createObjectStore(MYSTERY_BOXES_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(SIDEQUESTS_STORE)) {
        db.createObjectStore(SIDEQUESTS_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(QUIZ_FINISHED_CITIES_STORE)) {
        db.createObjectStore(QUIZ_FINISHED_CITIES_STORE, { keyPath: 'city' });
      }
    }
  });
}

// ==== Mystery Boxes ====
export async function saveMysteryBox(box) {
  const db = await getDB();
  return db.put(MYSTERY_BOXES_STORE, box);
}
export async function getAllMysteryBoxes() {
  const db = await getDB();
  return db.getAll(MYSTERY_BOXES_STORE);
}
export async function saveAllMysteryBoxes(boxes) {
  const db = await getDB();
  const tx = db.transaction(MYSTERY_BOXES_STORE, 'readwrite');
  for (const box of boxes) {
    await tx.store.put(box);
  }
  await tx.done;
}

// ==== SideQuests ====
export async function saveSideQuest(quest) {
  const db = await getDB();
  return db.put(SIDEQUESTS_STORE, quest);
}
export async function getAllSideQuests() {
  const db = await getDB();
  return db.getAll(SIDEQUESTS_STORE);
}
export async function saveAllSideQuests(quests) {
  const db = await getDB();
  const tx = db.transaction(SIDEQUESTS_STORE, 'readwrite');
  for (const quest of quests) {
    await tx.store.put(quest);
  }
  await tx.done;
}

// ==== Quiz Finished Cities ====
export async function getFinishedCities() {
  const db = await getDB();
  const all = await db.getAll(QUIZ_FINISHED_CITIES_STORE);
  return all.map(item => item.city);
}
export async function addFinishedCity(city) {
  const db = await getDB();
  await db.put(QUIZ_FINISHED_CITIES_STORE, { city });
}
export async function resetFinishedCities() {
  const db = await getDB();
  const tx = db.transaction(QUIZ_FINISHED_CITIES_STORE, 'readwrite');
  await tx.store.clear();
  await tx.done;
}
