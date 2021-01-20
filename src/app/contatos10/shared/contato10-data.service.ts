import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato10 } from './contato10';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato10: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  constructor() { }
 
  changeContato(contato10: Contato10, key: string) {
    this.contatoSource.next({ contato10: contato10, key: key });
  }
}