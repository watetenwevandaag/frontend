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
    page.navigateTo();
    page.getLoginButton().click();
    page.getRegisterButton().click();
    page.getRegisterFormFieldEmail().sendKeys('AutoTestUser')
    page.getRegisterFormFieldUsername().sendKeys('AutoTestUser')
    page.getRegisterFormFieldPassword().sendKeys('AutoTestUser')
    browser.wait(EC.elementToBeClickable(page.getRegisterCompleteButton()),5000);
    page.getRegisterCompleteButton().click();
    browser.wait(EC.presenceOf(page.getLoginPasswordField()),5000);
    page.getLoginPasswordField().sendKeys('AutoTestUser')
    page.getLoginUsernameField().sendKeys('AutoTestUser')
    page.getLoginCompleteButton().click();
    browser.wait(EC.presenceOf(page.getCreateRecipeButton()),10000);
    expect(EC.presenceOf(page.getCreateRecipeButton())).toBeTruthy();
  });

  it('should create recipe with logged in user and get the recipe from own recipes', ()=>{
    page.navigateTo();
    page.getLoginButton().click();
    page.getRegisterButton().click();
    page.getRegisterFormFieldEmail().sendKeys('AutoTestCreate')
    page.getRegisterFormFieldUsername().sendKeys('AutoTestCreate')
    page.getRegisterFormFieldPassword().sendKeys('AutoTestCreate')
    browser.wait(EC.elementToBeClickable(page.getRegisterCompleteButton()),5000);
    page.getRegisterCompleteButton().click();
    browser.wait(EC.presenceOf(page.getLoginPasswordField()),5000);
    page.getLoginPasswordField().sendKeys('AutoTestCreate')
    page.getLoginUsernameField().sendKeys('AutoTestCreate')
    browser.wait(EC.elementToBeClickable(page.getLoginCompleteButton()),5000);
    page.getLoginCompleteButton().click();
    browser.wait(EC.presenceOf(page.getCreateRecipeButton()),10000);
    page.getCreateRecipeButton().click();
    browser.wait(EC.presenceOf(page.getRecipeCreateFieldCookingTime()),5000);
    page.getRecipeCreateFieldCookingTime().sendKeys(121221)
    page.getRecipeCreateFieldName().sendKeys('Lekker Recept')
    page.getRecipeCreateFieldPeople().sendKeys(4);
    page.getRecipeCreateFieldDesc().sendKeys('Een lekker recept!')
    browser.wait(EC.elementToBeClickable(page.getRecipeCreateFinishButton()),5000);
    page.getRecipeCreateFinishButton().click();
    browser.wait(EC.presenceOf(page.getOwnRecipes()),10000);
    page.getOwnRecipes().click();
    browser.wait(EC.presenceOf(page.getRecipeDesc().get(0)),5000);
    expect(page.getRecipeDesc().get(0).getText()).toEqual('Een lekker recept!')
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
