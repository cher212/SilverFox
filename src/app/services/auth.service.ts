import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
//import {Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

  auth = getAuth();

	constructor(private fauth: AngularFireAuth, private router: Router) {}

	// async register({ email, password }) {
	// 	try {
	// 		const user = await createUserWithEmailAndPassword(this.auth, email, password);
	// 		return user;
	// 	} catch (e) {
	// 		return null;
	// 	}
	// }

  async register({email, password}) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      ); 
      return user;
    } catch(e) {
      return null;
    }
  }

  login(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          resolve(user);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

	logout() {
		return signOut(this.auth);
	}
}