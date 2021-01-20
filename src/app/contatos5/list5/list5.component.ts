import { Contato5 } from './../shared/contato5';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../shared/contato5.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from '../shared/contato5-data.service';
import { Router, Params } from '@angular/router';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-list5',
  templateUrl: './list5.component.html',
  styleUrls: ['./list5.component.scss']
})

export class List5Component implements OnInit {
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private router: Router, private nav: NavService) { }
  contatos5: Observable<any> = this.contatoService.getAll();
  //searchText: string = "";
  list;
  p: number = 1;
  //sorting
  key: string =""
  reverse: boolean = true;
  searchText = '';

  ngOnInit() {
    this.nav.show()
    this.contatos5 = this.contatoService.getAll()
  }


  viewInsight(){
    this.router.navigate(['/hobby-insight']);
  }

  delete(key: string) {
    this.contatoService.delete(key);
  }
 
  edit(contato5: Contato5, key: string) {
    this.contatoDataService.changeContato(contato5, key);
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    console.log(key)
  }
}