const DB_NAME = 'BlockExplorerDB';
const DB_VERSION = 1;

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('blocks', { keyPath: 'number' });
    };
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const saveBlockToDB = async (block) => {
  const db = await openDB();
  const transaction = db.transaction('blocks', 'readwrite');
  const store = transaction.objectStore('blocks');
  store.put(block);
};

export const getBlockFromDB = async (blockNumber) => {
  const db = await openDB();
  const transaction = db.transaction('blocks', 'readonly');
  const store = transaction.objectStore('blocks');
  return store.get(blockNumber);
};
