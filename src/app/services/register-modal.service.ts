import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterModalService {
  public registerModalStatus = new BehaviorSubject<boolean>(false);
  currentRegisterModalStatus = this.registerModalStatus.asObservable();

  constructor() { }

  changeRegisterModalStatus(status: boolean) {
    this.registerModalStatus.next(status);
  }
}
