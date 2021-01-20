import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { Routes, RouterModule } from '@angular/router';
import { ContatoService } from 'src/app/contatos8/shared/contato8.service';
import { NavService } from '../nav/nav.service';
import * as $ from 'jquery';
declare var $:any

@Component({
  selector: 'app-point-system-task',
  templateUrl: './point-system-task.component.html',
  styleUrls: ['./point-system-task.component.scss']
})
export class PointSystemTaskComponent implements OnInit {

  constructor(private nav: NavService, private contatoService: ContatoService) { }
	// TasksList = [];
	// ChildName = [];
	// CompletionStatus = [];
	// Date = [];
	// Name = [];
	// Points = [];
	
  ngOnInit() {
	     this.nav.show()
        //To get with all datas from firebase
        // this.contatoService.getTasks().subscribe(list => {
            // this.TasksList = list.map(item =>{
                // return {
                    // ...item.payload.val()
                // }
            // })
            // console.log(this.TasksList)

            // //Get only the ChildName from firebase
            // for (var i = 0; i < this.TasksList.length; ++i){
                // this.ChildName.push(this.TasksList[i]['ChildName']);
            // }
            // console.log(this.ChildName)

          // //Get only the Date pt from firebase
            // for (var i = 0; i < this.TasksList.length; ++i){
                // this.Date.push(this.TasksList[i]['Date']);
            // }
            // console.log(this.Date)

            // //Get only the Points pt from firebase
            // for (var i = 0; i < this.TasksList.length; ++i){
                // this.Points.push(this.TasksList[i]['Points']);
            // }
            // console.log(this.Points)

            // //Get only the Name pt from firebase
            // for (var i = 0; i < this.TasksList.length; ++i){
                // this.Name.push(this.TasksList[i]['Name']);
            // }
            // console.log(this.Name)

            // //Get only the CompletionStatus pt from firebase
            // for (var i = 0; i < this.TasksList.length; ++i){
                // this.CompletionStatus.push(this.TasksList[i]['CompletionStatus']);
            // }
            // console.log(this.CompletionStatus)
        // })
  }
  
  
  

}
