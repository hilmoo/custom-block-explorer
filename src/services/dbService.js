const DB_NAME = "BlockExplorerDB";
const DB_VERSION = 1;

const METRICS = "metrics";
const ABIS = "abis";

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(METRICS, { keyPath: "id" });
      if (!db.objectStoreNames.contains(ABIS)) {
        db.createObjectStore(ABIS, { keyPath: "address" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open IndexedDB");
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

// Save ABI to IndexedDB under the contract address key
const saveABIToIndexedDB = async (contractAddress, abi) => {
  const db = await openDatabase();
  const transaction = db.transaction(ABIS, "readwrite");
  const store = transaction.objectStore(ABIS);
  store.put({ address: contractAddress, abi });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject("Failed to save ABI to IndexedDB");
  });
};

// Load ABI from IndexedDB using the contract address
const loadABIFromIndexedDB = async (contractAddress) => {
  console.log({ contractAddress });
  const db = await openDatabase();
  const transaction = db.transaction(ABIS, "readonly");
  const store = transaction.objectStore(ABIS);
  const request = store.get(contractAddress);
  console.log({ request });

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result?.abi || null);
    request.onerror = () => reject("Failed to load ABI from IndexedDB");
  });
};

export {
  loadFromIndexedDB,
  saveToIndexedDB,
  clearIndexedDB,
  saveABIToIndexedDB,
  loadABIFromIndexedDB,
};
