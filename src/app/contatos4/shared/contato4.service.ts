import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Contato4 } from './contato4';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class Contato4Service {
chatList = [];
wordList: any[];
childName = "";
test: AngularFireList<any>;


  constructor(private db: AngularFireDatabase,private http: HttpClient) {

    // db.list('/Chats')
    // .snapshotChanges()
    // .subscribe(chats => {
    //   this.chatList = chats;
    //   console.log(this.chatList);
    // })
    //for testing purposes
    
    //this.getChatByUserID('-LiBMZsSTAUzmMzLrXT2');
  }
  

  // getChatByUser(key: string){
  //   return this.db.object('Chats/' + key)
  //     .snapshotChanges()
  //     .subscribe(data => {
  //       this.chatList.push(data);
  //     })
  // }

  // getChatByUserID(key:string){
  //   console.log("this is from the service component function");
  //   this.db.list('Chats/'+key)
  //     .snapshotChanges()
  //     .subscribe(chat => {
  //       for(var i=0;i<chat.length;i++){
  //         console.log(this.chatList[i].payload.val().Message);
  //         this.chatList.push(chat[i].payload.val().Message);
  //       }
  //     })
  //     console.log(this.chatList);
      
  // }

  getChatByUserID(key:string){
    return this.db.list('Chats/'+key).valueChanges();
  }

  getBullyByChildName(childName:string){
    //console.log(this.db.list('Bullying', ref => ref.orderByChild('Victim').equalTo(childName)).snapshotChanges());
    return this.db.list('Bullying', ref => ref.orderByChild('Victim').equalTo(childName)).valueChanges();
  }

  getChildName(key:string){
    return this.db.object('User/'+key).snapshotChanges();
  }

  //need to get child ID by parent id(pid)
  /*
  */

  getChildByPID(key:string){
    // var ref = this.db.database.ref('User');
     var childKey;
    // ref.orderByChild('pid').equalTo(key).once("value",function(snapshot){
    //    snapshot.forEach(function(child){
    //      childKey = child.key;
    //      console.log(childKey);
    //    })
    // })
    // if(childKey != null){
    //   return childKey;
    // }

    return this.db.list('User', ref => ref.orderByChild('pid').equalTo(key)).snapshotChanges();
    //console.log(test);
  }

  getAllChat(){
    return this.db.list('Chats').snapshotChanges();
  }

  getAll(){
    this.test = this.db.list('Chats')
    return this.test.snapshotChanges()
  }

  getUserType(key:string){
    return this.db.object('ParentUser/' + key).snapshotChanges();
    //return userobj
    //return this.db.list('ParentUser/' + key).valueChanges();
  }

  insert(){
    for(var i=0;i<15;i++){
      this.db.list('Chats/-LiBScsMqkP3exDJkve1').push({
        Message:"I am happy",
        Time:"January 01, 2020, 02:14:57 PM",
        chatType: 'null'
      })
    }
  }

  updateChatType(childKey:string,Message:string,Time:string,ChatType:string){
    var ref = firebase.database().ref('Chats/'+childKey);
    //console.log(childKey,Message,Time,ChatType);
    ref.orderByChild('Message').equalTo(Message).once("value",function(snapshot){
      snapshot.forEach(function(chat){
        const dbTime = chat.child('Time').val();
        const dbMessage = chat.child('Message').val();

        //console.log(dbTime,dbMessage);

        if(Message == dbMessage && Time == dbTime){
          //console.log("found pairing");
          chat.ref.update({chatType:ChatType})
        }
      })
    })
  }

  getBrain(){
    return this.http.get('../../assets/brains/brain.json')
  }
   
  getChatData(){

    var chatData = [];

    const sadData = [
      "sad",
      "depressed",
      "bully",
      "bullied",
      "alone",
      "disappointed",
      "depressed",
      "regret",
      "unhappy",
      "miserable",
      "lonely",
      "i am sad",
      "i feel sad",
      "i feel very sad",
      "i am unhappy",
      "i feel depressed",
      "i got bullied today",
      "i am alone",
      "i feel alone",
      "i feel very unhappy",
      "i am miserable today",
      "i am feeling sad"
    ]

    const happyData = [
      "happy",
      "delighted",
      "cheerful",
      "excited",
      "enjoy",
      "glad",
      "merry",
      "enjoyed",
      "i am happy",
      "i feel happy",
      "i feel very happy",
      "i feel cheerful",
      "i am excited",
      "i am very excited",
    ]

    const hatredData = [
      "angry",
      "hated",
      "annoyed",
      "i feel annoyed",
      "someone annoyed me"
    ]

    const anxiousData = [
      "uncomfortable",
      "scared",
      "anxious",
      "afraid",
      "worried",
      "nervous",
      "i feel nervous",
      "i feel very anxious",
      "i feel worried",
      "i feel very worried",
      "i am scared",
      "i am very scared",
      "i feel scared",
    ]

    for (let i in sadData) {
      const text = sadData[i];
      chatData.push({ input: text, output: "sad"});
    }

    for (let i in happyData) {
      const text = happyData[i];
      chatData.push({ input: text, output: "happy"});
    }

    for (let i in hatredData) {
      const text = hatredData[i];
      chatData.push({ input: text, output: "hatred"});
    }
    
    for (let i in anxiousData) {
      const text = anxiousData[i];
      chatData.push({ input: text, output: "anxious"});
    }

    return chatData
  }
}
