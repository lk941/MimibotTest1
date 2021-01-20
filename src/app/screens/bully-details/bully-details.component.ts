import { Contato1 } from 'src/app/contatos1/shared/contato1';
import { Component, OnInit } from '@angular/core';
import { ContatoService } from 'src/app/contatos1/shared/contato1.service';
import { Observable } from 'rxjs';
import { ContatoDataService } from 'src/app/contatos1/shared/contato1-data.service';
import { Router, Params } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {NavService} from '../nav/nav.service'

@Component({
    selector: 'app-bully-details',
    templateUrl: './bully-details.component.html',
    styleUrls: ['./bully-details.component.scss']
  })

  export class BullyDetailsComponent implements OnInit {

    constructor(
        private contatoService: ContatoService, 
        private contatoDataService: ContatoDataService, 
        private router: Router, 
        private route: ActivatedRoute,
        private nav: NavService
        ) { }
    contatos1: Observable<any>;
    bullyId: string;
    bullyDetails: any;

    ngOnInit() {
      this.nav.hide()
        // this.contatos1 = this.contatoService.getAll()
        this.route.params.forEach((urlParameters) => {
            this.bullyId = urlParameters['id'];
          });
        this.bullyDetails = this.contatoService.getBullyById(this.bullyId);
        console.log(JSON.stringify(this.bullyDetails))
    }
  }