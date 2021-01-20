import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeachAddChildService {

  constructor(private db: AngularFireDatabase) { }


  insert(child: Object) {
    // Pass Child into the Database.
    // Parameters will be Child Name - Class - Teacher - pid
    this.db.list('User').push(child)
      .then((result: any) => {
      console.log(result.key);
    });

  }

  method2() {
    // Check if Parents exist
    // Limitation: Unable to query this, and calculation must be done client side.
    // Check for name and key only.
    this.db.list('ParentUser')
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
      })
      );
  }

  method3() {
    // Check if there are any Children needing parent confirmation and therefore return said children.
    // Check for existing Parent Confirmations needed.
    // Add a User
    this.db.list('User');
  }

  method4() {
    // Add a pid attribute into the child after confirmation and remove stuff.
    // This one is easy. Input User object
    this.db.list('User').update("","")
      .catch((error: any) => {
        console.error(error);
      });
  }

  method5() {
    //
  }
}
