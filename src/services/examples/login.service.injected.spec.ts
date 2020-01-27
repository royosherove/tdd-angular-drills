import {CustomLogger} from './custom-logger';
import {LoginService} from './login.service';
import {TestBed} from '@angular/core/testing';

class FakeLogger implements CustomLogger{
  written: string;
  write(text: string): void {
    this.written = text;
  }

}

const replaceInjectedLogger = (logger: CustomLogger) => {
  TestBed.overrideProvider(CustomLogger, {useValue: logger});
  return TestBed.get(CustomLogger) as FakeLogger;
};

function setupDependencies() {
  TestBed.configureTestingModule({providers: [LoginService, CustomLogger]});
}

describe('login service', () => { beforeEach(setupDependencies);
  describe('isLoginOK', () => {
    it('calls the logger', () => {
      const mockLog = replaceInjectedLogger(new FakeLogger());
      const sut = TestBed.get(LoginService);

      sut.isLoginOK('anyuser', 'anypass');

      expect(mockLog.written).toContain('got request to login user anyuser');
    });
  });
});
