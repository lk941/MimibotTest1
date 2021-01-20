import { Component, OnInit, Input } from '@angular/core';
import { Contato10 } from '../shared/contato10';
import { ContatoService } from '../shared/contato10.service';
import { ContatoDataService } from '../shared/contato10-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-edit10',
  templateUrl: './edit10.component.html',
  styleUrls: ['./edit10.component.scss']
})
export class Edit10Component implements OnInit {
  contato10: Contato10
  key: string = '';
 
  constructor(private contatoService: 
  
  ContatoService, private contatoDataService: ContatoDataService, private nav: NavService) { }
  
  userListArray = []
  userNames = ['All']
  users = this.userNames;
  selectedUser: string = '';
  success = false;
  addSuccess = false;

  selectChangeHandler (event: any) {
    this.selectedUser = event.target.value;
  }
  
  ngOnInit() {
    this.nav.show()
    this.contato10 = new Contato10();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato10 && data.key) {
        this.contato10 = new Contato10();
        this.contato10.ChildName = data.contato10.ChildName;
		this.contato10.Date = data.contato10.Date;
		this.contato10.Reward = data.contato10.Reward;
		this.contato10.Status = data.contato10.Status;
        this.key = data.key;
		this.openForm();
      }
    })
	    this.contatoService.getRewards().subscribe(list => {
      this.userListArray = list.map(item =>{
          return {
              ...item.payload.val()
          }
      })
      console.log(this.userListArray)

      for (var i = 0; i < this.userListArray.length; ++i){
          this.userNames.push(this.userListArray[i]['Name']);
      }
      console.log(this.userNames)
    })
  }
 
 onSubmit(){
    this.contatoService.update(this.contato10, this.key);
    this.closeForm();
    this.success = true;
    document.getElementById("alert").style.display = "block";
  }

  openForm() {
    document.getElementById("myForm").style.display = "block";
    document.getElementById("alert").style.display = "none";
    document.getElementById("alert1").style.display = "none";
  }
    closeForm() {
    this.contato10 = new Contato10();
    document.getElementById("myForm").style.display = "none";
  }
   onAddBtn(){
    this.contato10 = new Contato10();
    if (document.getElementById("addBtn").innerHTML == "Add Reward") {
      document.getElementById("addRd").style.display = "block";
      document.getElementById("addBtn").innerHTML = "Close"
      document.getElementById("alert1").style.display = "none";
      document.getElementById("alert").style.display = "none";
    } else if (document.getElementById("addBtn").innerHTML == "Close"){
      document.getElementById("addRd").style.display = "none";
      document.getElementById("addBtn").innerHTML = "Add Reward";
    }
  }

  onInsert(){
    if (this.selectedUser !== 'All'){
      var Child1 = this.contato10.ChildName
      var Reward = this.contato10.Reward
      var date = this.contato10.Date
	  var Points = this.contato10.Points
      this.contato10 = {Status: "available", Points: this.SecCase(Points), Reward: this.ThirdCase(Reward), Date: date, Name: this.firstCase(name), ChildName: Child1}
      this.contatoService.insert(this.contato10);
      console.log(this.contato10);
      this.contato10 = new Contato10();

      document.getElementById("addRd").style.display = "none";
      document.getElementById("addBtn").innerHTML = "Add Reward";
    } else if (this.selectedUser == 'All' ){
        for (var i = 0; i < this.userListArray.length; ++i){
          var Child = this.userListArray[i]['ChildName']
          var Reward = this.contato10.Reward
          var date = this.contato10.Date
          this.contato10 = {Status: "available",Points: this.SecCase(Points), Reward: this.ThirdCase(Reward), Date: date, Name: this.firstCase(name), ChildName: Child}
          this.contatoService.insert(this.contato10);
          console.log(this.contato10);
        }
      }
      document.getElementById("addRd").style.display = "none";
      document.getElementById("addBtn").innerHTML = "Add Reward";
      this.addSuccess = true;
      document.getElementById("alert1").style.display = "block";
  }
  firstCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  SecCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  ThirdCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}