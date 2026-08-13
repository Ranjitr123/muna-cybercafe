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
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (projectId) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/enquiries`;
    const body = {
      fields: {
        name: { stringValue: data.name || "" },
        mobile: { stringValue: data.mobile || "" },
        email: { stringValue: data.email || "" },
        service: { stringValue: data.service || "" },
        message: { stringValue: data.message || "" },
        source: { stringValue: data.source || "Website Contact Form" },
        status: { stringValue: data.status || "new" },
        createdAt: { stringValue: data.createdAt || new Date().toISOString() },
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const json = await res.json();
      const docName = json.name || "";
      const docId = docName.split("/").pop() || "created";
      console.log("[Firebase REST API] Lead saved successfully with ID:", docId);
      return { success: true, id: docId };
    }

    console.warn("[Firebase REST API] Non-200 status, attempting SDK fallback...");
  } catch (restErr) {
    console.warn("[Firebase REST API] Fetch error, attempting SDK fallback:", restErr);
  }
}

  // Fallback to Firebase JS SDK
  try {
    if (!isFirebaseConfigured()) {
      return { success: false, error: 'Firebase configuration missing' };
    }

    const docRef = await addDoc(collection(db, 'enquiries'), {
      ...data,
      status: data.status || 'new',
      createdAt: data.createdAt || new Date().toISOString(),
    });

    console.log('[Firebase SDK] Enquiry saved successfully with ID:', docRef.id);
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
 * Fetches all customer lead submissions dynamically from Firebase Cloud Firestore.
 */
export async function getEnquiriesFromFirebase(): Promise<any[]> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (projectId) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/enquiries`;
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const docs = json.documents || [];
        return docs.map((doc: any) => {
          const f = doc.fields || {};
          const id = (doc.name || '').split('/').pop() || `L-${Date.now()}`;
          return {
            id,
            name: f.name?.stringValue || 'Customer',
            mobile: f.mobile?.stringValue || '',
            email: f.email?.stringValue || '',
            service: f.service?.stringValue || 'Cyber Cafe Service',
            message: f.message?.stringValue || '',
            source: f.source?.stringValue || 'Website Contact Form',
            status: f.status?.stringValue || 'New',
            createdAt: f.createdAt?.stringValue ? new Date(f.createdAt.stringValue).toLocaleDateString() : new Date().toLocaleDateString(),
          };
        });
      }
    } catch (e) {
      console.warn('[Firebase REST API] Fetch enquiries error:', e);
    }
  }

  try {
    if (isFirebaseConfigured()) {
      const querySnapshot = await getDocs(collection(db, 'enquiries'));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  } catch (err) {
    console.error('[Firebase SDK] Fetch enquiries error:', err);
  }

  return [];
}
