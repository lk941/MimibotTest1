import { Component, OnInit, Input} from '@angular/core';
import { map } from 'rxjs/operators';
import { NavService } from '../nav/nav.service'
//import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { Chart } from 'chart.js';
import { ContatoService } from '../contatos6/shared/contato6.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-phq',
  templateUrl: './phq.component.html',
  styleUrls: ['./phq.component.scss']
})
export class PhqComponent implements OnInit {

  private dbpath = 'phq';

  constructor(private db : AngularFireDatabase, private nav: NavService, private contatoService: ContatoService) { }
  
    BarChart = [];
    LineChart = [];

    name = [];
    date = [];
    mood = [];
    moodReason = [];
    moodType = [];
    moodListArray = [];
    

  ngOnInit() {

    this.nav.show()
        //To get the phq list with all datas from firebase
        this.contatoService.getMood().subscribe(list => {
            this.moodListArray = list.map(item =>{
                return {
                    ...item.payload.val()
                }
            })
            console.log(this.moodListArray)

            //Get only the Child's Name from firebase
            for (var i = 0; i < this.moodListArray.length; ++i){
                this.name.push(this.moodListArray[i]['name']);
            }
            console.log(this.name)

          //Get only the date from firebase
            for (var i = 0; i < this.moodListArray.length; ++i){
                this.date.push(this.moodListArray[i]['date']);
            }
            console.log(this.date)

            //Get only the mood from firebase
            for (var i = 0; i < this.moodListArray.length; ++i){
                this.mood.push(this.moodListArray[i]['mood']);
            }
            console.log(this.mood)

            //Get only the moodReason from firebase
            for (var i = 0; i < this.moodListArray.length; ++i){
                this.moodReason.push(this.moodListArray[i]['moodReason']);
            }
            console.log(this.moodReason)

            //Get only the full score from firebase
            for (var i = 0; i < this.moodListArray.length; ++i){
                this.moodType.push(this.moodListArray[i]['moodType']);
            }
            console.log(this.moodType)

            this.Bar();
        })

  }

  //Group the same word together
    group(array){
        var object = {};
        var result = [];
        array.sort();
        array.forEach(function (item) {
            if(!object[item])
                object[item] = 0;
                object[item] += 1;
        }) //count the names & store them into object array
        console.log(JSON.stringify(object)) 
        for (var prop in object) {
            if (object[prop] >= 1) {
                result.push(prop);
            }
        }
        return result;
    }

    //Count the number of the same word
    count(array){
        var a = [], b = [], prev;
        array.sort();
        for ( var i = 0; i < array.length; i++ ) {
            if ( array[i] !== prev ) {
                a.push(array[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = array[i];
        }
        return [b];
    }

  //Random color pick
  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ",0.6)";
 };

 //Store the random color to the number of data available
    colorSet(array){
        var color = []
        for (var data in array){
            color.push(this.dynamicColors())
        }
        return color;
    }


  //Bar Graph for Energy
  Bar(){
    var mood = this.mood;
    console.log(mood[0]);
    this.BarChart.push(new Chart('barChart', {
        type: 'bar',
        data: {
        labels: this.group(this.mood),
         datasets: [{
             label: 'Mood',
             data: this.count(this.mood),
             backgroundColor: 
                 'rgb(214, 234, 248)',
             borderColor: 
                 'black',
             borderWidth: 0.3
         }]
        },options: {
         title:{
             text:"Mood",
             display:true,
             fontSize: 15
         },scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true,
                     stepSize: 1
                 }
             }],
             xAxes: [{
                ticks: {
                    fontSize: 15
                }
            }]
         },legend: {
            labels: {
                fontSize: 15
            }
         },
        }
    }))
}

}