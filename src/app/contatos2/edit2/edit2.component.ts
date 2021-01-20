import { Component, OnInit, Input } from '@angular/core';
import { Contato2 } from '../shared/contato2';
import { Contato2Service } from '../shared/contato2.service';
import { Contato2DataService } from '../shared/contato2-data.service';
import { NavService } from 'src/app/screens/nav/nav.service'

@Component({
  selector: 'app-edit2',
  templateUrl: './edit2.component.html',
  styleUrls: ['./edit2.component.scss']
})
export class Edit2Component implements OnInit {
  contato2: Contato2
  key: string = '';
  success = false;

  constructor(private contato2Service: Contato2Service, private contato2DataService: Contato2DataService, private nav: NavService) { }

  ngOnInit() {
    this.nav.show()
    this.contato2 = new Contato2();
    this.contato2DataService.currentContato2.subscribe(data => {
      if (data.contato2 && data.key) {
        this.contato2 = new Contato2();
        this.contato2.Qn = data.contato2.Qn;
        this.contato2.Ans = data.contato2.Ans;
        this.key = data.key;
      }
    })
  }
  
  onSubmit() {
    if (this.key) {
      this.contato2Service.update(this.contato2, this.key);
    } else {
      this.contato2Service.insert(this.contato2);
    }

    this.contato2 = new Contato2();
    this.success = true;
  }

}

