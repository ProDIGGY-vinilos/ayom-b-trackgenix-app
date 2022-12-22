const SuperAdmin = require('../pageobjects/superadmin.page');
const Login = require('../pageobjects/login.page')

describe('Edit super admin profile', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://ayom-b-trackgenix-app.vercel.app/home")
        browser.setWindowSize(1920, 1080);
    });

    it('Should enter the login form', async () => {
        await Login.loginBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/login');
        await expect(Login.loginImg).toBeDisplayed();
    });

    it('Should login with existent super admin data', async () => {
        await Login.login('montyb@trackgenix.com', 'JBGkgzZbq589');
        await expect(Login.successModal).toBeDisplayed();
        await expect(Login.successModal).toHaveText('Success')
        await Login.modalBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/super-admin/admins')
        await expect(Login.rrLogo).toBeDisplayed();
        await expect(Login.rrLogo).toHaveAttrContaining('src','/static/media/logo.7994c49c.png');
        await expect(Login.userType).toHaveTextContaining('Super Admin');
    });

    it('Should redirect to profile page', async () => {
        await SuperAdmin.profileMenu.click();
        await expect(SuperAdmin.superAProfile).toBeDisplayed();
        await expect(SuperAdmin.superAProfile).toHaveText('Super Admin');
    })

    it('Should redirect to the super admin form', async () => {
        await SuperAdmin.editSABtn.waitForClickable();
        await SuperAdmin.editSABtn.click();
        await expect(SuperAdmin.formTitle).toBeDisplayed();
        await expect(SuperAdmin.formTitle).toHaveText('Edit Super Admin');
    })

    it('Should edit the data', async () => {
        await SuperAdmin.nameInput.setValue('Montgomer');
        await SuperAdmin.saveBtn.click();
        await SuperAdmin.formClose.click();
        await expect(SuperAdmin.successModal).toBeDisplayed();
        await expect(SuperAdmin.successModal).toHaveText('Success');
        await SuperAdmin.successX.waitForClickable();
        await SuperAdmin.successX.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/super-admin/profile');
        await expect(SuperAdmin.nameEdited).toHaveText('Montgomer');
    })

    it('Should edit the data', async () => {
        await SuperAdmin.nameInput.setValue('Montgomery');
        await SuperAdmin.saveBtn.click();
        await SuperAdmin.formClose.click();
        // await expect(SuperAdmin.successModal).toBeDisplayed();
        // await expect(SuperAdmin.successModal).toHaveText('Success');
        // await SuperAdmin.acceptBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/super-admin/profile');
        await expect(SuperAdmin.nameEdited).toHaveText('Montgomery');
    })
})