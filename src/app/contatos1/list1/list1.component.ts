import { Contato1 } from './../shared/contato1';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato1.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato1-data.service';
import { Router, Params } from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-list1',
  templateUrl: './list1.component.html',
  styleUrls: ['./list1.component.scss']
})

export class List1Component implements OnInit {
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private router: Router, private nav: NavService) { }
  contatos1: Observable<any> = this.contatoService.getAll();
  //searchText: string = "";
  list;
  p: number = 1;
  //sorting
  key: string =""
  reverse: boolean = true;
  searchText = '';

  ngOnInit() {
    this.nav.show()
    this.contatos1 = this.contatoService.getAll()
  }

  viewDetails(contato1){
    this.router.navigate(['/bully-details/', contato1]);
    console.log(contato1)
  }

  viewInsight(){
    this.router.navigate(['/bully-insight']);
  }

  delete(key: string) {
    this.contatoService.delete(key);
  }
 
  edit(contato1: Contato1, key: string) {
    this.contatoDataService.changeContato(contato1, key);
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key)
  }

  // filterCondition(contato1){
  //   this.list = contato1.BullyName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  //   return this.list
  // }
}