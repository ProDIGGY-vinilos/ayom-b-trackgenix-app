class Login {
    get loginBtn () {
        return $('#root > section > div:nth-child(2) > a:nth-child(1)')
    }

    get inputMail () {
        return $('#root > div > div > form > div:nth-child(1) > div > input[type=text]');
    }

    get inputPassword () {
        return $('#root > div > div > form > div:nth-child(2) > div > input[type=password]');
    }

    get btnSubmit () {
        return $('#root > div > div > form > div:nth-child(4) > button:nth-child(2)');
    }

    get btnBack () {
        return $('#root > div > div > form > div:nth-child(4) > button:nth-child(1)')
    }

    get acceptBtn () {
        return $('#root > div > div > form > div:nth-child(4) > div > div > button')
    }

    get emailMsg () {
        return $('#root > div > div > form > div:nth-child(1) > div > p')
    }

    get passwordMsg () {
        return $('#root > div > div > form > div:nth-child(2) > div > p')
    }

    get rrLogo () {
        return $('#root > div > header > img')
    }

    async login (username, password) {
        await this.inputMail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

module.exports = new Login();
