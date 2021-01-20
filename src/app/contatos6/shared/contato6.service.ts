import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Contato6 } from './contato6';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';

 
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private db: AngularFireDatabase) { }
  moodList :AngularFireList<any>;

  insert(contato6: Contato6) {
    this.db.list('mood').push(contato6)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(contato6: Contato6, key: string) {
    this.db.list('mood').update(key, contato6)
      .catch((error: any) => {
        console.error(error);
      });
  }

  update1(name: string, date: string, mood: string, moodReason: string, moodType: string){
    var ref = firebase.database().ref('mood');
    ref.orderByChild('date').equalTo(date).once("value", function(snapshot) {
      snapshot.forEach(function(mood) {
        const date1 = mood.child('date').val();
        const mood1 = mood.child('mood').val();
        const moodReason1 = mood.child('moodReason').val();

        if (date == date1 && mood == mood1 && moodReason == moodReason1){
          mood.ref.update({ moodType: moodType });
        }
      });
    });
  }

  getAll() {
    return this.db.list('mood')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }
 
  delete(key: string) {
    this.db.object(`mood/${key}`).remove();
  }

  getMood(){
    this.moodList = this.db.list('mood');
    return this.moodList.snapshotChanges();
  }

  getMoodById(key: string){
    return this.db.object('mood/' + key).valueChanges();
  }
}