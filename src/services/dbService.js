const DB_NAME = "BlockExplorerDB";
const DB_VERSION = 1;

const METRICS = "metrics";

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open IndexedDB");

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(METRICS, { keyPath: "id" });
    };
  });
};

const saveToIndexedDB = async (key, value) => {
  const db = await openDatabase();
  const transaction = db.transaction(METRICS, "readwrite");
  const store = transaction.objectStore(METRICS);
  store.put({ id: key, data: value });
};

const loadFromIndexedDB = async (key) => {
  const db = await openDatabase();
  const transaction = db.transaction(METRICS, "readonly");
  const store = transaction.objectStore(METRICS);
  const request = store.get(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result?.data || null);
    request.onerror = () => reject("Failed to retrieve data from IndexedDB");
  });
};

const clearIndexedDB = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => {
      console.log(`Database ${DB_NAME} deleted successfully`);
      resolve();
    };
    request.onerror = (event) => {
      console.error(`Error deleting database: ${event.target.errorCode}`);
      reject(event);
    };
    request.onblocked = () => {
      console.warn(`Database deletion blocked`);
    };
  });
};

// Usage

export { loadFromIndexedDB, saveToIndexedDB, clearIndexedDB };
