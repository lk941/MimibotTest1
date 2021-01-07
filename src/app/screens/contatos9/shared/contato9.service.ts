import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Contato9 } from './contato9';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private db: AngularFireDatabase) { }
  
  phqList :AngularFireList<any>;

  getAll() {
    return this.db.list('phq')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }

  getPhq(){
    this.phqList = this.db.list('phq');
    return this.phqList.snapshotChanges();
  }

  getPhqByName(name: string){
    return this.db.object('phq/' + name).valueChanges();
  }
}