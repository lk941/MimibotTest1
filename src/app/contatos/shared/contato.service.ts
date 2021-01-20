import { Injectable } from '@angular/core';
import {Contato} from './contato';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private db: AngularFireDatabase){}
  userList :AngularFireList<any>;

  insert(contato: Contato){
    this.db.list('Homework').push(contato)
    .then((result: any) => {
      console.log(result.key);
    });
  }

  update(contato: Contato, key: string){
    this.db.list('Homework').update(key, contato)
    .catch((error: any) =>{
      console.error(error);
    });
  }

  getAll(){
    return this.db.list('Homework')
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val()as {} }));
      })
    );
  }

  delete(key: string){
    this.db.object(`Homework/${key}`).remove();
  }

  getUser(){
    this.userList = this.db.list('User');
    return this.userList.snapshotChanges();
  }
}
