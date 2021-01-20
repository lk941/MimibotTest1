import { Component, OnInit } from '@angular/core';
import { Contato4Service } from 'src/app/contatos4/shared/contato4.service';
import * as brain from 'brain.js/browser';
import * as firebase from 'firebase/app';
import {AutomlService } from 'src/app/contatos1/bully-insight/automl.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NavService} from '../nav/nav.service';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { Chart } from 'chart.js';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import * as Sentiment from 'sentiment';

@Component({
  selector: 'app-child-insight',
  templateUrl: './child-insight.component.html',
  styleUrls: ['./child-insight.component.scss']
})
export class ChildInsightComponent implements OnInit {

  constructor(private contato4Service: Contato4Service,
      private http: HttpClient,
      private automlService: AutomlService,
      private oauthService: OAuthService,
      private nav :NavService
    ) { }


  wordsType = [];
  wordsArray = [];
  studentsName =[];
  allChatType = [];

  chatToBeModel = [];
  //timeToBeModel = [];
  loader = false;
  success = false;


  chatNet = new brain.recurrent.LSTM();
  sentiment = new Sentiment();

  childName: string;
  childId: string;
  bully = [];
  chatData = [] as brain.LSTMTrainingData[];
  allChat = [];
  //chatType = [];

  //for the charts
  hBarChart = [];
  stackBarChart = [];
  SBData = [];

  search;
  searchDDL = [];
  userType;

  isTeacher = true;

  //changes when the teacher selects on the DDL list
  selectedStudentName;

  wordChildList = [];
  wordCounts = [];
  wordDetailList = [];
  wordTitle = [];
  wordList;

  //variables for the table
  key: string = "";
  reverse: boolean = true;
  p: number = 1;

  //for the categorizing of the sentences
  maxlength = 21;

  //for leaderboard
  sortedLeaderBoard = [];

  ngOnInit() {
    this.nav.show();
    this.chatData = this.contato4Service.getChatData();
    //this.contato4Service.insert();
    //this.contato4Service.insert();

    //if user is parent
    //
    //this.getBullyList('-LiBMZsSTAUzmMzLrXT2');
    sessionStorage.getItem('User')

    this.userType = sessionStorage.getItem('userType');

    if(this.userType == 'Teacher'){
      //alert("You are teacher")
      //if user is teacher
      this.isTeacher = true;
      this.contato4Service.getAllChat().subscribe(chat => {
        for (let i = 0; i < chat.length; i++) {
          this.contato4Service.getChildName(chat[i].key).subscribe(child => {
            this.studentsName.push({Name: child.payload.val()['Name'], key:child.payload.key}); //to display in the ddl
            this.contato4Service.getChatByUserID(child.payload.key).subscribe(allChat =>{
              var data = [];
              var grpData = [];
              var finalArr = [];
              for(let j = 0; j < allChat.length; j++){
                if(allChat[j]['chatType'] == 'null'){
                  console.log(allChat[j]['Message']);
                  console.log(allChat[1]);
                  this.chatToBeModel.push({ChildKey: child.payload.key,Message:allChat[j]['Message'],Time:allChat[j]['Time']});
                  //this.listArray.push({Name:child.payload.val()['Name'],Message:allChat[j]['Message'],ChatType:allChat[j]['chatType']});
                  console.log(this.chatToBeModel);
                }else{
                  this.allChat.push({Name:child.payload.val()['Name'],Message:allChat[j]['Message'],ChatType:allChat[j]['chatType'],Time:allChat[j]['Time']});
                  this.wordsType.push(allChat[j]['chatType']);
                  data.push(allChat[j]['chatType']);
                  //grpData = this.count(data);
                  grpData = this.countWords(data);
                }
              }
              
              this.SBData.push(grpData);
              //console.log(grpData);
              if(i == chat.length - 1){
                this.hBar();
                //this.SBData = this.arrangeToStack(finalArr);
                console.log(this.SBData);
                this.stackedBar();
                this.getTopRank('joy');
              }
            })
          })
          //console.log(chat[i].key + "chat keys?");
          //console.log(this.allChat);
        }
        console.log(this.studentsName);
      })
    }else if(this.userType == 'parent'){
      this.contato4Service.getUserType(sessionStorage.getItem('User')).subscribe(user =>{
        if(user.payload.val()['userType'] == 'parent'){
          //alert("you are parent");
          this.isTeacher = false;
          //this.ChatByChildID('-LiBMZsSTAUzmMzLrXT2');
          this.contato4Service.getChildByPID(sessionStorage.getItem('User')).subscribe(childOne => {
            console.log(childOne[0].key);
            this.childId = childOne[0].key;
            //since now only got 1 child.
            this.contato4Service.getChildName(childOne[0].key).subscribe(child => {
              this.childName = child.payload.val()['Name'];
              this.contato4Service.getChatByUserID(child.payload.key).subscribe(allChat =>{
                for(var i=0;i<allChat.length;++i){
                  if(allChat[i]['chatType'] == 'null'){
                    console.log(allChat[i]['Message'])
                    this.chatToBeModel.push({ChildKey: child.payload.key,Message:allChat[i]['Message'],Time:allChat[i]['Time']});
                    //this.listArray.push({Name:child.payload.val()['Name'],Message:allChat[i]['Message'],ChatType:allChat[i]['chatType']})
                  }
                  else{
                    this.allChat.push({Name:child.payload.val()['Name'],Message:allChat[i]['Message'],ChatType:allChat[i]['chatType'],Time:allChat[i]['Time']});
                    this.wordsType.push(allChat[i]['chatType']);
                  }
                }
                this.hBar();
                this.stackedBar();
              })
            })
          });
        }
        //console.log();
      });
    }
  }
  //training data for the thingy
  trainData(){

    const configChat = {
      //errorThresh: 0.5,  // error threshold to reach
      iterations: 40,   // maximum training iterations
      log: true,           // console.log() progress periodically
      logPeriod: 10,       // number of iterations between logging
      learningRate: 0.5    // learning rate
    };

    const train = this.chatNet.train(this.chatData,{
      iterations:100,log:true,logPeriod:10
    })
  }

  //categorizing the data from db
  runData(){
    console.log("Hello from run data");
    console.log(this.wordsArray);
    for(var i=0;i < this.chatToBeModel.length;i++){
      const result = this.chatNet.run(this.chatToBeModel[i].Message.toLowerCase());
      this.contato4Service.updateChatType(this.chatToBeModel[i].ChildKey,this.chatToBeModel[i].Message,this.chatToBeModel[i].Time,result);
      //this.wordsType.push(result);
      //console.log("Original: " + this.chatToBeModel[i] + "\nTopic modelling: " + this.wordsType[i]);
    }
  }

  catData(){
    let net = new brain.NeuralNetwork();
    this.contato4Service.getBrain().subscribe(brain => {
      net.fromJSON(brain);
      for(var i=0;i<this.chatToBeModel.length;i++){
        var sent = this.sentiment.analyze(this.chatToBeModel[i].Message)
        if(sent.score < 0){
          console.log(this.chatToBeModel[i].Message);
          const result = net.run(this.fixLength(this.encode(this.chatToBeModel[i].Message.toLowerCase())));
          console.log(this.getCat(result)); //to save into db the chatType for each message.
          this.contato4Service.updateChatType(this.chatToBeModel[i].ChildKey,this.chatToBeModel[i].Message,this.chatToBeModel[i].Time,this.getCat(result));
        }else
        {
          this.contato4Service.updateChatType(this.chatToBeModel[i].ChildKey,this.chatToBeModel[i].Message,this.chatToBeModel[i].Time,"joy");
        }
        //console.log(result);
        //this.contato4Service.updateChatType(this.chatToBeModel[i].ChildKey,this.chatToBeModel[i].Message,this.chatToBeModel[i].Time,result);
      }
    })
  }

  //helper function for catData()
  getCat(result){
    var Arr:number[] = [];
    Arr.push(result.angry);
    Arr.push(result.sad);
    Arr.push(result.fear);
    var max = Math.max(Arr[0],Arr[1],Arr[2]);
    console.log(max);
    if(Arr[0] == max){
      return "anger"
    }else if(Arr[1] == max){
      return "sad"
    }else if(Arr[2] == max){
      return "fear";
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
    if(this.chatToBeModel[0] == null){
      this.success = true;
      //alert("nth to train");
    }else{
      this.loader = true;
      //alert("smth to train");
      //this.trainData();
      //this.runData();
      this.catData();
      location.reload();
    }
  }

  close(){
    this.success = false;
  }

  // getAll(){
  //   var chatArr = [];
  //   var itemArr = [];
  //   this.contato4Service.getAll().subscribe(chat=>{
  //     chatArr = chat.map(item =>{
  //       console.log(item);
  //       return {
  //         ...item.payload.val()
  //       }
  //     }).map(anotherItem =>{
  //       console.log(anotherItem);
  //       return {
  //         ...anotherItem.Message
  //       }
  //     })

  //     console.log(chatArr);
  //     for(var i=0;i<chatArr.length;i++){
  //       this.allChatType.push(chatArr[i]['chatType'])
  //     }
  //     console.log(this.allChatType);
  //   })
  // }

  ChatByChildID(key:string){
    this.wordsArray = [];
    this.wordsType = [];
    //get the chat log of the child
    this.contato4Service.getChatByUserID(key).subscribe(chat =>{
      for(var i=0;i<chat.length;i++){
        if(chat[i]['chatType'] != 'null'){
          this.wordsType.push(chat[i]['chatType']);
        }
        //this.wordsArray.push(chat[i]['Message']);     
      }
      console.log(this.wordsType);
      if(this.hBarChart.length == 0){
        //alert("empty array");
        this.hBar();
      }else if(this.hBarChart.length != 0){
        //alert("not empty array");
        this.hBarUpdate(this.hBarChart);
      }
      
    })
  }

  getBullyList(key:string){
    this.bully = [];
    this.contato4Service.getChildName(key).subscribe(child => {

      //get the child name first and then get the bully list
      this.childName = child.payload.val()['Name']

      //get the bully list
      this.contato4Service.getBullyByChildName(this.childName).subscribe(bully => {
        for(var i = 0;i<bully.length;i++){
          this.bully.push(bully[i]);
        }
      });
    })
  }

  //when user clicks on the dropdown list
  selected(){
    console.log("student name = " + this.selectedStudentName);
    this.childName = this.selectedStudentName;
    var localChildObj = this.studentsName.find(stuff => stuff.Name == this.selectedStudentName);
    this.ChatByChildID(localChildObj.key);
  }
  

  //==========================================================================================
  //chart stuff
  countWords(array){
    var fear = 0;
    var joy = 0;
    var anger = 0;
    var sad = 0;
    for(var i=0;i<array.length;i++){
      if(array[i] == "fear"){
        fear++;
      }else if(array[i] == "joy"){
        joy++;
      }else if(array[i] == "anger"){
        anger++;
      }else if(array[i] == "sad"){
        sad++;
      }
    }
    //return [fear,joy,anger,sad];
    return [anger,fear,joy,sad];
  }

  arrangeToStack(array){
    var toReturn = [];
    var fear = [];
    var joy = [];
    var anger = [];
    var sad = [];
    for(var i=0;i<array.length;i++){
      fear.push(array[i][0]);
      joy.push(array[i][1]);
      anger.push(array[i][2]);
      sad.push(array[i][3]);
    }
    toReturn.push(fear,joy,anger,sad);
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
    console.log(this.wordsType);
    //console.log(this.wordsType)
    var resultCount = this.countWords(this.wordsType);
    console.log(resultCount);
    this.hBarChart.push(new Chart('hBarChart',{
      type: 'horizontalBar',
      data:{
        labels: ['anger','fear','joy','sad'], //this.group(this.wordsType),
        datasets:[{
          label:'# of respective categorized',
          data: resultCount,
          backgroundColor: ['#FF9AAE', '#FFD281', '#C7E596', '#C3E8FF'],
          borderColor: 'black',
          borderWidth: 0.3
        }]
      },options:{
        title:{
          text:"Types of words said",
          display: true,
          fontSize: 25,
          position: 'top'
        },scales:{
          yAxes: [{
            ticks: {
              fontSize: 15
            }
          }],
          xAxes: [{
            ticks: {
                beginAtZero:true,
                stepSize: 2
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


  hBarUpdate(chart){
    console.log("once");
    chart.destroy();
    var resultCount = this.countWords(this.wordsType);
    console.log(resultCount[0]);
    this.hBarChart.push(new Chart('hBarChart',{
      type: 'horizontalBar',
      data:{
        labels: ['anger','fear','joy','sad'],
        datasets:[{
          label:'# of respective categorized',
          data: resultCount,
          backgroundColor: ['#FF9AAE', '#FFD281', '#C7E596', '#C3E8FF'],
          borderColor: 'black',
          borderWidth: 0.3
        }]
      },options:{
        title:{
          text:"Types of words said",
          display: true,
          fontSize: 25,
          position: 'top'
        },scales:{
          yAxes: [{
            ticks: {
              fontSize: 15
            }
          }],
          xAxes: [{
            ticks: {
                beginAtZero:true,
                stepSize: 2
            }
          }]
        },legend:{
          labels:{
            fontSize: 15
          }
        }
      }
    }))
    //chart.update();
  }


  stackedBar(){
    var resultCount = this.count(this.wordsType);
    var names = [];
    for(var i = 0;i<this.studentsName.length;i++){
      names.push(this.studentsName[i]['Name']);
    }
    var data = this.arrangeToStack(this.SBData);
    console.log(this.SBData);
    this.stackBarChart.push(new Chart('stackBarChart',{
      type:'horizontalBar',
      data:{
        labels: names,
        datasets:[
        {
          label:'anger',
          data: data[0],
          backgroundColor:'#FF9AAE',
          borderColor: 'black',
          borderWidth: 0.3
        },{
          label:'fear',
          data: data[1],
          backgroundColor: '#FFD281',
          borderColor: 'black',
          borderWidth: 0.3
        },{
          label: 'joy',
          data: data[2],
          backgroundColor:'#C7E596',
          borderColor: 'black',
          borderWidth: 0.3
        },{
          label:'sad',
          data: data[3],
          backgroundColor:'#C3E8FF',
          borderColor: 'black',
          borderWidth: 0.3
        }]
      },
      options:{
        scales:{
          xAxes:[{
            stacked:true
          }],
          yAxes:[{
            stacked:true
          }]
        },
        title:{
          text:"Breakdown of individual student's emotion",
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
    var resultType = this.countWords(this.wordsType);
    var num = resultType;
    var total = 0;
    for(var i = 0;i<num.length;i++){
      total = total + num[i]
    }
    return total;
  }

  getAngerPercent(){
    var resultType = this.countWords(this.wordsType);
    var num = resultType;
    //console.log(num)
    var total = this.getTotal();
    var percent = (num[0]/total)*100;
    return percent;
  }

  getFearPercent(){
    var resultType = this.countWords(this.wordsType);
    var num = resultType;
    //console.log(num)
    var total = this.getTotal();
    var percent = (num[1]/total)*100;
    return percent;
  }

  getJoyPercent(){
    var resultType = this.countWords(this.wordsType);
    var num = resultType;
    //console.log(num)
    var total = this.getTotal();
    var percent = (num[2]/total)*100;
    return percent;
  }

  getSadPercent(){
    var resultType = this.countWords(this.wordsType);
    var num = resultType;
    //console.log(num)
    var total = this.getTotal();
    var percent = (num[3]/total)*100;
    return percent;
  }

  // wordList(wordsType:string){
  //   document.getElementById("wordTable").style.display = 'block';
  //   this.wordChildList = []; this.wordCounts; this.wordDetailList = []; this.wordTitle = [];
  //   var lists = []; var wordList = []; var title = [];
  //   var ref = firebase.database().ref('Chats');
  //   ref.orderByChild('chatType').equalTo(wordsType).once('value',function(snapshot){
  //     title.push(wordsType);
  //     snapshot.forEach(function(chat){
  //       //think of a way to get the user's name
  //     })
  //   })
  // }

  getTopRank(type){
    var listJoy = [];
    var listCount = [];
    var sortedList = [];
    for(var i=0;i<this.allChat.length;i++){
      if(this.allChat[i].ChatType == type){
        listJoy.push(this.allChat[i].Name)
      }
    }
    listCount = this.countRank(listJoy);
    sortedList = listCount.sort(this.compare)
    //this.sortedLeaderBoard = sortedList;
    //console.log(sortedList);
    return sortedList;
  }

  // getAngerTopRank(){
  //   var listJoy = [];
  //   var listCount = [];
  //   var sortedList = [];
  //   for(var i=0;i<this.allChat.length;i++){
  //     if(this.allChat[i].ChatType == 'anger'){
  //       listJoy.push(this.allChat[i].Name)
  //     }
  //   }
  //   listCount = this.countRank(listJoy);
  //   sortedList = listCount.sort(this.compare)
  //   console.log(sortedList);
  //   return sortedList;
  // }

  // getSadTopRank(){
  //   var listJoy = [];
  //   var listCount = [];
  //   var sortedList = [];
  //   for(var i=0;i<this.allChat.length;i++){
  //     if(this.allChat[i].ChatType == 'sad'){
  //       listJoy.push(this.allChat[i].Name)
  //     }
  //   }
  //   listCount = this.countRank(listJoy);
  //   sortedList = listCount.sort(this.compare)
  //   console.log(sortedList);
  //   return sortedList;
  // }

  // getFearTopRank(){
  //   var listJoy = [];
  //   var listCount = [];
  //   var sortedList = [];
  //   for(var i=0;i<this.allChat.length;i++){
  //     if(this.allChat[i].ChatType == 'fear'){
  //       listJoy.push(this.allChat[i].Name)
  //     }
  //   }
  //   listCount = this.countRank(listJoy);
  //   sortedList = listCount.sort(this.compare)
  //   console.log(sortedList);
  //   return sortedList;
  // }

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

    //console.log(a,b,prev)
    //console.log(list);
    return list;
    //return [{"Wei":2,"joshua":3}]
  }

  test(){
    var ref;
    for(var i=0;i<this.studentsName.length;i++){
      ref = firebase.database().ref('Chats/'+this.studentsName[i].key);
      console.log(this.studentsName[i].Name)
      ref.orderByChild('chatType').equalTo('sad').once('value',function(snapshot){
        //console.log(this.studentsName)
        snapshot.forEach(function(chat){
          console.log(chat.child('Message').val());
        })
      })
    }

    // ref.once('value',function(snapshot){
    //   snapshot.forEach(function(chat){
    //     console.log(chat.key);
    //   })
    // })
  }
  
}

/* TODO:
 1) Table needs:
    - Child Name
    - Child Message
    - chat Type
    - Table can be filtered by child or by emotion

 */