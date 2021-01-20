import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato8 } from './contato8';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato8: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  constructor() { }
 
  changeContato(contato8: Contato8, key: string) {
    this.contatoSource.next({ contato8: contato8, key: key });
  }
}