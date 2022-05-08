
export abstract class clock
{

    reference: clock;

    constructor(reference: clock)
    {
        this.reference = reference;
    }

    abstract getTime(): number;

    abstract setTimeout(task: (...args: any[]) => void, timeout, ...args: any[]): number;

    clearTimeout(task_id: number): void
    {
        this.reference.clearTimeout(task_id);
    }

    abstract setInterval(task: (...args: any[]) => void, timeout: number, ...args: any[]): number;

    clearInterval(task_id: number): void
    {
        this.reference.clearInterval(task_id);
    }
}