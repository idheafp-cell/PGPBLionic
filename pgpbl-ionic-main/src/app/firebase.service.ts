import { Service } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { environment } from '../environments/environment';
const app = initializeApp(environment.firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

@Service()
export class FirebaseService {
}
