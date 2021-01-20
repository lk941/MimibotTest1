import { Component, OnInit, Input } from '@angular/core';
import { Contato5 } from '../shared/contato5';
import { ContatoService } from '../shared/contato5.service';
import { ContatoDataService } from '../shared/contato5-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-edit5',
  templateUrl: './edit5.component.html',
  styleUrls: ['./edit5.component.scss']
})
export class Edit5Component implements OnInit {
  contato5: Contato5
  key: string = '';
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private nav: NavService) { }
 
  ngOnInit() {
    this.nav.show()
    this.contato5 = new Contato5();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato5 && data.key) {
        this.contato5 = new Contato5();
        this.contato5.Name = data.contato5.nome;
        this.contato5.Hobby = data.contato5.telefone;
        this.key = data.key;
      }
    })
  }
 
  onSubmit() {
    if (this.key) {
      this.contatoService.update(this.contato5, this.key);
    } else {
      this.contatoService.insert(this.contato5);
    }
 
    this.contato5 = new Contato5();
  }
}