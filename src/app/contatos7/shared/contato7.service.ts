import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Contato7 } from './contato7';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private db: AngularFireDatabase) { }
  PointsList :AngularFireList<any>;

  getAll() {
    return this.db.list('PointSystem_Points')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }
  
  getAllTask() {
    return this.db.list('PointSystem_Task')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {} }));
        })
      );
  }

  getPoints(){
    this.PointsList = this.db.list('PointSystem_Points');
    return this.PointsList.snapshotChanges();
  }
  
  getTask(){
    this.PointsList = this.db.list('PointSystem_Task');
    return this.PointsList.snapshotChanges();
  }

  getPointSystem_PointsByName(name: string){
    return this.db.object('PointSystem_Points/' + name).valueChanges();
  }
   getTaskById(key: string){
    return this.db.object('PointSystem_Task/' + key).valueChanges();
  }
   getPointsById(key: string){
    return this.db.object('PointSystem_Points/' + key).valueChanges();
  }
  insert(contato7: Contato7) {
    this.db.list('PointSystem_Points').push(contato7)
      .then((result: any) => {
        console.log(result.key);
      });
  }
  update(contato7: Contato7, key: string) {
    this.db.list('PointSystem_Points').update(key, contato7)
      .catch((error: any) => {
        console.error(error);
      });
  }
}