import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set } from 'firebase/database';

// Wait for the config to be available
const getFirebaseConfig = () => {
  return new Promise((resolve, reject) => {
    const checkConfig = () => {
      if (window.firebaseConfig) {
        resolve(window.firebaseConfig);
      } else {
        setTimeout(checkConfig, 100);
      }
    };
    checkConfig();
  });
};

// Initialize Firebase asynchronously
const initializeFirebase = async () => {
  const firebaseConfig = await getFirebaseConfig();
  return initializeApp(firebaseConfig);
};

let app;
let database;
let counterReference;

const initialize = async () => {
  app = await initializeFirebase();
  database = getDatabase(app);
  counterReference = ref(database, 'counter');
};

// Export initialized references
export let counterRef;

// Initialize everything
initialize().then(() => {
  counterRef = counterReference;
});

export const incrementCounter = async (currentValue) => {
  try {
    await set(counterRef, currentValue + 1);
  } catch (error) {
    console.error('Error incrementing counter:', error);
  }
};
