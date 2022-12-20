class Login {
    get loginBtn () {
        return $('#root > section > div:nth-child(2) > a:nth-child(1)')
    }

    get inputMail () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div:nth-child(1) > div > input[type=text]');
    }

    get inputPassword () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div:nth-child(2) > div > div:nth-child(1) > input[type=password]');
    }

    get btnSubmit () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div.login_buttons__-_5bg > button');
    }

    get loginImg () {
        return $('#root > div > div.login_loginImage__2cc5L');
    }

    get acceptBtn () {
        return $('#root > div > div > form > div:nth-child(4) > div > div > button')
    }

    get emailMsg () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div:nth-child(1) > div > p')
    }

    get passwordMsg () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div:nth-child(2) > div > div:nth-child(1) > p')
    }

    get errorModal () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div.login_buttons__-_5bg > div > div > div')
    }

    get modalBtn () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div.login_buttons__-_5bg > div > div > button')
    }

    get successModal () {
        return $('#root > div > div.login_loginContainer__1LXOv > form > div.login_buttons__-_5bg > div > div > div > h3')
    }

    get rrLogo () {
        return $('#root > div > header > img')
    }

    get userType () {
        return $('#root > div > div > aside > div.sidebar_bottom__3h20X > span')
    }

    get logOutBtn () {
        return $('#root > div > div > aside > div.sidebar_bottom__3h20X > button')
    }

    async login (email, password) {
        await this.inputMail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }
}

module.exports = new Login();
