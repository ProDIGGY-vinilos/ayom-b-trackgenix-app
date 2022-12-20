const Login = require('../pageobjects/login.page');

describe('TG Login', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://ayom-b-trackgenix-app.vercel.app/home")
        browser.setWindowSize(1920, 1080);
    });

    it('Should enter the login form', async () => {
        await Login.loginBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/login');
        await expect(Login.loginImg).toBeDisplayed();
    });

    it('Should not login with empty fields', async () => {
        await Login.login('', '');
        await expect(Login.emailMsg).toBeDisplayed();
        await expect(Login.emailMsg).toHaveText('Email cannot be an empty field');
        await expect(Login.passwordMsg).toBeDisplayed();
        await expect(Login.passwordMsg).toHaveText('Password cannot be an empty field');
    });

    it('Should not login with valid email and empty password', async () => {
        await Login.login('lanuevaShopie@gmail.com', '');
        await expect(Login.passwordMsg).toBeDisplayed();
        await expect(Login.passwordMsg).toHaveText('Password cannot be an empty field');
    });

    it('Should not login with empty email and valid password', async () => {
        await Login.login('', 'asdf1234');
        await expect(Login.emailMsg).toBeDisplayed();
        await expect(Login.emailMsg).toHaveText('Email cannot be an empty field');
    });

    it('Should not login with invalid email format', async () => {
        await Login.login('invalid@mailcom', 'asdf1234');
        await expect(Login.emailMsg).toBeDisplayed();
        await expect(Login.emailMsg).toHaveText('Invalid email format');
    });

    it('Should not login with short password', async () => {
        await Login.login('invalid@mail.com', 'invalid');
        await expect(Login.passwordMsg).toBeDisplayed();
        await expect(Login.passwordMsg).toHaveText('Password must be at least 8 characters long');
    });

    it('Should not login with password containing only numbers', async () => {
        await Login.login('invalid@mail.com', '12345678');
        await expect(Login.passwordMsg).toBeDisplayed();
        await expect(Login.passwordMsg).toHaveText('Password must be of type text and number');
    });

    it('Should not login with password containing only special characters', async () => {
        await Login.login('invalid@mail.com', '+-/*+-/*');
        await expect(Login.passwordMsg).toBeDisplayed();
        await expect(Login.passwordMsg).toHaveText('Password cannot contain special characters');
    });

    it('Should not login with non-existent user data', async () => {
        await Login.login('random@test.com', 'abcd1234');
        await expect(Login.errorModal).toBeDisplayed();
        await Login.modalBtn.click();
    });

    it('Should login with existent employee data', async () => {
        await Login.login('cristiangerster@gmail.com', 'asdasd12');
        await expect(Login.successModal).toBeDisplayed();
        await expect(Login.successModal).toHaveText('Success')
        await Login.modalBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/employee/projects')
        await expect(Login.rrLogo).toBeDisplayed();
        await expect(Login.rrLogo).toHaveAttrContaining('src','/static/media/logo.7994c49c.png');
        await expect(Login.userType).toHaveTextContaining('Employee');
        await Login.logOutBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/home');
    });

    it('Should login with existent admin data', async () => {
        await Login.loginBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/login');
        await expect(Login.loginImg).toBeDisplayed();
        await Login.login('lanuevaShopie@gmail.com', 'asdf1234');
        await expect(Login.successModal).toBeDisplayed();
        await expect(Login.successModal).toHaveText('Success')
        await Login.modalBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/admin/projects')
        await expect(Login.rrLogo).toBeDisplayed();
        await expect(Login.rrLogo).toHaveAttrContaining('src','/static/media/logo.7994c49c.png');
        await expect(Login.userType).toHaveTextContaining('Admin');
        await Login.logOutBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/home');
    });

    it('Should login with existent super admin data', async () => {
        await Login.loginBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/login');
        await expect(Login.loginImg).toBeDisplayed();
        await Login.login('supergodmin0@ihg.com', 'JBGkgzZbq589');
        await expect(Login.successModal).toBeDisplayed();
        await expect(Login.successModal).toHaveText('Success')
        await Login.modalBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/super-admin/admins')
        await expect(Login.rrLogo).toBeDisplayed();
        await expect(Login.rrLogo).toHaveAttrContaining('src','/static/media/logo.7994c49c.png');
        await expect(Login.userType).toHaveTextContaining('Super Admin');
        await Login.logOutBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/home');
    });
});


