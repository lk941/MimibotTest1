import { Component, OnInit, AfterViewChecked} from '@angular/core';
import { NavService } from '../nav/nav.service';
import { Contato } from 'src/app/contatos/shared/contato';
import { ContatoService } from 'src/app/contatos/shared/contato.service';
import { ContatoDataService } from 'src/app/contatos/shared/contato-data.service';
import {ChildkeyService} from './childkey.service';
import { Childkeyparent } from './childkeyparent';
import { MatDialog } from '@angular/material';
import { DialogboxComponent } from '../Dialogbox/dialogbox/dialogbox.component';

@Component({
  selector: 'app-select-child-page',
  templateUrl: './select-child-page.component.html',
  styleUrls: ['./select-child-page.component.scss']
})
export class SelectChildPageComponent implements OnInit, AfterViewChecked {

  constructor(private childkey: ChildkeyService, private contatoService: ContatoService, private contatoDataService: ContatoDataService, private nav: NavService, private dialog: MatDialog) { }
  contato: Contato
  rio: Contato
  inputstring: string;
  key: string ='';
  userListArray = []
  selfArray = [] //This Array is used to display stuff. 
  actualdisplayArray = []
  userNames = ['All']
  users = this.userNames;
  selectedUser: string = '';
  success = false;
  addSuccess = false;

  toomanyvar: string = '';
  pid: string = sessionStorage.getItem("User");
  usertype: string = sessionStorage.getItem("userType");

  //IMPORTANT: NgIF in the html, DO NOT TOUCH. It can be circumvented easily through the power of googling.


  ngOnInit() {
    this.nav.show;
    // Store Children in Array here
    this.contato = new Contato();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato && data.key) {
        this.contato = new Contato();
        this.contato.Name = data.contato.Name;
        this.contato.Date = data.contato.Date;
        this.contato.Student = data.contato.Student;
        this.contato.CompletionStatus = data.contato.CompletionStatus;
        this.key = data.key;
      }
    });

    this.contatoService.getUser().subscribe(list => {
      this.userListArray = list.map(item =>{
          return {
              ...item.payload.val()
          }
      })
    });

    
  }

  openDialog(action, obj, name) {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: { obj, action }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Error') {
       
      } else if (result.event == 'Confirmation Yes') {
        this.childkey.setConfirmation(this.toomanyvar, this.pid);
        }
      }
    );
  }

  // No longer require AfterViewChecked. Will show up in a dialogbox.
  ngAfterViewChecked(){
    var parekey = sessionStorage.getItem("User");
    
    for (var i = 0; this.userListArray[i]; i++) {
      var rio = new Childkeyparent();
      rio = this.userListArray[i];
      if (rio.pid == parekey) 
      {
        this.selfArray.push(rio);
        this.userListArray.splice(i,1);
      } 
      else if (rio.pid != null)
      { 
        this.userListArray.splice(i,1);
        // nothing 
      } else {}
  }


}

  // onkey is Obsolete. Can be deleted, but leaving here for further reference.
  onkey(event){
    const input = event.target.value; //works
    this.inputstring = input;

    //this.actualdisplayArray = [];
    //if (input == ''){
    //  return;
    //} else {
    //  for (var i = 0; this.userListArray[i]; i++) {
    //    var contato = new Contato();
    //    contato = this.userListArray[i];
    //    if (input == contato.Name) { 
    //      // Display those that match...
    //      this.actualdisplayArray.push(contato);
    //    } else {
    //      // Nothing
    //    }
    //  }
    //  // console.log("Hey, You're in");
    //}
    
    //this.actualdisplayArray.includes(contato);

    // Based on this, search for children.

  }

  onSubmit() {
    // This should instead display the student search.
    // There must be another button that instead displays input confirmation item into DB. (Parent - Key + Child Key into branch "PC-Confirmation")



    // WAIT
    var userList = this.childkey.geteverythingChild();

    // USE DIALOGBOX - DISPLAY FOR BIG MAN


    // Input into Child the parent ID.
    if (this.inputstring != '' || this.inputstring == undefined) { 
    for (var i = 0; i < userList.length; i++) {
      if (this.inputstring == userList[i].nric) {
        var key = userList[i].key;
        this.toomanyvar = key;
        // IF EXISTING CONFIRMATION EXISTING, REJECT

        if (this.childkey.checkConfirmation(key, this.pid) == true) {
          // ACCEPT
          this.openDialog("Confirmation Yes", [], userList[i].name)
          // DO NOT NEED THIRD ARGUMENT, PASS IN THE DATA [] INSTEAD AND USE THE obj.name TO RETRIEVE NAME.

        } else {
          console.log("Reject");
        }
      } else {

      }
    }
  }
  }
  
}
