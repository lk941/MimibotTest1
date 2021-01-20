import { Component, OnInit, Input } from '@angular/core';
import { Contato7 } from '../shared/contato7';
import { ContatoService } from '../shared/contato7.service';
import { ContatoDataService } from '../shared/contato7-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'
 
@Component({
  selector: 'app-edit7',
  templateUrl: './edit7.component.html',
  styleUrls: ['./edit7.component.scss']
})
export class Edit7Component implements OnInit {
  contato7: Contato7
  key: string = '';
 
  constructor(private contatoService: 
  
  ContatoService, private contatoDataService: ContatoDataService, private nav: NavService) { }
 
  ngOnInit() {
    this.nav.show()
    this.contato7 = new Contato7();
    this.contatoDataService.currentContato.subscribe(data => {
      if (data.contato7 && data.key) {
        this.contato7 = new Contato7();
        // this.contato7.date = data.contato7.nome;
        this.contato7.Total = data.contato7.telefone;
        this.key = data.key;
      }
    })
  }
 
  onSubmit() {
    if (this.key) {
      this.contatoService.update(this.contato7, this.key);
    } else {
      this.contatoService.insert(this.contato7);
    }
 
    this.contato7 = new Contato7();
  }
}