import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  var EC = browser.ExpectedConditions;

  beforeEach(() => {
    browser.ignoreSynchronization = true;
    page = new AppPage();
  });

  it('should display login button', () => {
    page.navigateTo();
    expect(page.getLoginButton().getText()).toEqual('Login!');
  });

  it('should display search button', () => {
    page.navigateTo();
    expect(page.getSearchButton().getText()).toEqual('Zoek!');
  });

  it('should display search input', () => {
    page.navigateTo();
    expect(page.getSearchField().getText()).toEqual('');
  });

  it('should create account and login', () => {
    var i = 1;
    page.navigateTo();
    page.getLoginButton().click();
    page.getRegisterButton().click();
    page.getRegisterFormFieldEmail().sendKeys('AutoTestUser'+i)
    page.getRegisterFormFieldUsername().sendKeys('AutoTestUser'+i)
    page.getRegisterFormFieldPassword().sendKeys('AutoTestUser'+i)
    browser.wait(EC.elementToBeClickable(page.getRegisterCompleteButton()),5000);
    page.getRegisterCompleteButton().click();
    browser.wait(EC.presenceOf(page.getLoginPasswordField()),5000);
    expect(page.getLoginPasswordField().getText()).toEqual('')
    page.getLoginPasswordField().sendKeys('AutoTestUser'+i)
    page.getLoginUsernameField().sendKeys('AutoTestUser'+i)
    page.getLoginCompleteButton().click();
    browser.wait(EC.presenceOf(page.getCreateRecipeButton()),10000);
    expect(EC.presenceOf(page.getCreateRecipeButton())).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
