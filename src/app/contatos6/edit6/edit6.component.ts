import { Component, OnInit, Input } from '@angular/core';
import { Contato6 } from '../shared/contato6';
import { ContatoService } from '../shared/contato6.service';
import { ContatoDataService } from '../shared/contato6-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-edit6',
  templateUrl: './edit6.component.html',
  styleUrls: ['./edit6.component.scss']
})
export class Edit6Component implements OnInit {
  contato6: Contato6
  key: string = '';
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private nav: NavService) { }
 
  ngOnInit() {
    this.nav.show()
    this.contato6 = new Contato6();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato6 && data.key) {
        this.contato6 = new Contato6();
        this.contato6.name = data.contato6.name;
        this.contato6.date = data.contato6.date;
        this.key = data.key;
      }
    })
  }
 
  onSubmit() {
    if (this.key) {
      this.contatoService.update(this.contato6, this.key);
    } else {
      this.contatoService.insert(this.contato6);
    }
 
    this.contato6 = new Contato6();
  }
}