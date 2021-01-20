import { Component, OnInit } from '@angular/core';
import { HobbiesinsightService } from 'src/app/screens/hobbiesinsightC/shared/hobbiesinsight.service';
import {NavService} from 'src/app/screens/nav/nav.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AutomlService } from './automl.service';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import * as brain from 'brain.js/browser';
import { Chart, LinearTickOptions } from 'chart.js';
import {formatDate } from '@angular/common';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import * as Sentiment from 'sentiment';

@Component({
  selector: 'app-hobbies-insight',
  templateUrl: './hobbies-insight.component.html',
  styleUrls: ['./hobbies-insight.component.scss'], 

  
})
export class HobbiesInsightComponent implements OnInit {
  constructor(private hobbiesinsightservice: HobbiesinsightService , 
    private nav: NavService, 
    private http: HttpClient,
    private automlService: AutomlService,
    private oauthService: OAuthService,
) { }

  hobbyType = [];
  wordsArray = [];
  studentsName = [];
  tempstudentsName = [];
  filteredArray = [];
  allHobbyType = [];

  hobbyToBeModel = [];
  loader = false;
  success = false;

  chatNet = new brain.recurrent.LSTM();
  sentiment = new Sentiment();
  statusD = [];

  childName: string;
  childId: string;
  hobbyData = [] as brain.LSTMTrainingData[];
  allHobby= [];

  //for the charts
  hBarChart = [];
  stackBarChart = [];
  SBData = [];

  userType;

  isTeacher = true;

  //changes when the teacher selects on the DDL list
  selectedStudentName;
  selectedHobbyName;

  wordChildList = [];
  wordCounts = [];
  wordDetailList = [];
  wordTitle = [];
  wordList;

  //variables for the table
  key: string = "";
  reverse: boolean = true;
  p: number = 1;
  searchText = '';
  searchDDL;

  //for the categorizing of the sentences
  maxlength = 21;

  //for leaderboard
  //sortedLeaderBoard = [];

  enjoymentTypes = [];
  nameOwner = [];
  hobbyName = [];
  hobbyDuration = [];
  hobbyReason = [];

  ngOnInit() {
    this.nav.show();
    this.hobbyData = this.hobbiesinsightservice.gethobbyData();

    //sessionStorage.getItem('User')

    //this.userType = sessionStorage.getItem('userType');

    this.hobbiesinsightservice.getAllHobby().subscribe(hobby => {
      this.hobbyToBeModel = hobby.map(item =>{
                console.log(item);
                return {
                    ...item.payload.val()
                }
            })


      for (let i = 0; i < this.hobbyToBeModel.length; i++) {            
            if(this.hobbyToBeModel[i]['Enjoyment'] != "null"){
                 //this.filteredArray.push(this.hobbyToBeModel[i]); 
                 this.studentsName.push(this.hobbyToBeModel[i]['Name']); 
                 this.enjoymentTypes.push(this.hobbyToBeModel[i]['Enjoyment']); 
                 this.allHobby.push({Name:this.hobbyToBeModel[i]['Name'],Hobby:this.hobbyToBeModel[i]['Hobby'],Enjoyment:this.hobbyToBeModel[i]['Enjoyment'],Reason:this.hobbyToBeModel[i]['Reason']});
             } else{
                 this.hobbyReason.push(this.hobbyToBeModel[i]['Reason']);
                 this.nameOwner.push(this.hobbyToBeModel[i]['Name']);
                 this.hobbyName.push(this.hobbyToBeModel[i]['Hobby']);
                 this.hobbyDuration.push(this.hobbyToBeModel[i]['Duration']);
             }
             console.log(this.enjoymentTypes);
             console.log("Data: " + this.nameOwner + ' ' + this.hobbyName  + ' ' + this.hobbyDuration + ' ' + this.hobbyReason);
            }

            for (var i = 0; i < this.studentsName.length; i++) {
            if (!this.filteredArray.includes(this.studentsName[i])) {
                   this.filteredArray.push(this.studentsName[i]);
              }  
            }

            //this.tempstudentsName.push("Testing");            
 
            for (let j = 0; j < this.filteredArray.length; j++) {   
                this.tempstudentsName.push(this.filteredArray[j]);
                var data = [];
                var grpData = []; 
                for (let i = 0; i < this.hobbyToBeModel.length; i++) {     
                    if(this.filteredArray[j].includes(this.hobbyToBeModel[i]['Name'])){                  
                       data.push(this.hobbyToBeModel[i]['Enjoyment']);
                       grpData = this.countWords(data);
                    } 
                    else{
                        //Do Nothing.
                    }      
                }
                this.SBData.push(grpData);
            }
            this.hBar();  
            this.stackedBar();    
  })     
}

  //training data for the thingy
  trainData(){

    const configChat = {
      //errorThresh: 0.5,  // error threshold to reach
      iterations: 30,   // maximum training iterations
      log: true,           // console.log() progress periodically
      logPeriod: 10,       // number of iterations between logging
      learningRate: 0.5    // learning rate
    };

    const train = this.chatNet.train(this.hobbyData,{
      iterations:100,log:true,logPeriod:10
    })
  }

  //categorizing the data from db
  runData(){
    console.log("Hello from run data");
    console.log(this.wordsArray);
    for(var i=0;i < this.hobbyReason.length;i++){
      const result = this.chatNet.run(this.hobbyReason[i].toLowerCase());
      this.hobbiesinsightservice.updateHobbyLikeness(this.nameOwner[i],this.hobbyName[i],this.hobbyDuration[i],this.hobbyReason[i],result);
    }
  }

  catData(){
    let net = new brain.NeuralNetwork();
    this.hobbiesinsightservice.getBrain().subscribe(brain => {
      net.fromJSON(brain);
      for(var i=0;i<this.hobbyReason.length;i++){
        var sent = this.sentiment.analyze(this.hobbyReason[i]);
        if(this.hobbyDuration[i].includes("hrs") || this.hobbyDuration[i].includes("hr") || this.hobbyDuration[i].includes("h")){
           if(this.hobbyDuration[i] < 2){
              this.statusD.push("low");
           }
           else{
              this.statusD.push("high");
           }
        }
        else{
             this.statusD.push("low");
        }
        if(sent.score > 0){
          console.log(this.hobbyReason[i]);
          const result = net.run(this.fixLength(this.encode(this.hobbyReason[i].toLowerCase())),this.statusD[i]);
          console.log(this.getCat(result)); //to save into db the chatType for each message.
          this.hobbiesinsightservice.updateHobbyLikeness(this.nameOwner[i],this.hobbyName[i],this.hobbyDuration[i],this.hobbyReason[i],this.getCat(result));
        }else
        {
          this.hobbiesinsightservice.updateHobbyLikeness(this.nameOwner[i],this.hobbyName[i],this.hobbyDuration[i],this.hobbyReason[i],"Dislike");
        }
      }
    })
  }

  //helper function for catData()
  getCat(result){
    var Arr:number[] = [];
    Arr.push(result.Enjoy);
    Arr.push(result.Average);
    var max = Math.max(Arr[0],Arr[1]);
    console.log(max);
    if(Arr[0] == max){
      return "Enjoy"
    }else if(Arr[1] == max){
      return "Average"
    }
  }

  //helper function for catData()
  encode(d: string) {
    const newArr: number[] = [];
    d.split("").forEach(c => {
      newArr.push((c.charCodeAt(0) / 255))
    });
    while (newArr.length < 7) {
      newArr.push(0);
    }
    return newArr;
  }

  //helper function for catData()
  fixLength(data){
    if(data.length > 21){
      this.maxlength = data.length;
    }

    while(data.length < this.maxlength) {
      data.push(0)
    }
    return data;
  }

  predict(){
    if(this.hobbyReason[0] == null){
      this.success = true;
      //alert("nth to train");
    }else{
      this.loader = true;
      //alert("smth to train");
      this.trainData();
      this.runData();
      this.catData();
      location.reload();
    }
  }

  close(){
    this.success = false;
  }
  

  //==========================================================================================
  //chart stuff
  countWords(array){
    var enjoy = 0;
    var average = 0;
    var dislike = 0;
    //var sad = 0;
    for(var i=0;i<array.length;i++){
      if(array[i] == "Enjoy"){
        enjoy++;
      }else if(array[i] == "Average"){
        average++;
      }else if(array[i] == "Dislike"){
        dislike++;
      }
    }
    return [enjoy,average,dislike];
  }

  arrangeToStack(array){
    var toReturn = [];
    var enjoy = [];
    var average = [];
    var dislike = [];
    for(var i=0;i<array.length;i++){
      enjoy.push(array[i][0]);
      average.push(array[i][1]);
      dislike.push(array[i][2]);
    }
    toReturn.push(enjoy,average,dislike);
    console.log(toReturn);
    return toReturn;
  }

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
    console.log(result);
    return result;
  }

  getName(arr){
    var result = [];
    for(var i=0;i<arr.length;i++){
      result.push(arr[i]['Name'])
    }
    return result;
  }

  hBar(){
    console.log("twice")
    console.log(this.enjoymentTypes);
    var resultCount = this.countWords(this.enjoymentTypes);
    console.log(resultCount);
    this.hBarChart.push(new Chart('hBarChart',{
      type: 'bar',
      data:{
        labels: ['Enjoy','Average','Dislike'], //this.group(this.hobbyType),
        datasets:[{
          label:'# Count Of Children',
          data: resultCount,
          backgroundColor: ['#FF9AAE', '#FFD281', '#C7E596'],
          borderColor: 'black',
          borderWidth: 0.3
        }]
      },options:{
        title:{
          text:"Enjoyment Chart",
          display: true,
          fontSize: 25,
          position: 'top'
        },scales:{
          yAxes: [{
             ticks: {
             fontSize: 15,
             beginAtZero: true,
             // stacked: true,
             callback: function(value: number) {if (value % 1 === 0) {return value;}}
           }
          }],
          xAxes: [{
            ticks: {
                beginAtZero:true,
                // stacked: true,
            }
          }]
        },legend:{
          labels:{
            fontSize: 15
          }
        }
      }
    }))
  }

  stackedBar(){
    var resultCount = this.count(this.enjoymentTypes);
    var names = [];
    for(var i = 0; i<this.tempstudentsName.length;i++){
      names.push(this.tempstudentsName[i]);
    }
    var data = this.arrangeToStack(this.SBData);
    console.log(this.SBData);
    this.stackBarChart.push(new Chart('stackBarChart',{
      type:'horizontalBar',
      data:{
        labels: names,
        datasets:[
        {
          label:'Enjoy',
          data: data[0],
          backgroundColor:'#FF9AAE',
          borderColor: 'black',
          borderWidth: 0.3
        },{
          label:'Average',
          data: data[1],
          backgroundColor: '#FFD281',
          borderColor: 'black',
          borderWidth: 0.3
        },{
          label: 'Dislike',
          data: data[2],
          backgroundColor:'#C7E596',
          borderColor: 'black',
          borderWidth: 0.3
        }]
      },
      options:{
        scales:{
         yAxes: [{
             stacked: true,
             ticks: {
             fontSize: 15,
             beginAtZero: true,
           }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
                beginAtZero:true,
                stepSize: 1,
                callback: function(value: any) {if (value % 1 === 0) {return value;}}
            }
          }]
        },
        title:{
          text:"Breakdown of individual child's enjoyment",
          display:true,
          fontSize:25,
          position:'top'
        }
      }
    }))
  }

  //==========================================================================================
  //details stuff

  //for the table
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  

  getTotal(){
    var resultType = this.countWords(this.enjoymentTypes);
    var num = resultType;
    var total = 0;
    for(var i = 0;i<num.length;i++){
      total = total + num[i]
    }
    return total;
  }

  getEnjoyPercent(){
    var resultType = this.countWords(this.enjoymentTypes);
    var num = resultType;
    var total = this.getTotal();
    var percent = (num[0]/total)*100;
    return percent;
  }

  getAveragePercent(){
    var resultType = this.countWords(this.enjoymentTypes);
    var num = resultType;
    var total = this.getTotal();
    var percent = (num[1]/total)*100;
    return percent;
  }

  getDislikePercent(){
    var resultType = this.countWords(this.enjoymentTypes);
    var num = resultType;
    var total = this.getTotal();
    var percent = (num[2]/total)*100;
    return percent;
  }

  compare(a, b) {
    const bandA = a.count;
    const bandB = b.count;
  
    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison * -1;
  }

  countRank(array){
    var a = [], b = [], prev, list = []; 
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
    for(var i=0;i<a.length;i++){
      list.push({Name:a[i],count:b[i]})
    }
    
    return list;
  }
}