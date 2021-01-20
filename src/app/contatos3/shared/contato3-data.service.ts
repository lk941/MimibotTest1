import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contato3 } from './contato3';

@Injectable({
  providedIn: 'root'
})
export class Contato3DataService {
  private contato3Source = new BehaviorSubject({ contato3: null, key: '' });
  currentContato3 = this.contato3Source.asObservable();

  constructor() { }

  changeContato3(contato3: Contato3, key: string) {
    this.contato3Source.next({ contato3: contato3, key: key });
  }
}
