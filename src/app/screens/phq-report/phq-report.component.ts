import { Component, OnInit, Input} from '@angular/core';
import { map } from 'rxjs/operators';
import { NavService } from '../nav/nav.service'
//import { ChartsModule } from 'ng2-charts';
import { Routes, RouterModule } from '@angular/router';
import { Chart } from 'chart.js';
import { ContatoService } from 'src/app/contatos9/shared/contato9.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-phq',
  templateUrl: './phq-report.component.html',
  styleUrls: ['./phq-report.component.scss']
})
export class PhqReportComponent implements OnInit {

  private dbpath = 'phq';

  constructor(private db : AngularFireDatabase, private nav: NavService, private contatoService: ContatoService) { }
  
    BarChart = [];
    LineChart = [];

    name = [];
    date = [];
    energy = [];
    sleep = [];
    full = [];
    appetite = [];
    phqListArray = [];
    searchText = '';
    p: number = 1;
    

  ngOnInit() {

    this.nav.show()
        //To get the phq list with all datas from firebase
        this.contatoService.getPhq().subscribe(list => {
            this.phqListArray = list.map(item =>{
                return {
                    ...item.payload.val()
                }
            })
            console.log(this.phqListArray)

            //Get only the Child's Name from firebase
            for (var i = 0; i < this.phqListArray.length; ++i){
                this.name.push(this.phqListArray[i]['name']);
            }
            console.log(this.name)

          //Get only the date from firebase
            for (var i = 0; i < this.phqListArray.length; ++i){
                this.date.push(this.phqListArray[i]['date']);
            }
            console.log(this.date)

            //Get only the energy score from firebase
            for (var i = 0; i < this.phqListArray.length; ++i){
                this.energy.push(this.phqListArray[i]['energy']);
            }
            console.log(this.energy)

            //Get only the sleep score from firebase
            for (var i = 0; i < this.phqListArray.length; ++i){
                this.sleep.push(this.phqListArray[i]['sleep']);
            }
            console.log(this.sleep)

            //Get only the full score from firebase
            for (var i = 0; i < this.phqListArray.length; ++i){
                this.full.push(this.phqListArray[i]['full']);
            }
            console.log(this.full)

            this.Bar();
            this.Line();
        })

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
      var energy = this.energy;
      console.log(energy[0]);
      this.BarChart.push(new Chart('barChart', {
          type: 'bar',
          data: {
          labels: this.date,
           datasets: [{
               label: 'Energy Level',
               data: this.energy,
               backgroundColor: 
                   'rgb(214, 234, 248)',
               borderColor: 
                   'black',
               borderWidth: 0.3
           }]
          },options: {
           title:{
               text:"Energy Level",
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

  //Line Graph for Sleep
  Line(){
    var sleep = this.sleep;
    console.log(sleep[0]);
    this.LineChart.push(new Chart('lineChart', {
        type: 'line',
        data: {
        labels: this.date,
         datasets: [
             {
             label: 'Sleep Level',
             data: this.sleep,
             backgroundColor: 
                   'rgb(253, 209, 210)',
               borderColor: 
                   'black',
               borderWidth: 0.3
            }
        ]
        },options: {
         title:{
             text:"Sleep Level Chart",
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

//Line Graph attempt 2
/* var ctx = document.getElementById('lineChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});




var config = {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'APAC RE Index',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            fill: false,
            data: [
                10,
                20,
                30,
                40,
                100,
                50,
                150
            ],
        }, {
            label: 'APAC PME',
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            fill: false,
            data: [
                50,
                300,
                100,
                450,
                150,
                200,
                300
            ],
    
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart - Logarithmic'
        },
        scales: {
            xAxes: [{
                display: true,
      scaleLabel: {
        display: true,
        labelString: 'Date'
      },
        
            }],
            yAxes: [{
                display: true,
                //type: 'logarithmic',
      scaleLabel: {
                        display: true,
                        labelString: 'Index Returns'
                    },
                    ticks: {
                        min: 0,
                        max: 500,

                        // forces step size to be 5 units
                        stepSize: 100
                    }
            }]
        }
    } */

} 