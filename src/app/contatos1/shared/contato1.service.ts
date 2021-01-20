import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// import * as firebase from 'angularfire2';
//import * as firebase from '@angular/fire'
import * as firebase from 'firebase/app';
import { Contato1 } from './contato1';
import { map } from 'rxjs/operators';
import { Http ,HttpModule} from '@angular/http';
import { FirebaseApp } from 'angularfire2';

 
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private db: AngularFireDatabase) { }
  bullyList :AngularFireList<any>;
  parentList :AngularFireList<any>;
  // databaseURL = "https://mimibot-6c7f4.firebaseio.com";

  insert(contato1: Contato1) {
    this.db.list('Bullying').push(contato1)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  update(contato1: Contato1, key: string) {
    this.db.list('Bullying').update(key, contato1)
      .catch((error: any) => {
        console.error(error);
      });
  }

  update1(action: string, date: string, victim: string, reason: string, bullyType: string){
    var ref = firebase.database().ref('Bullying');
    ref.orderByChild('Action').equalTo(action).once("value", function(snapshot) {
      snapshot.forEach(function(bully) {
        const date1 = bully.child('Date').val();
        const victim1 = bully.child('Victim').val();
        const reason1 = bully.child('Reason').val();

        if (date == date1 && victim == victim1 && reason == reason1){
          bully.ref.update({ BullyType: bullyType });
        }
      });
    });
  }

  getAll() {
    return this.db.list('Bullying')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}));
        })
      );
  }
 
  delete(key: string) {
    this.db.object(`Bullying/${key}`).remove();
  }

  getBully(){
    this.bullyList = this.db.list('Bullying');
    return this.bullyList.snapshotChanges();
  }

  getBullyById(key: string){
    return this.db.object('Bullying/' + key).valueChanges();
  }

  getParent() {
    this.parentList = this.db.list('ParentUser');
    return this.parentList.snapshotChanges();
  }
}