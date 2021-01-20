import { Component, OnInit, Input } from '@angular/core';
import { Contato8 } from '../shared/contato8';
import { ContatoService } from '../shared/contato8.service';
import { ContatoDataService } from '../shared/contato8-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-edit8',
  templateUrl: './edit8.component.html',
  styleUrls: ['./edit8.component.scss']
})
export class Edit8Component implements OnInit {
  contato8: Contato8
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
    this.contato8 = new Contato8();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato8 && data.key) {
        this.contato8 = new Contato8();
        this.contato8.ChildName = data.contato8.ChildName;
		this.contato8.Name = data.contato8.Name;
		this.contato8.Date = data.contato8.Date;
		this.contato8.Points = data.contato8.Points;
		this.contato8.CompletionStatus = data.contato8.CompletionStatus;
        this.key = data.key;
		this.openForm();
      }
    })
	    this.contatoService.getTasks().subscribe(list => {
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
    this.contatoService.update(this.contato8, this.key);
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
    this.contato8 = new Contato8();
    document.getElementById("myForm").style.display = "none";
  }
  // onSubmit() {
    // if (this.key) {
      // this.contatoService.update(this.contato8, this.key);
    // } else {
      // this.contatoService.insert(this.contato8);
    // }
    // document.getElementById("alert").style.display = "block";
    // this.contato8 = new Contato8();
  // }
    // openForm() {
    // document.getElementById("myForm").style.display = "block";
    // document.getElementById("alert").style.display = "none";
    // document.getElementById("alert1").style.display = "none";
  // }
  
  // closeForm() {
    // this.contato8 = new Contato8();
    // document.getElementById("myForm").style.display = "none";
  // }

  // onAddBtn(){
    // this.contato8 = new Contato8();
    // if (document.getElementById("addBtn").innerHTML == "Add Task") {
      // document.getElementById("addTk").style.display = "block";
      // document.getElementById("addBtn").innerHTML = "Close"
      // document.getElementById("alert1").style.display = "none";
      // document.getElementById("alert").style.display = "none";
    // } else if (document.getElementById("addBtn").innerHTML == "Close"){
      // document.getElementById("addTk").style.display = "none";
      // document.getElementById("addBtn").innerHTML = "Add Task";
    // }
  // }
  

  // firstCase(string) {
    // return string.charAt(0).toUpperCase() + string.slice(1);
  // }
}