export class event
{

    name: string;
    canceled: boolean = false;

    defaultAction: (...args: any) => void;
    currentAction: (...args: any) => void;

    constructor(name: string, action: (e: event) => any)
    {
        this.name = name;
        this.defaultAction = this.currentAction = action;
    }

    getName(): string
    {
        return this.name;
    }

    isCanceled(): boolean
    {
        return this.canceled;
    }

    setCanceled(canceled: boolean): void
    {
        this.canceled = canceled;
    }

    getDefaultAction(): (...args: any) => any
    {
        return this.defaultAction;
    }

    getCurrentAction(): (...args: any) => any
    {
        return this.currentAction;
    }

    setCurrentAction(action: (...args: any) => any): void
    {
        this.currentAction = action;
    }

    resetCurrentAction(): void
    {
        this.currentAction = this.defaultAction;
    }
}