    import { useState, useEffect } from 'react';
import { auth, db } from '../Services/firebaseConfig';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  DocumentReference,
  DocumentData,
  Timestamp
} from 'firebase/firestore';

/**
 * Model: Terms and Conditions Acceptance Record
 */
export interface TermsAcceptance {
  accepted: boolean;
  acceptedAt:Timestamp;
}

/**
 * ViewModel Hook for TermsAndConditionsScreen
 */
export function useTermsConditionsViewModel() {
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }
  const uid = user.uid;

  // Reference: subcollection under users
  const acceptanceRef: DocumentReference<DocumentData> = doc(
    db,
    'users',
    uid,
    'terms',
    'acceptance'
  );

  /**
   * Load acceptance status from Firestore
   */
  async function loadAcceptance() {
    setLoading(true);
    try {
      const snap = await getDoc(acceptanceRef);
      if (snap.exists()) {
        const data = snap.data() as TermsAcceptance;
        setIsAccepted(data.accepted);
      } else {
        setIsAccepted(false);
      }
    } catch (error) {
      console.error('Error loading terms acceptance:', error);
      setIsAccepted(false);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Accept terms and save to Firestore
   */
  async function acceptTerms() {
    if (isAccepted) return;
    setLoading(true);
    try {
      await setDoc(acceptanceRef, {
        accepted: true,
        acceptedAt: serverTimestamp(),
      } as TermsAcceptance);
      setIsAccepted(true);
    } catch (error) {
      console.error('Error saving terms acceptance:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAcceptance();
  }, []);

  return {
    isAccepted,
    loading,
    acceptTerms,
  };
}
