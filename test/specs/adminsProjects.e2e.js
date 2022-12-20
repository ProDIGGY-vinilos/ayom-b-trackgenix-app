const adminPage = require('../pageobjects/admin.page');
const Admin = require('../pageobjects/admin.page')
const Login = require('../pageobjects/login.page')

describe('Manage projects by admin', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://ayom-b-trackgenix-app.vercel.app/home")
        browser.setWindowSize(1920, 1080);
    });

    it('Should enter the login form', async () => {
        await Login.loginBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/login');
        await expect(Login.loginImg).toBeDisplayed();
    });

    it('Should login with existent admin data', async () => {
        await Login.login('lanuevaShopie@gmail.com', 'asdf1234');
        await expect(Login.successModal).toBeDisplayed();
        await expect(Login.successModal).toHaveText('Success')
        await Login.modalBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/admin/projects')
        await expect(Login.rrLogo).toBeDisplayed();
        await expect(Login.rrLogo).toHaveAttrContaining('src','/static/media/logo.7994c49c.png');
        await expect(Login.userType).toHaveTextContaining('Admin');
    });

    it('Should redirect to the "Add project" form', async () => {
        await Admin.addProjectBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/admin/project-form');
    })

    it('Should not create a project with empty fields', async () => {
        await Admin.addProject('', '', '', '', '');
        await Admin.saveBtn.click();
        await expect(Admin.modal).toBeDisplayed();
        await expect(Admin.modal).toHaveText('Add New Project')
        await Admin.modalConfirmBtn.click();
        await expect(Admin.projectMsg).toBeDisplayed();
        await expect(Admin.projectMsg).toHaveText('Project name is required');
        await expect(Admin.clientMsg).toBeDisplayed();
        await expect(Admin.clientMsg).toHaveText('Client cannot be an empty field');
        await expect(Admin.descriptionMsg).toBeDisplayed();
        await expect(Admin.descriptionMsg).toHaveText('Description cannot be an empty field');
        await expect(Admin.startDateMsg).toBeDisplayed();
        await expect(Admin.startDateMsg).toHaveText('Start date is required');
        await expect(Admin.endDateMsg).toBeDisplayed();
        await expect(Admin.endDateMsg).toHaveText('End date is required');
    });

    it('Fields cannot be completed with only numbers', async () => {
        await Admin.projectNameInput.setValue('1234');
        await Admin.clientNameInput.setValue('4567');
        await Admin.descriptionInput.setValue('123456');
        await expect(Admin.projectMsg).toBeDisplayed();
        await expect(Admin.projectMsg).toHaveText('Project name must be at least 1 letter');
        await expect(Admin.clientMsg).toBeDisplayed();
        await expect(Admin.clientMsg).toHaveText('Client name must be at least 1 letter');
        await expect(Admin.descriptionMsg).toBeDisplayed();
        await expect(Admin.descriptionMsg).toHaveText('Description must be at least 1 letter');
    })

    it('Start date cannot be later than "End date"', async () => {
        await Admin.startDate.setValue('31/12/2021');
        await Admin.endDate.setValue('30/12/2021');
        await expect(Admin.endDateMsg).toBeDisplayed();
        await expect(Admin.endDateMsg).toHaveText('End date must be later than start date');
    })

    it('Should open options to add employees to the project', async () => {
        await Admin.appendBtn.click();
        await expect(Admin.rateInput).toBeDisplayed();
        await expect(Admin.removeBtn).toBeDisplayed();
    })

    it('Should create a project', async () => {
        await Admin.addProject('TestName', 'TestName', 'This is for testing purposes', '30/12/2021', '31/12/2021');
        await Admin.rateInput.setValue('5');
        await Admin.saveBtn.click();
        await expect(Admin.addProjectModal).toBeDisplayed();
        await expect(Admin.addProjectModal).toHaveText('Add New Project');
        await Admin.confirmBtn.click();
        await expect(Admin.successModal).toBeDisplayed();
        await expect(Admin.successModal).toHaveText('Success')
        await Admin.successConfirm.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/admin/projects');
        await expect(Admin.projectCreated).toHaveText('TestName');
    })

    it('Should edit a project', async () => {
        await Admin.editBtn.click();
        await expect(Admin.formTitle).toHaveText('Edit Project')
        await Admin.projectNameInput.setValue('TestNameEdit');
        await Admin.saveBtn.click();
        await expect(Admin.addProjectModal).toBeDisplayed();
        await expect(Admin.addProjectModal).toHaveText('Update Project');
        await Admin.confirmBtn.click();
        await expect(Admin.successModal).toHaveText('Success')
        await Admin.successConfirm.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/admin/projects');
        await expect(Admin.projectCreated).toHaveText('TestNameEdit');
    })

    it('Should delete a project', async () => {
        await Admin.deleteBtn.click();
        await expect(Admin.deleteModal).toBeDisplayed();
        await expect(Admin.deleteModal).toHaveText('DELETE');
        await Admin.confirmDelete.click();
        await expect(Admin.successDeleteModal).toBeDisplayed();
        await expect(Admin.successDeleteModal).toHaveText('Success');
        await Admin.acceptDelete.click();
    })
})