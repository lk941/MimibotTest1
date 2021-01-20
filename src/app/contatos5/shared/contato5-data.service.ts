import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato5 } from './contato5';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato5: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  constructor() { }
 
  changeContato(contato5: Contato5, key: string) {
    this.contatoSource.next({ contato5: contato5, key: key });
  }
}