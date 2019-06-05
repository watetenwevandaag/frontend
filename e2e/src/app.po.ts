import { browser, by, element } from 'protractor';

export class AppPage {
  
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getLoginButton(){
    return element(by.id('pannekoek'));
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
    return element(by.id('registerCompleteButton'));
  }
   
  getLoginCompleteButton(){
    return element(by.id('loginCompleteButton'));
  }

  getUsernameTitle(){
    return element(by.id('usernameTitle'));
  }

  getLoginUsernameField(){
    return element(by.id('loginUsernameForm'));
  }
   
  getLoginPasswordField(){
    return element(by.id('loginPasswordForm'));
  }

  getCreateRecipeButton(){
    return element(by.id('createRecipe'));
  }
  
}
