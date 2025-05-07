import { useState, useEffect, useCallback } from 'react';
import { Goal, NewGoal } from '../Models/GoalsModel'; // Adjust the import path as necessary
import { db } from '../Services/firebaseConfig'; // Adjust the import path as necessary
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';

/**
 * Hook serving as the ViewModel for the Goals screen,
 * persisting data in Cloud Firestore.
 */
export function useGoalsViewModel() {
  // Local state
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<NewGoal>({
    title: '',
    description: '',
    deadline: new Date(),
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  // Reference to 'goals' collection
  const goalsCollection = collection(db, 'goals');

  // Subscribe to Firestore changes
  useEffect(() => {
    const q = query(goalsCollection);
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const loaded: Goal[] = snapshot.docs.map(docSnap => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          description: data.description,
          deadline: data.deadline.toDate(),
          completed: data.completed,
        } as Goal;
      });
      setGoals(loaded);
    });
    return () => unsubscribe();
  }, []);

  // Add a new goal to Firestore
  const addGoal = useCallback(async () => {
    const title = newGoal.title.trim();
    if (!title) return;

    try {
      await addDoc(goalsCollection, {
        title,
        description: newGoal.description.trim(),
        deadline: newGoal.deadline,
        completed: false,
      });
      // Reset local form
      setNewGoal({ title: '', description: '', deadline: new Date() });
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  }, [newGoal]);

  // Toggle completion status in Firestore
  const toggleCompletion = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, 'goals', id);
      const goal = goals.find(g => g.id === id);
      if (!goal) return;
      await updateDoc(docRef, { completed: !goal.completed });
    } catch (error) {
      console.error('Error toggling goal:', error);
    }
  }, [goals]);

  // Delete a goal from Firestore
  const deleteGoal = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, 'goals', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  }, []);

  /**
   * Filter goals based on selected period (client-side)
   */
  const filteredGoals = useCallback(() => {
    const now = new Date();
    return goals.filter(goal => {
      const diff = goal.deadline.getTime() - now.getTime();
      switch (selectedPeriod) {
        case 'week':
          return diff <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return diff <= 30 * 24 * 60 * 60 * 1000;
        case 'year':
          return diff <= 365 * 24 * 60 * 60 * 1000;
      }
    });
  }, [goals, selectedPeriod]);

  return {
    // State
    goals,
    filteredGoals: filteredGoals(),
    newGoal,
    modalVisible,
    showDatePicker,
    selectedPeriod,

    // Setters
    setNewGoal,
    setModalVisible,
    setShowDatePicker,
    setSelectedPeriod,

    // Actions
    addGoal,
    toggleCompletion,
    deleteGoal,
  } as const;
}
