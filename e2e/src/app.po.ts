import { browser, by, element } from 'protractor';

export class AppPage {
  
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getLoginButton(){
    return element(by.id('test'));
  }

  getSearchButton(){
    return element(by.id('searchButton'))
  }

  getSearchField(){
    return element(by.css("input[formControlName=name]"))
  }

  getRegisterButton(){
    return element(by.id('registerButton'))
  }

  getRegisterFormFieldPassword(){
    return element(by.css("input[formControlName=password]"));
  }

  getRegisterFormFieldUsername(){
    return element(by.css("input[formControlName=username]"));
  }

  getRegisterFormFieldEmail(){
    return element(by.css("input[formControlName=email]"));
  }

  getRegisterCompleteButton(){
    return element(by.css('.btn-success'));
  }
   
  getLoginCompleteButton(){
    return element(by.css('.btn-success'));
  }

  getUsernameTitle(){
    return element(by.id('usernameTitle')).getText() as Promise<string>;
  }

  getLoginForm(){
    return element(by.id('loginForm'));
  }
   
  getRegisterForm(){
    return element(by.id('registerForm'));
  }
  
}
