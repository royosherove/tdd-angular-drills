import {CustomLogger} from './custom-logger';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginService{
  private log: CustomLogger;
  constructor(log:CustomLogger) {
    this.log = log;
  }

   isLoginOK = (user:string, pass:string): boolean => {
    this.log.write(`got request to login user ${user}`);
    return false;
  }
}
