import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Contato10 } from './contato10';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private db: AngularFireDatabase) { }
  PointsList :AngularFireList<any>;

  getAll() {
    return this.db.list('PointSystem_Reward')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }
  
  getAllTask() {
    return this.db.list('PointSystem_Reward')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }

  getRewards(){
    this.PointsList = this.db.list('PointSystem_Reward');
    return this.PointsList.snapshotChanges();
  }

  getPointSystem_RewardByName(name: string){
    return this.db.object('PointSystem_Reward/' + name).valueChanges();
  }
   getRewardById(key: string){
    return this.db.object('PointSystem_Reward/' + key).valueChanges();
  }
  insert(contato10: Contato10) {
    this.db.list('PointSystem_Reward').push(contato10)
      .then((result: any) => {
        console.log(result.key);
      });
  }
  update(contato10: Contato10, key: string) {
    this.db.list('PointSystem_Reward').update(key, contato10)
      .catch((error: any) => {
        console.error(error);
      });
  }
  delete(key: string){
    this.db.object(`PointSystem_Reward/${key}`).remove();
  }
}