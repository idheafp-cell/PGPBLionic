import { Service } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from './firebase.service';

@Service()
export class AuthService {
  // login method
  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // register method
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
}
