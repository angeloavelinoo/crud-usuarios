import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private dataBaseStore: AngularFirestore) { }

  getAllUsers() {
    return this.dataBaseStore.collection('users').valueChanges({idField: 'firebaseId'}) as Observable<any[]>;
  }

  addUser(user: User) {
    return this.dataBaseStore.collection('users').add(user);
  }
  
  updateUser(userId: string | undefined, user: User) {
    return this.dataBaseStore.collection("users").doc(userId).update(user);
  }

  deleteUser(firebaseId: string) {
    return this.dataBaseStore.collection('users').doc(firebaseId).delete();
  }

}


