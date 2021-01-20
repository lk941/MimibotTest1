import { Contato7 } from './../shared/contato7';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato7.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato7-data.service';
import { Router, Params } from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-list7',
  templateUrl: './list7.component.html',
  styleUrls: ['./list7.component.scss']
})

export class List7Component implements OnInit {
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private router: Router, private nav: NavService) { }
  contatos7: Observable<any> = this.contatoService.getAll();
  searchText: string = "";
  list;
  p: number = 1;
  //sorting
  key: string = ""
  name: string = ""
  reverse: boolean = true;

  ngOnInit() {
    this.nav.show()
    this.contatos7 = this.contatoService.getAll()
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key)
  }
    viewDetails(contato7){
    this.router.navigate(['/point-system-details/', contato7]);
    console.log(contato7)
  }
}