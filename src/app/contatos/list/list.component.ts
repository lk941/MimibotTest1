import { Contato } from './../shared/contato';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
import { ConfirmationDialogService } from 'src/app/screens/confirmation-dialog/confirmation-dialog.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  contatos: Observable<any>;
  value: any;
  searchText = '';
  p: number = 1;
 
  constructor(public contatoService: ContatoService, private contatoDataService: ContatoDataService, private nav: NavService, private confirmationDialogService: ConfirmationDialogService) { }
  //sorting
  key: string =""
  reverse: boolean = true;
  
  ngOnInit() {
    this.nav.show()
    this.contatos = this.contatoService.getAll();
    
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
 
  edit(contato: Contato, key: string) {
    this.contatoDataService.changeContato(contato, key);
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key)
  }

  openConfirmationDialog(key: string, student: string, hw: string) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to delete ' + hw + ' homework for ' + student + '?')
    .then((confirmed) => this.check(confirmed, key))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}