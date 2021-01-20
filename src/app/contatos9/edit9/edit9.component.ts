import { Component, OnInit, Input } from '@angular/core';
import { Contato9 } from '../shared/contato9';
import { ContatoService } from '../shared/contato9.service';
import { ContatoDataService } from '../shared/contato9-data.service';
import { NavService } from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-edit9',
  templateUrl: './edit9.component.html',
  styleUrls: ['./edit9.component.scss']
})
export class Edit9Component implements OnInit {
  contato9: Contato9
  key: string = '';

  energy: string = '';
  sleep: string = '';
  full: string = '';
  appetite: string = '';
  date: string = '';
  name: string = '';
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private nav: NavService) { }
 
  ngOnInit() {
    this.nav.show()
    this.contato9 = new Contato9();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato9 && data.key) {
        this.contato9 = new Contato9();
        this.contato9.date = data.contato9.date;
        this.contato9.name = data.contato9.name;
        this.contato9.sleep = data.contato9.sleep;
        this.contato9.energy = data.contato9.energy;
        this.contato9.full = data.contato9.full;
        this.contato9.appetite = data.contato9.appetite;
        this.key = data.key;
      }
    })
  }
}