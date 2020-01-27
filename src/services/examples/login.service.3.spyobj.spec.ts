import {CustomLogger} from './custom-logger';
import {LoginService} from './login.service';
import {TestBed} from '@angular/core/testing';
import stringMatching = jasmine.stringMatching;


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
      const mockLog = replaceInjectedLogger(jasmine.createSpyObj('logger',['write']));
      const sut = TestBed.get(LoginService);

      sut.isLoginOK('anyuser', 'anypass');

      expect(mockLog.write).toHaveBeenCalledWith(stringMatching(/anyuser/));
      //matching is better than :
      // expect(mockLog.write).toHaveBeenCalledWith('got request to login user anyuser');
    });
  });
});
