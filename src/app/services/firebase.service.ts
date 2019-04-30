import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 

 
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private todosCollection: AngularFirestoreCollection;
 
  private todos: Observable<any[]>;
 
  constructor(public db: AngularFirestore) {}

  connectUser(email){

    const conected = new Promise ((resolve, reject) => {

      this.todosCollection = this.db.collection(email);

      if(!this.todosCollection)
        reject(false);
  
      this.todos = this.todosCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );

      resolve(true);
    });

    return conected;
  }
 
  getTodos() {
    return this.todos;
  }
 
  getTodo(id) {
    return this.todosCollection.doc(id).valueChanges();
  }
 
  updateTodo(todo: any, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }
 
  addTodo(todo: any) {
    return this.todosCollection.add(todo);
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }
}
