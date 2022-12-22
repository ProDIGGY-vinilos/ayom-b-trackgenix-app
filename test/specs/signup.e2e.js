const Signup = require('../pageobjects/signup.page');

describe('TG Signup', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://ayom-b-trackgenix-app.vercel.app/home")
        browser.setWindowSize(1920, 1080);
    });

    it('Should enter the signup form', async () => {
        await Signup.signupBtn.click();
        await expect(browser).toHaveUrl('https://ayom-b-trackgenix-app.vercel.app/sign-up');
        await expect(Signup.signupImg).toBeDisplayed();
    });

    it('Should not login with empty fields', async () => {
        await Signup.signup('', '', '', '', '');
        await Signup.submitBtn.click();
        await expect(Signup.nameMsg).toBeDisplayed();
        await expect(Signup.nameMsg).toHaveText('Name cannot be an empty field');
        await expect(Signup.lastNameMsg).toBeDisplayed();
        await expect(Signup.lastNameMsg).toHaveText('Last Name cannot be an empty field');
        await expect(Signup.emailMsg).toBeDisplayed();
        await expect(Signup.emailMsg).toHaveText('Email cannot be an empty field');
        await expect(Signup.phoneMsg).toBeDisplayed();
        await expect(Signup.phoneMsg).toHaveText('Phone cannot be an empty field');
        await expect(Signup.passwordMsg).toBeDisplayed();
        await expect(Signup.passwordMsg).toHaveText('Password cannot be an empty field');
    });

    it('Should not be able to create a user with invalid name format', async () => {
        await Signup.nameInput.setValue('sh');
        await expect(Signup.nameMsg).toBeDisplayed();
        await expect(Signup.nameMsg).toHaveText('Name must be at least 3 characters long');
        await Signup.nameInput.setValue('1234');
        await expect(Signup.nameMsg).toBeDisplayed();
        await expect(Signup.nameMsg).toHaveText('Name must be of type text');
        await Signup.nameInput.setValue('+-/*');
        await expect(Signup.nameMsg).toBeDisplayed();
        await expect(Signup.nameMsg).toHaveText('Name cannot contain special characters');
    })

    it('Should not be able to create a user with invalid last name format', async () => {
        await Signup.lastNameInput.setValue('sh');
        await expect(Signup.lastNameMsg).toBeDisplayed();
        await expect(Signup.lastNameMsg).toHaveText('Last Name must be at least 3 characters long');
        await Signup.lastNameInput.setValue('1234');
        await expect(Signup.lastNameMsg).toBeDisplayed();
        await expect(Signup.lastNameMsg).toHaveText('Last Name must be of type text');
        await Signup.lastNameInput.setValue('+-/*');
        await expect(Signup.lastNameMsg).toBeDisplayed();
        await expect(Signup.lastNameMsg).toHaveText('Last Name cannot contain special characters');
    })

    it('Should not be able to create a user with invalid email format', async () => {
        await Signup.emailInput.setValue('invalid@mailcom');
        await expect(Signup.emailMsg).toBeDisplayed();
        await expect(Signup.emailMsg).toHaveText('Invalid email format');
    });

    it('Should not be able to create a user with short or long phone number', async () => {
        await Signup.phoneInput.setValue('1234');
        await expect(Signup.phoneMsg).toBeDisplayed();
        await expect(Signup.phoneMsg).toHaveText('Phone must be 10 characters long');
        await Signup.phoneInput.setValue('123413241234');
        await expect(Signup.phoneMsg).toBeDisplayed();
        await expect(Signup.phoneMsg).toHaveText('Phone must be 10 characters long');
    });

    it('Should not be able to create a user with short password', async () => {
        await Signup.passwordInput.setValue('invalid');
        await expect(Signup.passwordMsg).toBeDisplayed();
        await expect(Signup.passwordMsg).toHaveText('Password must be at least 8 characters long');
    });

    it('Should not be able to create a user with password containing only numbers', async () => {
        await Signup.passwordInput.setValue('12345678');
        await expect(Signup.passwordMsg).toBeDisplayed();
        await expect(Signup.passwordMsg).toHaveText('Password must be of type text and number');
    });

    it('Should not be able to create a user with password containing only special characters', async () => {
        await Signup.passwordInput.setValue('+-/*+-/*');
        await expect(Signup.passwordMsg).toBeDisplayed();
        await expect(Signup.passwordMsg).toHaveText('Password cannot contain special characters');
    });

    it('Should successfully create an employee with valid inputs', async () => {
        await Signup.signup('testEmployee', 'testEmployee', 'newwemployee@tester.com', '1234567890', 'abcd1234');
        await Signup.submitBtn.click();
        await expect(Signup.successModal).toBeDisplayed();
        await expect(Signup.successModal).toHaveText('Success');
        await Signup.modalBtn.click();
        await expect(browser).toHaveUrlContaining('https://ayom-b-trackgenix-app.vercel.app/login');
    })
});
