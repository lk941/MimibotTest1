import { Contato9 } from './../shared/contato9';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato9.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato9-data.service';
import { Router, Params } from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-list9',
  templateUrl: './list9.component.html',
  styleUrls: ['./list9.component.scss']
})

export class List9Component implements OnInit {
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private router: Router, private nav: NavService) { }
  contatos9: Observable<any> = this.contatoService.getAll();
  
  searchText: string = "";
  list;
  p: number = 1;

 
  //sorting
  key: string = ""
  name: string = ""
  reverse: boolean = true;

  ngOnInit() {
    this.nav.show()
    this.contatos9 = this.contatoService.getAll()
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key)
  }
}