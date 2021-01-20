import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ContatoService } from 'src/app/contatos1/shared/contato1.service';
import { NavService } from '../nav/nav.service';
import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-bully-report',
  templateUrl: './bully-report.component.html',
  styleUrls: ['./bully-report.component.scss']
})
export class BullyReportComponent implements OnInit {

    constructor(private contatoService: ContatoService, private nav: NavService) { }
    bullyListArray = [];
    bullyNames = [];
    BarChart= [];
    locations = []
    PieChart= [];
    victims = [];
    DoughnutChart = [];
    reasons = [];

    ngOnInit() {
        this.nav.show()
        //To get the Bully list with all daatas from firebase
        this.contatoService.getBully().subscribe(list => {
            this.bullyListArray = list.map(item =>{
                return {
                    ...item.payload.val()
                }
            })
            console.log(this.bullyListArray)

            //Get only the BullyName from firebase
            for (var i = 0; i < this.bullyListArray.length; ++i){
                this.bullyNames.push(this.bullyListArray[i]['BullyName']);
            }
            console.log(this.bullyNames)

            //Get only the Location from firebase
            for (var i = 0; i < this.bullyListArray.length; ++i){
                this.locations.push(this.bullyListArray[i]['Location']);
            }
            console.log(this.locations)

            //Get only the Victim from firebase
            for (var i = 0; i < this.bullyListArray.length; ++i){
                this.victims.push(this.bullyListArray[i]['Victim']);
            }
            console.log(this.victims)

            //Get only the Reasons from firebase
            for (var i = 0; i < this.bullyListArray.length; ++i){
                this.reasons.push(this.bullyListArray[i]['Reason']);
            }
            console.log(this.reasons)

            this.Bar();
            this.Pie();
            this.Doughnut();
        })

        var self = this;
        setTimeout(function(){$(document).ready(function() {
	        $("#wordCloud").jQWCloud({
                words: self.convert(),
                //cloud_color: 'yellow',		
                minFont: 10,
                maxFont: 50,
                //fontOffset: 5,
                //cloud_font_family: 'Owned',
                //verticalEnabled: false,
                padding_left: 1,
                //showSpaceDIV: true,
                //spaceDIVColor: 'white',
                word_common_classes: 'WordClass',		
                word_mouseEnter :function(){
                    $(this).css("text-decoration","underline");
                },
                word_mouseOut :function(){
                    $(this).css("text-decoration","none");	
                },
                word_click: function(){ 			
                    alert("You have selected: " +$(this).text());
                }
            });
        });
        }, 1500)
    }

    //change to {word: '', weight: _}
    convert(){
        var object = {}
        var resultReason = [];
        this.reasons.forEach(function (item){
            var size = Math.floor((Math.random() * 11) + 25);
            object['prop'] = {word: item, weight: size}
            resultReason.push(object['prop'])
        })
        console.log("hey hmmm" + JSON.stringify(resultReason))
        return resultReason
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

    //Capitalize the firsr word
    titleCase(array) {
        for (var i = 0; i < array.length; i++) {
            array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1); 
        }
        return array
    }

    //Random color pick
    dynamicColors() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ",0.6)";
     };
    //  function getRandomColorHex() {
    //     var hex = "0123456789ABCDEF",
    //         color = "#";
    //     for (var i = 1; i <= 6; i++) {
    //       color += hex[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    //   }

    //Store the random color to the number of data available
    colorSet(array){
        var color = []
        for (var data in array){
            color.push(this.dynamicColors())
        }
        return color;
    }

    //Bar Graph for BullyName
    Bar(){
        var resultName = this.count(this.bullyNames);
        console.log(resultName[0]);
        this.BarChart.push(new Chart('barChart', {
            type: 'bar',
            data: {
            labels: this.group(this.bullyNames),
             datasets: [{
                 label: '# of times reported for bullying',
                 data: resultName[0],
                 backgroundColor: 
                     'rgb(214, 234, 248)',
                 borderColor: 
                     'black',
                 borderWidth: 0.3
             }]
            },options: {
             title:{
                 text:"Bully Chart",
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

    //Pie Graph for Location
    Pie(){
        var resultLocation = this.count(this.locations)
        console.log(resultLocation[0])
        console.log(this.colorSet(this.locations))
        this.PieChart.push(new Chart('pieChart', {
            type: 'pie',
            data: {
                labels: this.group(this.locations),
                datasets: [{
                    data: resultLocation[0],
                    backgroundColor: this.colorSet(this.locations),
                    borderColor: 'black',
                    borderWidth: 0.3
                }]
            },options: {
                responsive: true,
                title:{
                    text: "Location Chart",
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

    Doughnut() {
        var resultVictim = this.count(this.victims)
        console.log(resultVictim[0])
        console.log(this.colorSet(this.victims))
        this.DoughnutChart.push(new Chart('doughnutChart', {
            type: 'doughnut',
            data: {
                labels: this.group(this.victims),
                datasets: [{
                    data: resultVictim[0],
                    backgroundColor: this.colorSet(this.victims),
                    borderColor: 'black',
                    borderWidth: 0.3
                }]
            },options: {
                responsive: true,
                title:{
                    text: "Victim Chart",
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

    //Button for Bar Graph Bully Chart
    toggleHidenShowB() {
        var z = document.getElementById("barLoad");
        z.style.display = "none";
        var x = document.getElementById("barChart1");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            z.style.display = "block";
            setTimeout(function(){
                z.style.display = "none";
                x.style.display = "block";
            }, 3000)       
        }
        var y = document.getElementById("barBtn");
        if (y.innerHTML === "Generate Bully Chart") {
            y.innerHTML = "Close Bully Chart";
        } else {
            y.innerHTML = "Generate Bully Chart";
        }
    }

    //Button for Pie Graph Venue Chart
    toggleHidenShowP() {
        var z = document.getElementById("pieLoad");
        z.style.display = "none";
        var x = document.getElementById("pieChart1");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            z.style.display = "block";
            setTimeout(function(){
                z.style.display = "none";
                x.style.display = "block";
            }, 3000)
        }
        var y = document.getElementById("pieBtn");
        if (y.innerHTML === "Generate Location Chart") {
            y.innerHTML = "Close Location Chart";
        } else {
            y.innerHTML = "Generate Location Chart";
        }
    }

    //Button for Doughnut Graph Victim Chart
    toggleHidenShowD(){
        var z = document.getElementById("doughnutLoad");
        z.style.display = "none";
        var x = document.getElementById("doughnutChart1");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            z.style.display = "block";
            setTimeout(function(){
                z.style.display = "none";
                x.style.display = "block";
            }, 3000)
        }
        var y = document.getElementById("doughnutBtn");
        if (y.innerHTML === "Generate Victim Chart") {
            y.innerHTML = "Close Victim Chart";
        } else {
            y.innerHTML = "Generate Victim Chart";
        }
    }
}