import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

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

  it('should create account', () => {
    page.navigateTo();
    page.getLoginButton().click();
    browser.wait(browser.ExpectedConditions.presenceOf(page.getRegisterButton()), 10000)
    page.getRegisterButton().click();
    page.getRegisterFormFieldEmail().sendKeys('AutoTestUser')
    page.getRegisterFormFieldUsername().sendKeys('AutoTestUser')
    page.getRegisterFormFieldPassword().sendKeys('AutoTestUser')
    page.getRegisterCompleteButton().click();
    page.getRegisterFormFieldUsername().sendKeys('AutoTestUser')
    page.getRegisterFormFieldPassword().sendKeys('AutoTestUser')
    page.getRegisterForm().submit();
    expect(page.getUsernameTitle()).toEqual('AutoTestUser');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
