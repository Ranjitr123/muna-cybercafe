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
 * Saves a registered customer user profile to Firebase Cloud Firestore.
 */
export async function saveUserToFirebase(user: {
  name: string;
  email: string;
  mobile: string;
  password?: string;
  role?: string;
  createdAt?: string;
}): Promise<{ success: boolean; id?: string }> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (projectId) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users`;
      const body = {
        fields: {
          name: { stringValue: user.name || "" },
          email: { stringValue: user.email || "" },
          mobile: { stringValue: user.mobile || "" },
          password: { stringValue: user.password || "" },
          role: { stringValue: user.role || "customer" },
          createdAt: { stringValue: user.createdAt || new Date().toISOString() },
        }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const json = await res.json();
        const docId = (json.name || "").split("/").pop() || "user_created";
        console.log("[Firebase REST API] User profile saved successfully with ID:", docId);
        return { success: true, id: docId };
      }
    } catch (e) {
      console.warn("[Firebase REST API] User save error:", e);
    }
  }

  try {
    if (isFirebaseConfigured()) {
      const docRef = await addDoc(collection(db, 'users'), {
        ...user,
        createdAt: user.createdAt || new Date().toISOString(),
      });
      return { success: true, id: docRef.id };
    }
  } catch (err) {
    console.error("[Firebase SDK] User save error:", err);
  }

  return { success: false };
}

/**
 * Authenticates user credentials live against Firebase Cloud Firestore.
 */
export async function authenticateUserWithFirebase(
  emailOrMobile: string,
  pass: string
): Promise<{ success: boolean; user?: any; error?: string }> {
  const users = await getUsersFromFirebase();
  const cleanInput = emailOrMobile.trim().toLowerCase();
  const cleanDigits = cleanInput.replace(/\D/g, '');

  const matchedUser = users.find((u: any) => {
    const userEmail = (u.email || '').toLowerCase();
    const userMobileDigits = (u.mobile || '').replace(/\D/g, '');
    return (userEmail && userEmail === cleanInput) || (cleanDigits && userMobileDigits === cleanDigits);
  });

  if (!matchedUser) {
    return { success: false, error: 'User not found in Firebase. Please sign up first.' };
  }

  if (matchedUser.password && matchedUser.password !== pass) {
    return { success: false, error: 'Incorrect password' };
  }

  return {
    success: true,
    user: {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      mobile: matchedUser.mobile,
      role: matchedUser.role || 'customer',
      createdAt: matchedUser.createdAt,
    },
  };
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

/**
 * Updates the status of a customer lead/enquiry in Firebase Cloud Firestore.
 */
export async function updateEnquiryStatusInFirebase(docId: string, newStatus: string): Promise<boolean> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (projectId && docId) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/enquiries/${docId}?updateMask.fieldPaths=status`;
      const body = {
        fields: {
          status: { stringValue: newStatus }
        }
      };

      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        console.log(`[Firebase REST API] Lead ${docId} status updated to ${newStatus}`);
        return true;
      }
    } catch (e) {
      console.warn("[Firebase REST API] Update status error:", e);
    }
  }
  return false;
}

/**
 * Updates the status of a customer request inside a user's document in users collection in Firebase Cloud Firestore.
 */
export async function updateUserServiceRequestStatus(userDocId: string, requestId: string, newStatus: string): Promise<boolean> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (!projectId || !userDocId || !requestId) return false;

  try {
    const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${userDocId}`;
    const res = await fetch(docUrl, { cache: 'no-store' });
    if (!res.ok) return false;

    const json = await res.json();
    const existingFields = json.fields || {};
    const existingRawRequests = existingFields.requests?.arrayValue?.values || [];

    const updatedRawRequests = existingRawRequests.map((r: any) => {
      const rf = r.mapValue?.fields || {};
      const id = rf.id?.stringValue || '';
      if (id === requestId) {
        return {
          mapValue: {
            fields: {
              ...rf,
              status: { stringValue: newStatus }
            }
          }
        };
      }
      return r;
    });

    const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${userDocId}?updateMask.fieldPaths=requests`;
    const patchBody = {
      fields: {
        requests: {
          arrayValue: {
            values: updatedRawRequests
          }
        }
      }
    };

    const patchRes = await fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchBody),
    });

    if (patchRes.ok) {
      console.log(`[Firebase REST API] Updated status of request ${requestId} to ${newStatus} in user doc ${userDocId}`);
      return true;
    }
  } catch (e) {
    console.error('[Firebase] Update user request status error:', e);
  }

  return false;
}

/**
 * Appends a new service request to a user's document in users collection in Firebase Cloud Firestore.
 */
export async function addCustomerServiceRequestToUser(userEmailOrMobile: string, serviceData: { service: string; message?: string }): Promise<{ success: boolean; id?: string }> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (!projectId) return { success: false };

  try {
    const usersUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users`;
    const res = await fetch(usersUrl, { cache: 'no-store' });
    if (!res.ok) return { success: false };

    const json = await res.json();
    const docs = json.documents || [];
    const cleanInput = userEmailOrMobile.trim().toLowerCase();
    const cleanDigits = cleanInput.replace(/\D/g, '');

    const userDoc = docs.find((doc: any) => {
      const f = doc.fields || {};
      const uEmail = (f.email?.stringValue || '').trim().toLowerCase();
      const uMobile = (f.mobile?.stringValue || '').replace(/\D/g, '');
      if (cleanInput.includes('@') && uEmail) {
        return uEmail === cleanInput;
      }
      if (cleanDigits && uMobile) {
        return uMobile === cleanDigits;
      }
      return false;
    });

    if (!userDoc) {
      console.warn('[Firebase] User document not found for request attachment');
      return { success: false };
    }

    const docName = userDoc.name;
    const existingFields = userDoc.fields || {};
    const existingRawRequests = existingFields.requests?.arrayValue?.values || [];

    const newReqId = `REQ-${Date.now()}`;
    const newReqValue = {
      mapValue: {
        fields: {
          id: { stringValue: newReqId },
          service: { stringValue: serviceData.service },
          message: { stringValue: serviceData.message || '' },
          status: { stringValue: 'New' },
          createdAt: { stringValue: new Date().toLocaleDateString() },
        }
      }
    };

    const updatedRawRequests = [...existingRawRequests, newReqValue];

    const patchUrl = `https://firestore.googleapis.com/v1/${docName}?updateMask.fieldPaths=requests`;
    const patchBody = {
      fields: {
        ...existingFields,
        requests: {
          arrayValue: {
            values: updatedRawRequests
          }
        }
      }
    };

    const patchRes = await fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchBody),
    });

    if (patchRes.ok) {
      console.log(`[Firebase REST API] Appended request ${newReqId} to user doc ${docName}`);
      return { success: true, id: newReqId };
    }
  } catch (e) {
    console.error('[Firebase] Add request to user error:', e);
  }

  return { success: false };
}

/**
 * Fetches all registered customer users with their requested services from Firebase Cloud Firestore.
 */
export async function getUsersFromFirebase(): Promise<any[]> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (projectId) {
    try {
      const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users`;
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const docs = json.documents || [];
        return docs.map((doc: any) => {
          const f = doc.fields || {};
          const id = (doc.name || '').split('/').pop() || `U-${Date.now()}`;
          const rawReqs = f.requests?.arrayValue?.values || [];
          const requests = rawReqs.map((r: any) => {
            const rf = r.mapValue?.fields || {};
            return {
              id: rf.id?.stringValue || `REQ-${Date.now()}`,
              service: rf.service?.stringValue || 'Digital Service',
              message: rf.message?.stringValue || '',
              status: rf.status?.stringValue || 'New',
              createdAt: rf.createdAt?.stringValue || new Date().toLocaleDateString(),
            };
          });

          return {
            id,
            name: f.name?.stringValue || 'Registered Customer',
            email: f.email?.stringValue || '',
            mobile: f.mobile?.stringValue || '',
            password: f.password?.stringValue || '',
            role: f.role?.stringValue || 'customer',
            createdAt: f.createdAt?.stringValue ? new Date(f.createdAt.stringValue).toLocaleDateString() : new Date().toLocaleDateString(),
            requests,
          };
        });
      }
    } catch (e) {
      console.warn('[Firebase REST API] Fetch users error:', e);
    }
  }

  try {
    if (isFirebaseConfigured()) {
      const querySnapshot = await getDocs(collection(db, 'users'));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  } catch (err) {
    console.error('[Firebase SDK] Fetch users error:', err);
  }

  return [];
}

/**
 * Deletes a user document from users collection in Firebase Cloud Firestore.
 */
export async function deleteUserFromFirebase(userDocIdOrEmail: string): Promise<boolean> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (!projectId || !userDocIdOrEmail) return false;

  try {
    let targetDocId = userDocIdOrEmail;

    // If input is an email or mobile, look up the document ID
    if (userDocIdOrEmail.includes('@') || userDocIdOrEmail.length < 20) {
      const users = await getUsersFromFirebase();
      const cleanInput = userDocIdOrEmail.trim().toLowerCase();
      const cleanDigits = cleanInput.replace(/\D/g, '');

      const found = users.find((u: any) => {
        const uEmail = (u.email || '').trim().toLowerCase();
        const uMobile = (u.mobile || '').replace(/\D/g, '');
        return (cleanInput.includes('@') && uEmail === cleanInput) || (cleanDigits && uMobile === cleanDigits);
      });

      if (found) {
        targetDocId = found.id;
      }
    }

    const deleteUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${targetDocId}`;
    const res = await fetch(deleteUrl, { method: 'DELETE' });

    if (res.ok) {
      console.log(`[Firebase REST API] Deleted user document ${targetDocId}`);
      return true;
    }
  } catch (e) {
    console.error('[Firebase] Delete user error:', e);
  }

  return false;
}

/**
 * Updates a user's password in users collection in Firebase Cloud Firestore.
 */
export async function updateUserPasswordInFirebase(emailOrMobile: string, newPass: string): Promise<boolean> {
  const projectId = process.env['FIREBASE_PROJECT_ID'] || process.env['NEXT_PUBLIC_FIREBASE_PROJECT_ID'] || ('muna' + 'tech' + 'world');
  if (!projectId || !emailOrMobile || !newPass) return false;

  try {
    const users = await getUsersFromFirebase();
    const cleanInput = emailOrMobile.trim().toLowerCase();
    const cleanDigits = cleanInput.replace(/\D/g, '');

    const found = users.find((u: any) => {
      const uEmail = (u.email || '').trim().toLowerCase();
      const uMobile = (u.mobile || '').replace(/\D/g, '');
      return (cleanInput.includes('@') && uEmail === cleanInput) || (cleanDigits && uMobile === cleanDigits);
    });

    if (!found) return false;

    const patchUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/users/${found.id}?updateMask.fieldPaths=password`;
    const patchBody = {
      fields: {
        password: { stringValue: newPass }
      }
    };

    const res = await fetch(patchUrl, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patchBody),
    });

    if (res.ok) {
      console.log(`[Firebase REST API] Password updated for user ${found.id}`);
      return true;
    }
  } catch (e) {
    console.error('[Firebase] Update user password error:', e);
  }

  return false;
}
