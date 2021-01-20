import { Contato2 } from './../shared/contato2';
import { Component, OnInit } from '@angular/core';
import { Contato2Service } from '../shared/contato2.service';
import { Observable } from 'rxjs';
import { Contato2DataService } from '../shared/contato2-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-list2',
  templateUrl: './list2.component.html',
  styleUrls: ['./list2.component.scss']
})
export class List2Component implements OnInit {
  contatos2: Observable<any>;
 
  delete1 =false;

  constructor(private contato2Service: Contato2Service, private contato2DataService: Contato2DataService, private nav: NavService) { }
 
  ngOnInit() {
    this.nav.show()
    this.contatos2 = this.contato2Service.getAll();
  }    

  delete(key: string) {
    this.contato2Service.delete(key);
    this.delete1 = true;
  }
 
  edit(contato2: Contato2, key: string) {
    this.contato2DataService.changeContato2(contato2, key);
  }
}