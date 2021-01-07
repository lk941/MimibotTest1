import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Contato8 } from './contato8';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private db: AngularFireDatabase) { }
  PointsList :AngularFireList<any>;

  getAll() {
    return this.db.list('PointSystem_Task')
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
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }

  getPoints(){
    this.PointsList = this.db.list('PointSystem_Task');
    return this.PointsList.snapshotChanges();
  }
  
  getTasks(){
    this.PointsList = this.db.list('PointSystem_Task');
    return this.PointsList.snapshotChanges();
  }

  getPointSystem_PointsByName(name: string){
    return this.db.object('PointSystem_Task/' + name).valueChanges();
  }
   getTaskById(key: string){
    return this.db.object('PointSystem_Task/' + key).valueChanges();
  }
   getPointsById(key: string){
    return this.db.object('PointSystem_Task/' + key).valueChanges();
  }
  insert(contato8: Contato8) {
    this.db.list('PointSystem_Task').push(contato8)
      .then((result: any) => {
        console.log(result.key);
      });
  }
  update(contato8: Contato8, key: string) {
    this.db.list('PointSystem_Task').update(key, contato8)
      .catch((error: any) => {
        console.error(error);
      });
  }
  delete(key: string){
    this.db.object(`PointSystem_Task/${key}`).remove();
  }
}