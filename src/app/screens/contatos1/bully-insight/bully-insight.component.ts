import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato1.service';
import {NavService} from '../../nav/nav.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { AutomlService } from './automl.service';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import * as brain from 'brain.js/browser';
import { Chart } from 'chart.js';
import {formatDate } from '@angular/common';

@Component({
    selector: 'app-bully-insight',
    templateUrl: './bully-insight.component.html',
    styleUrls: ['./bully-insight.component.scss']
  })
  export class BullyInsightComponent implements OnInit {

    authConfig: AuthConfig = {
        issuer: 'https://accounts.google.com',
        redirectUri: 'http://localhost:4200/bully-insight',
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
        this.dateTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    }

    bullyListArray = [];
    bullyActions = [];
    bullyTypes = [];
    actionNotCat = [];
    bullyDate = []; bullReason = []; bullyVictim = []; 
    result: any;
    body = ''
    hBarChart = [];
    bullyNet = new brain.recurrent.LSTM();
    success = false;
    loader = false;
    vlists = []; vcounts = []; vactions = []; //for leaderboard
    vTitle = [];
    today= new Date();
    dateTime = '';
    time = [];

    ngOnInit() {
        this.nav.show();
        //To get the Bully list with all daatas from firebase
        this.contatoService.getBully().subscribe(list => {
            this.bullyListArray = list.map(item =>{
                console.log(item);
                return {
                    ...item.payload.val()
                }
            })
            console.log(this.bullyListArray)

            //Get only the Types from firebase
            for (var i = 0; i < this.bullyListArray.length; ++i){
                if (this.bullyListArray[i]['BullyType'] != 'null') {
                    this.bullyTypes.push(this.bullyListArray[i]['BullyType']);
                } else {
                    this.actionNotCat.push(this.bullyListArray[i]['Action']);
                    this.bullyDate.push(this.bullyListArray[i]['Date']);
                    this.bullyVictim.push(this.bullyListArray[i]['Victim']);
                    this.bullReason.push(this.bullyListArray[i]['Reason']);
                }
            }
            console.log(this.bullyTypes);
            console.log("data: " + this.actionNotCat + ' ' + this.bullyDate + ' ' + this.bullyVictim + ' ' + this.bullReason);

            this.hBar();
        });
    }  
    
    trainData(){
        const bullyingData = [
            {input: "spread rumours", output: "Social Bullying"},
            {input: "post a mean comment online", output: "Cyberbullying"},
            {input: "say I'm stupid", output: "Verbal Bullying"},
            {input: "push me to the floor", output: "Physical Bullying"},
            {input: "slap my face", output: "Physical Bullying"},
            {input: "gossip about me", output: "Social Bullying"},
            {input: "call me a loser", output: "Verbal Bullying"},
            {input: "expose my secrets to others", output: "Social Bullying"},
            {input: "steal", output: "Physical Bullying"},
            {input: "post video of me online", output: "Cyberbullying"},
            {input: "fat", output: "Verbal Bullying"},
            {input: "useless", output: "Verbal Bullying"},
            {input: "hit", output: "Physical Bullying"},
            {input: "punch my face", output: "Physical Bullying"},
            {input: "talk behind my back", output: "Social Bullying"},
            {input: "kick my leg", output: "Physical Bullying"},
            {input: "post picture", output: "Cyberbullying"},
            {input: "pull my hair", output: "Physical Bullying"},
            {input: "insult me", output: "Verbal Bullying"},
            {input: "step my shoe", output: "Physical Bullying"},
            {input: "send mean messages to me", output: "Cyberbullying"},
            {input: "eat my sweets", output: "Physical Bullying"},
            {input: "say I am ugly", output: "Verbal Bullying"},
        ];

        const configBully = {
            //errorThresh: 0.5,  // error threshold to reach
            iterations: 40,   // maximum training iterations
            log: true,           // console.log() progress periodically
            logPeriod: 10,       // number of iterations between logging
            learningRate: 0.5    // learning rate
        };

        //const bullyNet = new brain.recurrent.LSTM();
        const train = this.bullyNet.train(bullyingData, { 
            iterations: 30, log: true, logPeriod: 10
        });
    }

    runData(){
        for (var i =0 ;  i < this.actionNotCat.length; i++) {
            const result = this.bullyNet.run(this.actionNotCat[i].toLowerCase());
            console.log(this.actionNotCat[i].toLowerCase() + " = " + result);
            this.contatoService.update1(this.actionNotCat[i], this.bullyDate[i], this.bullyVictim[i], this.bullReason[i], result)
        }
    }

    predict(){
        this.time = [];
        if (this.actionNotCat[0] == null){
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

    hBar(){
        var resultType = this.count(this.bullyTypes);
        console.log(resultType[0]);
        this.hBarChart.push(new Chart('hBarChart', {
            type: 'horizontalBar',
            data: {
                labels: this.group(this.bullyTypes),
                datasets: [{
                    label: '# of respective types of bully',
                    data: resultType[0],
                    backgroundColor: ['#FFD281', '#C7E596', '#FF9AAE', '#C3E8FF'],
                    borderColor: 'black',
                    borderWidth: 0.3
                }]
            },options: {
                title:{
                    text:"Types of Bully Chart",
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
        var resultType = this.count(this.bullyTypes);
        var num = resultType[0];
        var total = 0;
        for (var i = 0; i < num.length; i++) {
            total = total + num[i];
        }
        return total
    }

    getCPercent(){
        var resultType = this.count(this.bullyTypes);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[0]/total)*100;
        return percent;
    }

    getPPercent(){
        var resultType = this.count(this.bullyTypes);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[1]/total)*100;
        return percent;
    }

    getSPercent(){
        var resultType = this.count(this.bullyTypes);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[2]/total)*100;
        return percent;
    }

    getVPercent(){
        var resultType = this.count(this.bullyTypes);
        var num = resultType[0];
        var total = this.getTotal();
        var percent = (num[3]/total)*100;
        return percent;
    }

    vicList(bullyType: string){
        document.getElementById("card").style.display = 'none';
        document.getElementById("vicTable").style.display = 'block';
        this.vlists = []; this.vcounts = []; this.vactions = []; this.vTitle = [];
        var lists = []; var alist = []; var title = [];
        var ref = firebase.database().ref('Bullying');
        ref.orderByChild('BullyType').equalTo(bullyType).once("value", function(snapshot) {
            title.push(bullyType);
            snapshot.forEach(function(bully) {
                var victim = bully.child('Victim').val();
                var action = bully.child('Action').val();
                console.log(victim);
                lists.push(victim);
                alist.push(action);
            });
        });
        this.vTitle = title;
        this.vactions = alist;
        console.log(this.vactions);
        this.vlists = this.group(lists);
        console.log(this.vlists)
        var o = this.count(lists);
        this.vcounts = o[0];
        console.log(this.vcounts);
    }

    viewDetail(){
        document.getElementById("card").style.display = 'block';
    }

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