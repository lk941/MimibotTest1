import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato1 } from './contato1';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato1: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  constructor() { }
 
  changeContato(contato1: Contato1, key: string) {
    this.contatoSource.next({ contato1: contato1, key: key });
  }
}