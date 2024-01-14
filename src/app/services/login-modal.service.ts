import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService {
  public loginModalStatus = new BehaviorSubject<boolean>(false);
  currentLoginModalStatus = this.loginModalStatus.asObservable();

  constructor() { }

  changeLoginModalStatus(status: boolean) {
    this.loginModalStatus.next(status);
  }
}
