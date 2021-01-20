import { Component, OnInit, Input } from '@angular/core';
import { Contato1 } from '../shared/contato1';
import { ContatoService } from '../shared/contato1.service';
import { ContatoDataService } from '../shared/contato1-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-edit1',
  templateUrl: './edit1.component.html',
  styleUrls: ['./edit1.component.scss']
})
export class Edit1Component implements OnInit {
  contato1: Contato1
  key: string = '';
 
  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private nav: NavService) { }
 
  ngOnInit() {
    this.nav.show()
    this.contato1 = new Contato1();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato1 && data.key) {
        this.contato1 = new Contato1();
        this.contato1.BullyName = data.contato1.nome;
        this.contato1.Victim = data.contato1.telefone;
        this.key = data.key;
      }
    })
  }
 
  onSubmit() {
    if (this.key) {
      this.contatoService.update(this.contato1, this.key);
    } else {
      this.contatoService.insert(this.contato1);
    }
 
    this.contato1 = new Contato1();
  }
}