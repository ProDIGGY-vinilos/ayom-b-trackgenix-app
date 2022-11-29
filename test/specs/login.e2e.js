const Login = require('../pageobjects/login.page');
const Admin = require('../pageobjects/tasks.page');

describe('TG Login', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://ayom-b-trackgenix-app.vercel.app/home")
        browser.setWindowSize(1920, 1080);
    });

    it('Should not login with empty fields', async () => {
        await Login.loginBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/login');
        await Login.login('', '');
        await expect(Login.emailMsg).toBeDisplayed();
        await expect(Login.emailMsg).toHaveText('Email cannot be an empty field')
        await expect(Login.passwordMsg).toBeDisplayed();
        await expect(Login.passwordMsg).toHaveText('Password cannot be an empty field')
        await Login.btnBack.click();
    })

    it('should login with valid credentials', async () => {
        await Login.loginBtn.click();
        await Login.login('ezkilgod0@army.mil', 'NzxSNoaUHu55');
        await Login.acceptBtn.click();
        await expect(Login.rrLogo).toBeDisplayed();
    });
});


