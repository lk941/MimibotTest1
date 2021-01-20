import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato7 } from './contato7';
 
@Injectable({
  providedIn: 'root'
})
export class ContatoDataService {
  private contatoSource = new BehaviorSubject({ contato7: null, key: '' });
  currentContato = this.contatoSource.asObservable();
 
  constructor() { }
 
  changeContato(contato7: Contato7, key: string) {
    this.contatoSource.next({ contato7: contato7, key: key });
  }
}