import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCg_GbIvh08jThwSbxrHV336IQeJmbzlZ0',
	authDomain: 'countryquiz-18516.firebaseapp.com',
	projectId: 'countryquiz-18516',
	storageBucket: 'countryquiz-18516.appspot.com',
	messagingSenderId: '394322749570',
	appId: '1:394322749570:web:862ca3a6757acc5be6ec9b'
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// Matches collection
export type GameSession = {
	by: string;
	date: Timestamp;
	score: {
		score: number;
		maxScore: number;
	};
};

export const gameSessionsCollection = collection(
	db,
	'gameSessions'
) as CollectionReference<GameSession>;
