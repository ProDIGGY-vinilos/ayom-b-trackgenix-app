class Signup {
    get signupBtn () {
        return $('#root > section > div:nth-child(2) > a:nth-child(2)');
    }

    get signupImg () {
        return $('#root > div > div.signup_imgForm__1-Lsp');
    }

    get nameInput () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div.signup_formNameLast__12Can > div:nth-child(1) > div > input[type=text]');
    }

    get lastNameInput () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div.signup_formNameLast__12Can > div:nth-child(2) > div > input[type=text]');
    }

    get emailInput () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(3) > div > input[type=mail]');
    }

    get phoneInput () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(4) > div > input[type=number]');
    }

    get passwordInput () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(5) > div > input[type=password]');
    }

    get submitBtn () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div.signup_divBtn__N7YIC > button.button_squaredPrimary2__3AXKG')
    }

    get nameMsg () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div.signup_formNameLast__12Can > div:nth-child(1) > div > p');
    }

    get lastNameMsg () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div.signup_formNameLast__12Can > div:nth-child(2) > div > p');
    }

    get emailMsg () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(3) > div > p');
    }

    get phoneMsg () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(4) > div > p');
    }

    get passwordMsg () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(5) > div > p');
    }

    get successModal () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(6) > div > div > div > h3');
    }

    get modalBtn () {
        return $('#root > div > div.signup_divForm__2hwCg > form > div:nth-child(6) > div > div > button')
    }

    async signup (name, lastName, email, phone, password) {
        await this.nameInput.setValue(name);
        await this.lastNameInput.setValue(lastName);
        await this.emailInput.setValue(email);
        await this.phoneInput.setValue(phone);
        await this.passwordInput.setValue(password);
    }
}

module.exports = new Signup();
