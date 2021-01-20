import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Contato2 } from './contato2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Contato2Service {

  constructor(private db: AngularFireDatabase) { }

  insert(contato2: Contato2) {
    this.db.list('quiz').push(contato2)
      .then((result: any) => {
        console.log(result.key);
      });
  }
 
  update(contato2: Contato2, key: string) {
    this.db.list('quiz').update(key, contato2)
      .catch((error: any) => {
        console.error(error);
      });
  }
 
  getAll() {
    return this.db.list('quiz')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
        })
      );
  }
 
  delete(key: string) {
    this.db.object(`quiz/${key}`).remove();
  }

}
