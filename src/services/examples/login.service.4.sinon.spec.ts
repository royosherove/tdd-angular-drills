import {CustomLogger} from './custom-logger';
import {LoginService} from './login.service';
import {TestBed} from '@angular/core/testing';
import sinon  from 'sinon';


const replaceInjectedLogger = (logger: CustomLogger) :CustomLogger => {
  TestBed.overrideProvider(CustomLogger, {useValue: logger});
  return TestBed.get(CustomLogger) ;
};

function setupDependencies() {
  TestBed.configureTestingModule({providers: [LoginService, CustomLogger]});
}

describe('login service', () => {
  beforeEach(setupDependencies);
  describe('isLoginOK', () => {
    it('calls the logger', () => {
      const fakeWrite = sinon.fake();
      const mockLog = replaceInjectedLogger({write: fakeWrite});
      const sut = TestBed.get(LoginService);

      sut.isLoginOK('anyuser', 'anypass');

      sinon.assert.calledWithMatch(fakeWrite, 'anyuser');
    });
  });
});
