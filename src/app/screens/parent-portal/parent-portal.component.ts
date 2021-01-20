import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav/nav.service'
import { ContatoService } from 'src/app/contatos1/shared/contato1.service';


@Component({
  selector: 'app-parent-portal',
  templateUrl: './parent-portal.component.html',
  styleUrls: ['./parent-portal.component.scss']
})
export class ParentPortalComponent implements OnInit {
  // parentPortal: parentPortal
  key: string = "";
  success = false;
  onSubmit;

  constructor(private nav: NavService, private contatoService:ContatoService) { }

  parentListArray = [];

  ngOnInit() {
    this.nav.show()
    
  }

}
