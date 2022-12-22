const SuperAdmin = require('../pageobjects/superadmin.page');
const Login = require('../pageobjects/login.page')

describe('Create admin by super admin', () => {
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
        await Login.login('supergodmin0@ihg.com', 'JBGkgzZbq589');
        await expect(Login.successModal).toBeDisplayed();
        await expect(Login.successModal).toHaveText('Success')
        await Login.modalBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/super-admin/admins')
        await expect(Login.rrLogo).toBeDisplayed();
        await expect(Login.rrLogo).toHaveAttrContaining('src','/static/media/logo.7994c49c.png');
        await expect(Login.userType).toHaveTextContaining('Super Admin');
    });

    it('Should open the "Add admin" form', async () => {
        await SuperAdmin.addAdminBtn.waitForClickable();
        await SuperAdmin.addAdminBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/super-admin/admin-form');
        await expect(SuperAdmin.addAdminForm).toBeDisplayed();
    })

    it('Should not create an admin with empty fields', async () => {
        await SuperAdmin.addAdmin('', '', '', '');
        await SuperAdmin.saveBtn.click();
        await expect(SuperAdmin.nameMsg).toBeDisplayed();
        await expect(SuperAdmin.nameMsg).toHaveText('Name cannot be an empty field');
        await expect(SuperAdmin.lastNameMsg).toBeDisplayed();
        await expect(SuperAdmin.lastNameMsg).toHaveText('Last Name cannot be an empty field');
        await expect(SuperAdmin.emailMsg).toBeDisplayed();
        await expect(SuperAdmin.emailMsg).toHaveText('Email cannot be an empty field');
        await expect(SuperAdmin.passwordMsg).toBeDisplayed();
        await expect(SuperAdmin.passwordMsg).toHaveText('Password cannot be an empty field');
    })

    it('Fields cannot be completed with only numbers', async () => {
        await SuperAdmin.nameInput.setValue('1234');
        await SuperAdmin.lastNameInput.setValue('4567');
        await expect(SuperAdmin.nameMsg).toBeDisplayed();
        await expect(SuperAdmin.nameMsg).toHaveText('Name must be of type text');
        await expect(SuperAdmin.lastNameMsg).toBeDisplayed();
        await expect(SuperAdmin.lastNameMsg).toHaveText('Last Name must be of type text');
    })

    it('Should not be able to create an admin with invalid email format', async () => {
        await SuperAdmin.emailInput.setValue('invalid@mailcom');
        await expect(SuperAdmin.emailMsg).toBeDisplayed();
        await expect(SuperAdmin.emailMsg).toHaveText('Invalid email format');
    });

    it('Should not be able to create an admin with short password', async () => {
        await SuperAdmin.passwordInput.setValue('invalid');
        await expect(SuperAdmin.passwordMsg).toBeDisplayed();
        await expect(SuperAdmin.passwordMsg).toHaveText('Password must be at least 8 characters long');
    });

    it('Should not be able to create an admin with password containing only special characters', async () => {
        await SuperAdmin.passwordInput.setValue('+-/*+-/*');
        await expect(SuperAdmin.passwordMsg).toBeDisplayed();
        await expect(SuperAdmin.passwordMsg).toHaveText('Password cannot contain special characters');
    });

    it('Should create an admin', async () => {
        await SuperAdmin.addAdmin('TestAdmin', 'TestAdmin', 'newadmin@test.com', 'abcd1234');
        await SuperAdmin.saveBtn.click();
        await expect(SuperAdmin.successModal).toBeDisplayed();
        await expect(SuperAdmin.successModal).toHaveText('Success');
        await SuperAdmin.acceptBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/super-admin/admins');
        //await expect(SuperAdmin.adminCreated).toHaveText('TestAdmin');
    })

    it('Should edit an admin', async () => {
        await SuperAdmin.editBtn.waitForClickable();
        await SuperAdmin.editBtn.click();
        await expect(SuperAdmin.formTitle).toHaveText('EDIT ADMIN')
        await SuperAdmin.nameInput.setValue('TestNameEdit');
        await SuperAdmin.saveBtn.click();
        await expect(SuperAdmin.successModal).toBeDisplayed();
        await expect(SuperAdmin.successModal).toHaveText('Success');
        await SuperAdmin.acceptBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/super-admin/admins');
        //await expect(SuperAdmin.adminCreated).toHaveText('TestNameEdit');
    })

    it('Should delete an admin', async () => {
        await SuperAdmin.deleteBtn.waitForClickable()
        await SuperAdmin.deleteBtn.click();
        await expect(SuperAdmin.deleteModal).toBeDisplayed();
        await expect(SuperAdmin.deleteModal).toHaveText('DELETE');
        await SuperAdmin.confirmDeleteBtn.click();
        await expect(SuperAdmin.successDeleteModal).toBeDisplayed();
        await expect(SuperAdmin.successDeleteModal).toHaveText('Success');
        await SuperAdmin.acceptDelete.click();
    })
})