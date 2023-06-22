import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updatePassword} from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

export interface UserID {
  username: string | null;
  uid: string;
  nric: string;
}


@Injectable({
	providedIn: 'root'
})
export class AuthService {
  private user: UserID;

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
  setUser(user: UserID) {
    return this.user = user;
  }

  getUserUid() : string {
    return this.user.uid;
  }

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

  changePassword(newPassword: string, confirmPassword: string): Promise<void> {
    if (newPassword !== confirmPassword) {
      return Promise.reject('Passwords do not match.');
    }

    const user = this.auth.currentUser;
    if (user) {
      return updatePassword(user, newPassword);
    } else {
      return Promise.reject('No user is currently logged in.');
    }
  }
  
}