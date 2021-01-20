import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato6.service';
import {NavService} from 'src/app/screens/nav/nav.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AutomlService } from './automl.service';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import * as brain from 'brain.js/browser';
import { Chart } from 'chart.js';
import {formatDate } from '@angular/common';

@Component({
    selector: 'app-phq-insight',
    templateUrl: './phq-insight.component.html',
    styleUrls: ['./phq-insight.component.scss']
  })
  export class PhqInsightComponent implements OnInit {

    authConfig: AuthConfig = {
        issuer: 'https://accounts.google.com',
        redirectUri: 'http://localhost:4200/phq-insight',
        clientId: '466769786844-7ltrrrqvdvsjdb6n8o147ukh7vflf35r.apps.googleusercontent.com',
        //scope: 'https://www.googleapis.com/auth/cloud-language', 
        strictDiscoveryDocumentValidation: false,
      };

      

    constructor(private contatoService: ContatoService, 
        private nav: NavService, 
        private http: HttpClient,
        private automlService: AutomlService,
        private oauthService: OAuthService,
    ) { this.oauthService.configure(this.authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocument().then(() => {
            this.oauthService.tryLogin({
              onTokenReceived: context => {
                console.log('logged in');
                console.log(context);
              }
            });
        });
        this.dateTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0800');
    }

    moodListArray = [];
    mood = [];
    moodType = [];
    moodReason = [];
    moodList;
    name = [];
    date = [];
    result: any;
    body = ''
    hBarChart = [];
    PieChart = [];
    moodNet = new brain.recurrent.LSTM();
    success = false;
    loader = false;
    today= new Date();
    dateTime = '';
    time = [];

    ngOnInit() {
        this.nav.show();
        //To get the Mood list with all datas from firebase
        this.contatoService.getMood().subscribe(list => {
            this.moodListArray = list.map(item =>{
                console.log(item);
                return {
                    ...item.payload.val()
                }
            })
            console.log(this.moodListArray)

            //Get only the Types from firebase
            for (var i = 0; i < this.moodListArray.length; ++i){
                if (this.moodListArray[i]['moodType'] != 'null') {
                    this.moodType.push(this.moodListArray[i]['moodType']);
                } else {
                    this.name.push(this.moodListArray[i]['name']);
                    this.date.push(this.moodListArray[i]['date']);
                    this.mood.push(this.moodListArray[i]['mood']);
                    this.moodReason.push(this.moodListArray[i]['moodReason']);
                }
            }
            console.log(this.moodType);
            console.log("data: " + this.name + ' ' + this.date + ' ' + this.mood + ' ' + this.moodReason);

            this.Pie();
            this.hBar();
        });
    }  
    
    trainData(){
        const moodData = [
        {input: "cannot do my homework", output: 'School' },
        {input: "tuition tonight", output: 'School'},
        {input: "long day at school", output: 'School'},
        {input: "a lot of homework todo", output: 'School'},
        {input: "school is tough", output: 'School'},
        {input: "didnt nap today", output: 'Others'},
        {input: "it is raining", output: 'Others'},
        {input: "stuck in a rut", output: 'Others'},
        {input: "friend don't want to talk to me", output: 'Friends'},
        {input: "not enough sleep", output: 'Others'},
        {input: "cannot finish my homework", output: 'School'},
        {input: "mummy give me too much extra homework to do", output: 'Family'},
        {input: "mummy and daddy fight", output: 'Family'},
        {input: "mummy keep shouting", output: 'Family'},
        {input: "falling sick", output: 'Others'},
        {input: "caught a flu", output: 'Others'},
        {input: "went to doctor", output: 'Others'},
        {input: "drowsy from medicine", output: 'Others'},
        {input: "too many tuitions", output: 'School'},
        {input: "long day in school", output: 'School'},
        {input: "i'm a failure", output: 'Others'},
        {input: "mummy never cook dinner", output: 'Family'},
        {input: "friends never wait to go recess with me", output: 'Friends'},
        {input: "friends laugh at me when I fell", output: 'Friends'},
        {input: "Aaron said I was not funny enough", output: 'Friends'},
        {input: "daddy beat me because I never get first in class", output: 'Family'},
        {input: "my friends lied to me", output: 'Friends'},
        {input: "mummy keep signing me up for extra classes", output: 'School'},
        {input: "friends always ask me help to carry their things", output: 'Friends'},     
        {input: "friends call me dumb", output: 'Friends'},
        {input: "brother hit me", output: 'Family'},
        {input: "sister call me fat", output: 'Family'},
        ];

        const configMood = {
            //errorThresh: 0.5,  // error threshold to reach
            iterations: 40,   // maximum training iterations
            log: true,           // console.log() progress periodically
            logPeriod: 10,       // number of iterations between logging
            learningRate: 0.5    // learning rate
        };

        //const moodNet = new brain.recurrent.LSTM();
        const train = this.moodNet.train(moodData, { 
            iterations: 30, log: true, logPeriod: 10
        });
    }

    runData(){
        for (var i =0 ;  i < this.moodReason.length; i++) {
            const result = this.moodNet.run(this.moodReason[i].toLowerCase());
            console.log(this.moodReason[i].toLowerCase() + " = " + result);
            this.contatoService.update1(this.moodReason[i], this.date[i], this.name[i], this.moodReason[i], result)
        }
    }

    predict(){
        this.time = [];
        if (this.moodReason[0] == null){
            console.log("NTH to update here")
            this.success = true;
        } else {
            this.loader = true;
            console.log("got sth")
            this.trainData();
            this.runData();
            this.time.push(this.dateTime);
            location.reload();
        }
    }

    close(){
        this.success = false;
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

    //Mood Chart 
    Pie(){
        var resultMood = this.count(this.mood)
        console.log(resultMood[0])
        console.log(this.colorSet(this.mood))
        this.PieChart.push(new Chart('pieChart', {
            type: 'pie',
            data: {
                labels: this.group(this.mood),
                datasets: [{
                    data: this.count(this.mood),
                    backgroundColor: this.colorSet(this.mood),
                    borderColor: 'black',
                    borderWidth: 0.3
                }]
            },options: {
                responsive: true,
                title:{
                    text: "Mood Chart",
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

    //Causes of Mood Chart

    hBar(){
        var resultType = this.count(this.moodType);
        console.log(resultType[0]);
        this.hBarChart.push(new Chart('hBarChart', {
            type: 'horizontalBar',
            data: {
                labels: this.group(this.moodType),
                datasets: [{
                    label: '# of respective types of mood',
                    data: resultType[0],
                    backgroundColor: ['#FFD281', '#C7E596', '#FF9AAE', '#C3E8FF'],
                    borderColor: 'black',
                    borderWidth: 0.3
                }]
            },options: {
                title:{
                    text:"Cause of Mood",
                    display:true,
                    fontSize: 15,
                    position: 'top'
                },scales: {
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
                },legend: {
                   labels: {
                       fontSize: 15
                   }
                },
            }
        }))
    }

    getTotal(){
        var resultType = this.count(this.moodType);
        var num = resultType[0];
        var total = 0;
        for (var i = 0; i < num.length; i++) {
            total = total + num[i];
        }
        return total
    }

    getFamilyPercent(){
        var resultType = this.count(this.moodType);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[0]/total)*100;
        return percent;
    }

    getFriendsPercent(){
        var resultType = this.count(this.moodType);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[1]/total)*100;
        return percent;
    }

    getSchoolPercent(){
        var resultType = this.count(this.moodType);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[2]/total)*100;
        return percent;
    }

    getOthersPercent(){
        var resultType = this.count(this.moodType);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[3]/total)*100;
        return percent;
    }

    update1(name: string, date: string, mood: string, moodReason: string, moodType: string){
        var ref = firebase.database().ref('mood');
        ref.orderByChild('date').equalTo(date).once("value", function(snapshot) {
          snapshot.forEach(function(mood) {
            const date1 = mood.child('Date').val();
            const mood1 = mood.child('Mood').val();
            const moodReason1 = mood.child('Reason').val();
    
            if (date == date1 && mood == mood1 && moodReason == moodReason1){
              mood.ref.update({ moodType: moodType });
            }
          });
        });
      }

    // moodList(moodType: string){
    //     document.getElementById("card").style.display = 'none';
    //     document.getElementById("moodTable").style.display = 'block';
    //     this.vlists = []; this.vcounts = []; this.vactions = []; this.vTitle = [];
    //     var lists = []; var alist = []; var title = [];
    //     var ref = firebase.database().ref('Bullying');
    //     ref.orderByChild('moodType').equalTo(moodType).once("value", function(snapshot) {
    //         title.push(moodType);
    //         snapshot.forEach(function(mood) {
    //             var mood = mood.child('mood').val();
    //             var moodReason = mood.child('moodReason').val();
    //             console.log(mood);
    //         });
    //     });
    //     this.vTitle = title;
    //     this.vactions = alist;
    //     console.log(this.vactions);
    //     this.vlists = this.group(lists);
    //     console.log(this.vlists)
    //     var o = this.count(lists);
    //     this.vcounts = o[0];
    //     console.log(this.vcounts);
    // }

    // viewDetail(){
    //     document.getElementById("card").style.display = 'block';
    // }

//-------------------------------------------------------------------------------------------------------------------------------------------------
//  Calling google to get use AutoMl NLP - 2 Methods BUT both not enough authentications                                                          |
// (1) Use of client id from OAuth 2.0 client IDs to get access token - but scope for automl is sensitive                                         |
// (2) Use of service account key and set to GOOGLE_APPLICATION_CREDENTIALS using Google Cloud SDK Shell.                                         |
//     Need to login first via cloud SDK and after setting, print access token.                                                                   |
//-------------------------------------------------------------------------------------------------------------------------------------------------
    hh(){
        //Initiate the oauthservice just like above
        this.oauthService.initImplicitFlow();
    }

    gg(){
        console.log(this.oauthService.getAccessToken())
        this.ff();
        this.oauthService.logOut();
    }

    ff(){
        this.http.post(this.automlService.endpoint, this.body, {
            headers: new HttpHeaders({
            //'Authorization': 'Bearer ' + this.oauthService.getAccessToken(),
            'Authorization': 'Bearer ya29.GltcByBiKYyYeiVECiSM5L_2tks8j-E0HXeiwewbdhXv_BZYwSFUA6cu6joNBvCAM5CUtDSlmDNeJ6jSxtP3hbFoSRaceZIxIJ94oB8pahVKSUdyDjzbbMzc2ksd',
            'Content-Type':  'application/json'
            })}).subscribe(data => {
                console.log("POST Request is successful ", data);
            }, error  => {
            console.log(JSON.stringify(error));
        })
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------
}