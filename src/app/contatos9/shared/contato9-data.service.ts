import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato9 } from './contato9';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato9: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  constructor() { }
 
  changeContato(contato9: Contato9, key: string) {
    this.contatoSource.next({ contato9: contato9, key: key });
  }
}