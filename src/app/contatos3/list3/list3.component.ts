import { Contato3 } from './../shared/contato3';
import { Component, OnInit } from '@angular/core';
import { Contato3Service } from '../shared/contato3.service';
import { Observable } from 'rxjs';
import { Contato3DataService } from '../shared/contato3-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-list3',
  templateUrl: './list3.component.html',
  styleUrls: ['./list3.component.scss']
})
export class List3Component implements OnInit {
  contatos3: Observable<any>;
 
  delete1 =false;


  constructor(private contato3Service: Contato3Service, private contato3DataService: Contato3DataService, private nav: NavService) { }

  ngOnInit() {
    this.nav.show()
    this.contatos3 = this.contato3Service.getAll();
  }

  delete(key: string) {
    this.contato3Service.delete(key);
    this.delete1 = true;
  }
 
  edit(contato3: Contato3, key: string) {
    this.contato3DataService.changeContato3(contato3, key);
  }
}
