import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato6 } from './contato6';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato6: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  constructor() { }
 
  changeContato(contato6: Contato6, key: string) {
    this.contatoSource.next({ contato6: contato6, key: key });
  }
}