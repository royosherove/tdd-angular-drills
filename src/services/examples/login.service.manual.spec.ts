import {CustomLogger} from './custom-logger';
import {LoginService} from './login.service';

class FakeLogger implements CustomLogger{
  written: string;
  write(text: string): void {
    this.written = text;
  }

}
describe('login service', () => {
  describe('isLoginOK', () => {
    it('calls the logger', () => {
      const mockLog = new FakeLogger();
      const sut = new LoginService(mockLog);

      sut.isLoginOK('anyuser', 'anypass');

      expect(mockLog.written).toContain('got request to login user anyuser');
    });
  });
});
