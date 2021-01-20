import { Contato8 } from './../shared/contato8';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato8.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato8-data.service';
import { Router, Params } from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'
import { ConfirmationDialogService } from 'src/app/screens/confirmation-dialog/confirmation-dialog.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-list8',
  templateUrl: './list8.component.html',
  styleUrls: ['./list8.component.scss']
})

export class List8Component implements OnInit {
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private router: Router, private nav: NavService) { }
  contatos8: Observable<any> = this.contatoService.getAll();
  searchText: string = "";
  list;
  p: number = 1;
  //sorting
  key: string = ""
  name: string = ""
  reverse: boolean = true;

  ngOnInit() {
    this.nav.show()
    this.contatos8 = this.contatoService.getAll()
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key)
  }
    viewDetails(contato8){
    this.router.navigate(['/point-system-details/', contato8]);
    console.log(contato8)
  }
  edit(contato8: Contato8, key: string) {
    this.contatoDataService.changeContato(contato8, key);
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