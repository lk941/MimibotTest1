import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav/nav.service';
import { Observable, of } from 'rxjs';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { ContatoService } from 'src/app/contatos1/shared/contato1.service';
import * as $ from 'jquery';
declare function btnTopiciseClicked([]): any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private nav: NavService, private contatoService:ContatoService) { }

  bullyListArray = [];
  bullyType = [];

  ngOnInit() {
    this.nav.show()

    //entire bully list from FireBase
    this.contatoService.getBully().subscribe(list => {
      this.bullyListArray = list.map(item => {
        return {
          ...item.payload.val()
        }
      })

      //reasons from the bully list
      for (var i = 0; i  < this.bullyListArray.length; ++i) {
        this.bullyType.push(this.bullyListArray[i]['Reason']);
      }

      // var reasonsText = $('#topicCloudText').val();
      console.log("The bully type " + this.bullyType)
      // console.log("HEY THIS WORKS!!!!!!!!!!!");

    })
  }

  public tsProcessText(){
    //call the js processText
    btnTopiciseClicked(this.bullyType);
    }
}