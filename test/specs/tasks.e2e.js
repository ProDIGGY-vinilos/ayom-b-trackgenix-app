const Login = require('../pageobjects/login.page');
const Task = require('../pageobjects/tasks.page');

describe('Tasks form', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://ayom-b-trackgenix-9y4wutajt-basp-a2022.vercel.app/home")
        browser.setWindowSize(1920, 1080);
    });

    it('should login with valid credentials', async () => {
        await Login.loginBtn.click();
        await Login.login('ezkilgod0@army.mil', 'NzxSNoaUHu55');
        await Login.acceptBtn.click();
        await expect(Login.rrLogo).toBeDisplayed();
    });

    it('Should redirect to Tasks list', async () => {
        await Task.taskBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-9y4wutajt-basp-a2022.vercel.app/admin/tasks');
        await expect(Task.taskTable).toBeDisplayed();
    })

    it('Should not add task with empty field', async () => {
        await Task.addTaskBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-9y4wutajt-basp-a2022.vercel.app/admin/task-form');
        await expect(Task.taskTextarea).toBeDisplayed();
        await Task.fillForm('');
        await expect(Task.textareaMsg).toBeDisplayed();
        await expect(Task.textareaMsg).toHaveText('Description cannot be an empty field');
    })

    // it('Should create a new task', async () => {
    //     await Task.fillForm('This is for testing purposes');
    //     await Task.successModalBtn.click();
        // await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/admin/tasks');
    //     await expect(Task.newTask).toBeDisplayed();
    //     await expect(Task.newTaskText).toHaveText('This is for testing purposes');
    // })

    // it('Should edit a task', async () => {
    //     await Task.editBtn.click();
        // await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/admin/task-form/')
        // await Task.taskTextarea.clearValue();
        // await Task.fillForm('This is also for testing purposes')
        // await Task.successModalBtn.click();
        // await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/admin/tasks');
    //     await expect(Task.newTaskText).toHaveText('This is also for testing purposes');
    // })

    // it('Should delete a task', async () => {
    //     await Task.deleteBtn.clearValue();
    //     await Task.cancelDelete.click();
    //     await expect(Task.taskTable).toBeDisplayed();
    //     await Task.confirmDelete.click();
    //     await expect(Task.modalSuccessHeader).toHaveText('Success');
    //     await Task.modalSuccessAcceptBtn.click();
    //     await expect(Task.taskTable).toBeDisplayed()
    // })


});