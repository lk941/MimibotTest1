import { Contato10 } from './../shared/contato10';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato10.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato10-data.service';
import { Router, Params } from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'
import { ConfirmationDialogService } from 'src/app/screens/confirmation-dialog/confirmation-dialog.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-list10',
  templateUrl: './list10.component.html',
  styleUrls: ['./list10.component.scss']
})

export class List10Component implements OnInit {
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private router: Router, private nav: NavService) { }
  contatos10: Observable<any> = this.contatoService.getAll();
  searchText: string = "";
  list;
  p: number = 1;
  //sorting
  key: string = ""
  name: string = ""
  reward: string =""
  points: string = ""
  
  reverse: boolean = true;

  ngOnInit() {
    this.nav.show()
    this.contatos10 = this.contatoService.getAll()
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key)
  }
    viewDetails(contato10){
    this.router.navigate(['/point-system-details/', contato10]);
    console.log(contato10)
  }
  edit(contato10: Contato10, key: string) {
    this.contatoDataService.changeContato(contato10, key);
  }
  delete(key: string) {
    this.contatoService.delete(key);
  }
  check(confirmed: boolean, key:string){
    console.log(confirmed + ' ' + key)
    if (confirmed == true){
      this.delete(key)
    }
  }
   // openConfirmationDialog(key: string, name: string, tk: string) {
    // this.confirmationDialogService.confirm('Please confirm', 'Do you really want to delete ' +tk + ' Task for ' + name + '?')
    // .then((confirmed) => this.check(confirmed, key))
    // .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  // }
}