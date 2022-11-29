class Task {
    get taskBtn () {
        return $('#root > div > div > aside > div.sidebar_routes__32H42 > a:nth-child(4)')
    }

    get taskTable () {
        return $('#root > div > div > div > table')
    }

    get addTaskBtn () {
        return $('#root > div > div > div > button')
    }

    get taskTextarea () {
        return $('#root > div > div > div > form > div:nth-child(2) > div > textarea')
    }

    get textareaMsg () {
        return $('#root > div > div > div > form > div:nth-child(2) > div > p')
    }

    get saveBtn () {
        return $('#root > div > div > div > form > div.tasks_buttonsDiv__2kcBt > button')
    }

    get successModalBtn () {
        return $('#root > div > div > div > form > div.tasks_buttonsDiv__2kcBt > div > div > button')
    }

    get newTask () {
        return $('#root > div > div > div > table > tbody > tr:last-child')
    }

    get newTaskText () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td:nth-child(2)')
    }

    get editBtn () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > button.button_squaredSecondary__Y223a')
    }

    get deleteBtn () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > button.button_squaredPrimary__1ip0a')
    }

    get deleteModal () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > div > div')
    }

    get cancelDelete () {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > div > div > div.modal_modalButtons__22sYM > button.button_squaredSecondary__Y223a')
    }

    get confirmDelete() {
        return $('#root > div > div > div > table > tbody > tr:last-child > td.table_buttons__2zGNi > div > div > div.modal_modalButtons__22sYM > button.button_squaredPrimary__1ip0a')
    }

    get modalSuccessHeader () {
        return $('#root > div > div > div > div > div > div > h3')
    }

    get modalSuccessAcceptBtn () {
        return $('#root > div > div > div > div > div > button')
    }

    async fillForm (description) {
        await this.taskTextarea.setValue(description);
        await this.saveBtn.click();
    }
}

module.exports = new Task();