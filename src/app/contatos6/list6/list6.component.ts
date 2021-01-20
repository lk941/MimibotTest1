import { Contato6 } from './../shared/contato6';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato6.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato6-data.service';
import { Router, Params } from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-list6',
  templateUrl: './list6.component.html',
  styleUrls: ['./list6.component.scss']
})

export class List6Component implements OnInit {
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private router: Router, private nav: NavService) { }
  contatos6: Observable<any> = this.contatoService.getAll();
  searchText: string = "";
  list;
  p: number = 1;
  //sorting
  key: string =""
  reverse: boolean = true;

  ngOnInit() {
    this.nav.show()
    this.contatos6 = this.contatoService.getAll()
  }

  viewInsight(){
    this.router.navigate(['/phq-insight']);
  }

  delete(key: string) {
    this.contatoService.delete(key);
  }
 
  edit(contato6: Contato6, key: string) {
    this.contatoDataService.changeContato(contato6, key);
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