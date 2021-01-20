import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Contato5 } from './contato5';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private db: AngularFireDatabase) { }
  hobbiesList :AngularFireList<any>;

  insert(contato5: Contato5) {
    this.db.list('Hobbies').push(contato5)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(contato5: Contato5, key: string) {
    this.db.list('Hobbies').update(key, contato5)
      .catch((error: any) => {
        console.error(error);
      });
  }


  getAll() {
    return this.db.list('Hobbies')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }
 
  delete(key: string) {
    this.db.object(`Hobbies/${key}`).remove();
  }


  getHobbies(){
    this.hobbiesList = this.db.list('Hobbies');
    return this.hobbiesList.snapshotChanges();
  }

  getHobbiesById(key: string){
    return this.db.object('Hobbies/' + key).valueChanges();
  }
}