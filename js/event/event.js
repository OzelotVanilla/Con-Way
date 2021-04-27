class event {

    name;
    canceled = false;
    defaultAction;
    currentAction;

    constructor(name, action) {
        this.name = name;
        this.defaultAction = this.currentAction = action;
    }

    getName() {
        return this.name;
    }

    isCanceled() {
        return this.canceled;
    }

    setCanceled(canceled) {
        this.canceled = canceled;
    }

    getDefaultAction() {
        return this.defaultAction;
    }

    getCurrentAction() {
        return this.currentAction;
    }

    setCurrentAction(action) {
        if (typeof action === "function") {
            this.currentAction = action;
        }
    }

    resetCurrentAction() {
        this.currentAction = this.defaultAction;
    }
}