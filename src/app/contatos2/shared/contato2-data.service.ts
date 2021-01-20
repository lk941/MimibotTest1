import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato2 } from './contato2';

@Injectable({
  providedIn: 'root'
})
export class Contato2DataService {
  private contato2Source = new BehaviorSubject({ contato2: null, key: '' });
  currentContato2 = this.contato2Source.asObservable();

  constructor() { }

  changeContato2(contato2: Contato2, key: string) {
    this.contato2Source.next({ contato2: contato2, key: key });
  }
}
