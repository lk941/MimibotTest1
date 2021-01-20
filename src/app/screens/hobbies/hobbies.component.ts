import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ContatoService } from 'src/app/contatos5/shared/contato5.service';
import { NavService } from '../nav/nav.service';
import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {

  constructor(private contatoService: ContatoService, private nav: NavService) { }
    hobbyListArray = [];
    BarChart= [];
    PieChart= [];
    Name = [];
    Hobby = [];
    Duration= [];
    Reason= [];

    ngOnInit() {
        this.nav.show()
        this.contatoService.getHobbies().subscribe(list => {
            this.hobbyListArray = list.map(item =>{
                return {
                    ...item.payload.val()
                }
            })
            console.log(this.hobbyListArray)

            //Get only the Name from firebase
            for (var i = 0; i < this.hobbyListArray.length; ++i){
                this.Name.push(this.hobbyListArray[i]['Name']);
            }
            console.log(this.Name)

            //Get only the Hobby from firebase
            for (var i = 0; i < this.hobbyListArray.length; ++i){
                this.Hobby.push(this.hobbyListArray[i]['Hobby']);
            }
            console.log(this.Hobby)

            //Get only the Duration from firebase
            for (var i = 0; i < this.hobbyListArray.length; ++i){
                this.Duration.push(this.hobbyListArray[i]['Duration']);
            }
            console.log(this.Duration)

            //Get only the Reason from firebase
            for (var i = 0; i < this.hobbyListArray.length; ++i){
                this.Reason.push(this.hobbyListArray[i]['Reason']);
            }
            console.log(this.Reason)

            this.Pie();
            this.Bar();
        })
  }
  
      
    //Group the same word together
    group(array){
        var object = {};
        var result = [];
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

    //Pie Graph for Hobby
    Pie(){
        var resultHobby = this.count(this.Hobby)
        console.log(resultHobby[0])
        console.log(this.colorSet(this.Hobby))
        this.PieChart.push(new Chart('pieChart', {
            type: 'pie',
            data: {
                labels: this.group(this.Hobby),
                datasets: [{
                    data: resultHobby[0],
                    backgroundColor: this.colorSet(this.Hobby),
                    borderColor: 'black',
                    borderWidth: 0.3
                }]
            },options: {
                responsive: true,
                title:{
                    text: "Hobby Chart",
                    display: true,
                    fontSize: 15
                },legend: {
                    position: 'bottom',
                    labels: {
                        fontSize: 15
                    }
                }
            }
        }))
    }    

    //Bar Graph for Individual Hobby
    Bar(){
        var resultName = this.count(this.Name);
        console.log(resultName[0]);
        this.BarChart.push(new Chart('barChart', {
            type: 'bar',
            data: {
            labels: this.group(this.Name),
             datasets: [{
                 label: '# of hobby recorded',
                 data: resultName[0],
                 backgroundColor: 
                     'rgb(214, 234, 248)',
                 borderColor: 
                     'black',
                 borderWidth: 0.3
             }]
            },options: {
             title:{
                 text:"Individual Children Hobby Chart",
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
