import { Component, OnInit } from '@angular/core';
import { Contato4Service } from 'src/app/contatos4/shared/contato4.service';
declare function btnTopiciseClicked([]): any;

@Component({
  selector: 'app-child-report',
  templateUrl: './child-report.component.html',
  styleUrls: ['./child-report.component.scss']
})
export class ChildReportComponent implements OnInit {

  constructor(private contato4Service:Contato4Service) { 
    //this.tsProcessText();
  }

  words = [];
  wordsArray = [];

  ngOnInit() {
    //this.contato4Service.chatList
    //use the same as the func in home.component.ts to use it in the topic modelling.
    //this.words = this.contato4Service.wordList;
    this.contato4Service.getChatByUserID('-LiBMZsSTAUzmMzLrXT2')
    .subscribe(chat => {
      // this.words = chat.map(item => {
      //   return {
      //     ...item.payload.val()
      //   }
      // })

      console.log(chat);

      for(var i = 0;i<chat.length;i++){
        this.wordsArray.push(chat[i]['Message']);
        //console.log(chat[i]['Message'])
      }

      //console.log(this.wordsArray);
      //btnTopiciseClicked(this.wordsArray);
      
      // for(var i=0;i<chat.length;i++){
      //   console.log(this.words[i].payload.val().Message);
      //   this.words.push(chat[i].payload.val().Message);
      // }
    });
    //this.tsProcessText();
  }

  public tsProcessText(){
    btnTopiciseClicked(this.wordsArray)
  }

}
