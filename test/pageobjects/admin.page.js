class Admin {
    get addProjectBtn () {
        return $('#root > div > div > div > button');
    }

    get projectNameInput () {
        return $('#root > div > div > div > form > div:nth-child(1) > div > input[type=text]');
    }

    get clientNameInput () {
        return $('#root > div > div > div > form > div:nth-child(2) > div > input[type=text]');
    }

    get descriptionInput () {
        return $('#root > div > div > div > form > div:nth-child(3) > div > textarea');
    }

    get startDate () {
        return $('#root > div > div > div > form > div:nth-child(4) > div > input[type=date]');
    }

    get endDate () {
        return $('#root > div > div > div > form > div:nth-child(5) > div > input[type=date]');
    }

    get saveBtn () {
        return $('#root > div > div > div > form > button');
    }

    get modal () {
        return $('#root > div > div > div > div > div > div.modal_modalHeader__2HkkN > h3');
    }

    get modalConfirmBtn () {
        return $('#root > div > div > div > div > div > div.modal_modalButtons__22sYM > button.button_squaredPrimary__1ip0a');
    }

    get projectMsg () {
        return $('#root > div > div > div > form > div:nth-child(1) > div > p')
    }

    get clientMsg () {
        return $('#root > div > div > div > form > div:nth-child(2) > div > p')
    }

    get descriptionMsg () {
        return $('#root > div > div > div > form > div:nth-child(3) > div > p')
    }

    get startDateMsg () {
        return $('#root > div > div > div > form > div:nth-child(4) > div > p')
    }

    get endDateMsg () {
        return $('#root > div > div > div > form > div:nth-child(5) > div > p')
    }

    get appendBtn () {
        return $('#root > div > div > div > form > div.form_formFull__R8NY5.form_employeesDiv__1OgzH > button');
    }

    get rateInput () {
        return $('#root > div > div > div > form > div.form_formFull__R8NY5.form_employeesDiv__1OgzH > div > div:nth-child(3) > div > input[type=number]')
    }

    get removeBtn () {
        return $('#root > div > div > div > form > div.form_formFull__R8NY5.form_employeesDiv__1OgzH > div > button');
    }

    get addProjectModal () {
        return $('#root > div > div > div > div > div > div.modal_modalHeader__2HkkN > h3')
    }

    get confirmBtn () {
        return $('#root > div > div > div > div > div > div.modal_modalButtons__22sYM > button.button_squaredPrimary__1ip0a')
    }

    get successModal () {
        return $('#root > div > div > div > div > div > div > h3')
    }

    get successConfirm () {
        return $('#root > div > div > div > div > div > button')
    }

    get projectCreated () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td:nth-child(1)')
    };

    get editBtn () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > button.button_squaredSecondary__Y223a')
    }

    get deleteBtn () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > button.button_squaredPrimary__1ip0a')
    }

    get formTitle () {
        return $('#root > div > div > div > h2')
    }

    get deleteModal () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > div > div > div.modal_modalHeader__2HkkN > h3')
    }

    get confirmDelete () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > div > div > div.modal_modalButtons__22sYM > button.button_squaredPrimary__1ip0a')
    }

    get acceptDelete () {
        return $('#root > div > div > div.modal_modalContainer__1aBlH > div > button')
    }

    get successDeleteModal () {
        return $('#root > div > div > div.modal_modalContainer__1aBlH > div > div > h3')
    }

    async addProject (projectName, clientName, description, startDate, endDate) {
        await this.projectNameInput.setValue(projectName);
        await this.clientNameInput.setValue(clientName);
        await this.descriptionInput.setValue(description);
        await this.startDate.setValue(startDate);
        await this.endDate.setValue(endDate);
    }

}

module.exports = new Admin();