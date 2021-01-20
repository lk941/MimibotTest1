import { Component, OnInit } from '@angular/core';
import { Contato3 } from '../shared/contato3';
import { Contato3Service } from '../shared/contato3.service';
import { Contato3DataService } from '../shared/contato3-data.service';
import {NavService} from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-edit3',
  templateUrl: './edit3.component.html',
  styleUrls: ['./edit3.component.scss']
})
export class Edit3Component implements OnInit {
  contato3: Contato3
  key: string = '';
  success = false;

  constructor(private contato3Service: Contato3Service, private contato3DataService: Contato3DataService, private nav: NavService) { }

  ngOnInit() {
    this.nav.show()
    this.contato3 = new Contato3();
    this.contato3DataService.currentContato3.subscribe(data => {
      if (data.contato3 && data.key) {
        this.contato3 = new Contato3();
        this.contato3.Qn = data.contato3.Qn;
        this.contato3.Ans = data.contato3.Ans;
        this.key = data.key;
      }
    })
  }

  onSubmit() {
    if (this.key) {
      this.contato3Service.update(this.contato3, this.key);
    } else {
      this.contato3Service.insert(this.contato3);
    }

    this.contato3 = new Contato3();
    this.success = true;
  }

}

