import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Contato3 } from './contato3';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Contato3Service {

  constructor(private db: AngularFireDatabase) { }

  insert(contato3: Contato3) {
    this.db.list('history').push(contato3)
      .then((result: any) => {
        console.log(result.key);
      });
  }
 
  update(contato3: Contato3, key: string) {
    this.db.list('history').update(key, contato3)
      .catch((error: any) => {
        console.error(error);
      });
  }
 
  getAll() {
    return this.db.list('history')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }
 
  delete(key: string) {
    this.db.object(`history/${key}`).remove();
  }


}
