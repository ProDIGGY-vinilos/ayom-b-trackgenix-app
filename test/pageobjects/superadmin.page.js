class Superadmin {
    get addAdminBtn () {
        return $('#root > div > div > section > button');
    }

    get addAdminForm () {
        return $('#root > div > div > form');
    }

    get saveBtn () {
        return $('#root > div > div > form > button');
    }

    get nameInput () {
        return $('#root > div > div > form > div:nth-child(2) > div > input[type=text]');
    }

    get lastNameInput () {
        return $('#root > div > div > form > div:nth-child(3) > div > input[type=text]');
    }

    get emailInput () {
        return $('#root > div > div > form > div:nth-child(4) > div > input[type=email]');
    }

    get passwordInput () {
        return $('#root > div > div > form > div:nth-child(5) > div > input[type=password]');
    }

    get nameMsg () {
        return $('#root > div > div > form > div:nth-child(2) > div > p');
    }

    get lastNameMsg () {
        return $('#root > div > div > form > div:nth-child(3) > div > p');
    }

    get emailMsg () {
        return $('#root > div > div > form > div:nth-child(4) > div > p');
    }

    get passwordMsg () {
        return $('#root > div > div > form > div:nth-child(5) > div > p');
    }

    get successModal () {
        return $('#root > div > div > form > div:nth-child(6) > div > div > div > h3');
    }

    get acceptBtn () {
        return $('#root > div > div > form > div:nth-child(6) > div > div > button');
    }

    get adminCreated () {
        return $('#root > div > div > section > table > tbody > tr:last-child > td:nth-child(2)');
    }

    get editBtn () {
        return $('#root > div > div > section > table > tbody > tr:last-child > td.table_buttons__2zGNi > button.button_squaredSecondary__Y223a');
    }

    get deleteBtn () {
        return $('#root > div > div > section > table > tbody > tr:last-child > td.table_buttons__2zGNi > button.button_squaredPrimary__1ip0a');
    }

    get formTitle () {
        return $('#fromHeader');
    }

    get deleteModal () {
        return $('#root > div > div > section > table > tbody > tr:nth-child(6) > td.table_buttons__2zGNi > div > div > div.modal_modalHeader__2HkkN > h3');
    }

    get confirmDeleteBtn () {
        return $('#root > div > div > section > table > tbody > tr:nth-child(6) > td.table_buttons__2zGNi > div > div > div.modal_modalButtons__22sYM > button.button_squaredPrimary__1ip0a')
    }

    get successDeleteModal () {
        return $('#root > div > div > section > div > div > div > h3');
    }

    get acceptDelete () {
        return $('#root > div > div > section > div > div > button');
    }

    get logoutBtn () {
        return $('#root > div > div > aside > div.sidebar_bottom__3h20X > button');
    }

    get profileMenu () {
        return $('#root > div > div > aside > div.sidebar_routes__32H42 > a.sidebar_listItem__3QsHV');
    }

    get superAProfile () {
        return $('#root > div > div > section > h2');
    }

    get editSABtn () {
        return $('#root > div > div > section > button');
    }

    get nameEdited () {
        return $('#root > div > div > section > table > tbody > tr > td:nth-child(1)')
    }

    get closeX () {
        return $('#root > div > div > form > div:nth-child(6) > div > div > div > button')
    }

    get formClose () {
        return $('#root > div > div > form > div.admin_formHeader__jsWIH > button')
    }

    async addAdmin (name, lastName, email, password) {
        await this.nameInput.setValue(name);
        await this.lastNameInput.setValue(lastName);
        await this.emailInput.setValue(email);
        await this.passwordInput.setValue(password);
    }

}

module.exports = new Superadmin();
