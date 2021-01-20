import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/contato';
import { ContatoService } from '../shared/contato.service';
import { ContatoDataService } from '../shared/contato-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  contato: Contato
  key: string ='';

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private nav: NavService) { }
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
    this.nav.show();
    this.contato = new Contato();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato && data.key) {
        this.contato = new Contato();
        this.contato.Name = data.contato.Name;
        this.contato.Date = data.contato.Date;
        this.contato.Student = data.contato.Student;
        this.contato.CompletionStatus = data.contato.CompletionStatus;
        this.key = data.key;
        this.openForm();
      }
    })

    this.contatoService.getUser().subscribe(list => {
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
    this.contatoService.update(this.contato, this.key);
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
    this.contato = new Contato();
    document.getElementById("myForm").style.display = "none";
  }

  onAddBtn(){
    this.contato = new Contato();
    if (document.getElementById("addBtn").innerHTML == "Add Homework") {
      document.getElementById("addHw").style.display = "block";
      document.getElementById("addBtn").innerHTML = "Close"
      document.getElementById("alert1").style.display = "none";
      document.getElementById("alert").style.display = "none";
    } else if (document.getElementById("addBtn").innerHTML == "Close"){
      document.getElementById("addHw").style.display = "none";
      document.getElementById("addBtn").innerHTML = "Add Homework";
    }
  }

  onInsert(){
    if (this.selectedUser !== 'All'){
      var student1 = this.contato.Student
      var name = this.contato.Name
      var date = this.contato.Date
      this.contato = {CompletionStatus: "no", Date: date, Name: this.firstCase(name), Student: student1}
      this.contatoService.insert(this.contato);
      console.log(this.contato);
      this.contato = new Contato();

      document.getElementById("addHw").style.display = "none";
      document.getElementById("addBtn").innerHTML = "Add Homework";
    } else if (this.selectedUser == 'All' ){
        for (var i = 0; i < this.userListArray.length; ++i){
          var student = this.userListArray[i]['Name']
          var name = this.contato.Name
          var date = this.contato.Date
          this.contato = {CompletionStatus: "no", Date: date, Name: this.firstCase(name), Student: student}
          this.contatoService.insert(this.contato);
          console.log(this.contato);
        }
      }
      document.getElementById("addHw").style.display = "none";
      document.getElementById("addBtn").innerHTML = "Add Homework";
      this.addSuccess = true;
      document.getElementById("alert1").style.display = "block";
  }

  firstCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}




