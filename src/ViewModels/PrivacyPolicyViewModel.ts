import { useState, useEffect } from 'react';
import { db, auth } from '../Services/firebaseConfig';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  DocumentReference,
  DocumentData,
  Timestamp
} from 'firebase/firestore';


export interface PrivacyPolicyAcceptance {
  accepted: boolean;
  acceptedAt:Timestamp;
}


export function usePrivacyPolicyViewModel() {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const uid = user.uid;

  // Reference: storing in a subcollection under users
  const acceptanceRef: DocumentReference<DocumentData> = doc(
    db,
    'users',
    uid,
    'privacy',
    'acceptance'
  );

  /**
   * Load acceptance status from Firestore
   */
  async function loadAcceptance() {
    setLoading(true);
    const snap = await getDoc(acceptanceRef);
    if (snap.exists()) {
      const data = snap.data() as PrivacyPolicyAcceptance;
      setIsAccepted(data.accepted);
    } else {
      setIsAccepted(false);
    }
    setLoading(false);
  }

  /**
   * Accept privacy policy and save to Firestore
   */
  async function acceptPolicy() {
    if (isAccepted) return;
    await setDoc(acceptanceRef, {
      accepted: true,
      acceptedAt: serverTimestamp(),
    } as PrivacyPolicyAcceptance);
    setIsAccepted(true);
  }

  useEffect(() => {
    loadAcceptance();
  }, []);

  return {
    isAccepted,
    loading,
    acceptPolicy,
  };
}
