const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyA-eGp26vZqUQ9_8Nq14wo32Uhqe5i5La0",
  authDomain: "munatechworld.firebaseapp.com",
  projectId: "munatechworld",
  storageBucket: "munatechworld.firebasestorage.app",
  messagingSenderId: "613765538237",
  appId: "1:613765538237:web:7dd91889e9fa87534b72d4",
  measurementId: "G-XF3237HGN7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runTest() {
  console.log("Attempting to write test lead to Firebase Cloud Firestore (munatechworld)...");
  try {
    const docRef = await addDoc(collection(db, "enquiries"), {
      name: "Test Customer (Sanjit)",
      mobile: "9777735527",
      email: "sanjit007muna@gmail.com",
      service: "PAN Card Application",
      message: "Testing Firebase Cloud Firestore connection live!",
      source: "Firebase Test Script",
      createdAt: new Date().toISOString(),
    });
    console.log("SUCCESS! Test document created with ID:", docRef.id);
  } catch (err) {
    console.error("ERROR writing to Firestore:", err);
  }
}

runTest();
