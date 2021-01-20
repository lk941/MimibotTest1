import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { Routes, RouterModule } from '@angular/router';
import { ContatoService } from 'src/app/contatos7/shared/contato7.service';
import { NavService } from '../nav/nav.service';
import * as $ from 'jquery';
declare var $:any
@Component({
  selector: 'app-point-system',
  templateUrl: './point-system.component.html',
  styleUrls: ['./point-system.component.scss']
})
export class PointSystemComponent implements OnInit {

  constructor(private nav: NavService, private contatoService: ContatoService) { }
	
	PointsList = [];
    ChildNames = [];
    PieChart= [];
    Available = []
    On_Hold = [];
    Used = [];
	Total = [];

	
  ngOnInit() {
	   this.nav.show()
        //To get with all datas from firebase
        this.contatoService.getPoints().subscribe(list => {
            this.PointsList = list.map(item =>{
                return {
                    ...item.payload.val()
                }
            })
            console.log(this.PointsList)

            //Get only the Child's ChildNames from firebase
            for (var i = 0; i < this.PointsList.length; ++i){
                this.ChildNames.push(this.PointsList[i]['ChildNames']);
            }
            console.log(this.ChildNames)

          //Get only the Available pt from firebase
            for (var i = 0; i < this.PointsList.length; ++i){
                this.Available.push(this.PointsList[i]['Available']);
            }
            console.log(this.Available)

            //Get only the On_Hold pt from firebase
            for (var i = 0; i < this.PointsList.length; ++i){
                this.On_Hold.push(this.PointsList[i]['On_Hold']);
            }
            console.log(this.On_Hold)

            //Get only the Used pt from firebase
            for (var i = 0; i < this.PointsList.length; ++i){
                this.Used.push(this.PointsList[i]['Used']);
            }
            console.log(this.Used)

            //Get only the Total pt from firebase
            for (var i = 0; i < this.PointsList.length; ++i){
                this.Total.push(this.PointsList[i]['Total']);
            }
            console.log(this.Total)

            // this.Pie();
        })
  }
     //color
	colorSet(array){
        var color = []
        for (var data in array){
            color.push(this.dynamicColors())
        }
        return color;
    }	
	//Random color pick
    dynamicColors() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgba(" + r + "," + g + "," + b + ",0.6)";
     };
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
	  
  }

