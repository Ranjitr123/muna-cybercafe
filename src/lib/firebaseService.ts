import { db, isFirebaseConfigured } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

export interface FirebaseEnquiry {
  name: string;
  mobile: string;
  email?: string;
  service: string;
  message?: string;
  source?: string;
  status?: string;
  createdAt?: any;
}

/**
 * Saves a customer contact/enquiry form submission to Firebase Cloud Firestore.
 */
export async function saveEnquiryToFirebase(data: FirebaseEnquiry): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!isFirebaseConfigured()) {
      console.warn('[Firebase] Config keys missing in environment. Skipping Firebase write.');
      return { success: false, error: 'Firebase configuration missing' };
    }

    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...data,
      status: data.status || 'new',
      createdAt: data.createdAt || new Date().toISOString(),
    });

    console.log('[Firebase] Enquiry saved successfully with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('[Firebase Error] Failed to save enquiry:', error);
    return { success: false, error: error.message || 'Unknown Firebase error' };
  }
}

/**
 * Saves a new Government Notice or Scholarship Alert to Firebase Cloud Firestore.
 */
export async function saveNoticeToFirebase(notice: {
  title: string;
  category: string;
  deadline: string;
  description: string;
  status: string;
  isNew?: boolean;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    if (!isFirebaseConfigured()) {
      return { success: false, error: 'Firebase configuration missing' };
    }

    const docRef = await addDoc(collection(db, 'notices'), {
      ...notice,
      createdAt: serverTimestamp(),
    });

    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('[Firebase Error] Failed to save notice:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetches latest notices from Firebase Cloud Firestore.
 */
export async function getNoticesFromFirebase(maxCount = 10) {
  try {
    if (!isFirebaseConfigured()) {
      return [];
    }

    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'), limit(maxCount));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: any) {
    console.error('[Firebase Error] Failed to fetch notices:', error);
    return [];
  }
}
