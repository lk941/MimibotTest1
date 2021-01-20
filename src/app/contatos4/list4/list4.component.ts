import { Component, OnInit } from '@angular/core';
import { Contato4Service } from '../shared/contato4.service';
import {NavService} from 'src/app/screens/nav/nav.service';
import {ChildInsightComponent} from 'src/app/screens/child-insight/child-insight.component';

@Component({
  selector: 'app-list4',
  templateUrl: './list4.component.html',
  styleUrls: ['./list4.component.scss']
})
export class List4Component implements OnInit {

  constructor(private contato4Serive: Contato4Service, private childInsight: ChildInsightComponent) { }

  listArray = [];
  key: string = "";
  reverse: boolean = true;
  p: number = 1;
  list;

  
  childId: string;

  ngOnInit() {

    //this.isTeacher = this.childInsight.isTeacher;
    this.childId = this.childInsight.childId;
    console.log(this.childId);

    //need to properly get the Child id from the childInsightComponent


    if(sessionStorage.getItem('userType') == 'teacher'){
      this.contato4Serive.getAll().subscribe(userKey => {
        for(var i = 0;i<userKey.length;i++){
          this.contato4Serive.getChildName(userKey[i].key).subscribe(childName => {
            this.contato4Serive.getChatByUserID(childName.key).subscribe(chat => {
              chat.forEach(singleChat => {
                this.listArray.push({Name: childName.payload.val()['Name'],Message:singleChat['Message'],ChatType:singleChat['chatType']})
              });
              
            })
          })
        }
        console.log(this.listArray);
      })
    }else if(sessionStorage.getItem('userType') == 'parent'){
      
      this.contato4Serive.getChildName(this.childId).subscribe(childName => {
        this.contato4Serive.getChatByUserID(childName.key).subscribe(chat => {
          chat.forEach(singleChat => {
            this.listArray.push({Name: childName.payload.val()['Name'],Message:singleChat['Message'],ChatType:singleChat['chatType']})
          });
        })
      })
    }

    
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

}
