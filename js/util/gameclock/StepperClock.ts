import { clock } from "js/util/gameclock/clock";
import Heap from "node_modules/typescript-collections/dist/lib/Heap";


export abstract class RelativeClock extends clock
{

    timeout_tasks: Heap<{ id: number, task: (...args: any[]) => void, invoke_time: number, args: any[] }> = new Heap((a, b) => a.invoke_time - b.invoke_time);
    interval_tasks: Heap<{ id: number, task: (...args: any[]) => void, register_time: number, interval: number, args: any[] }> = new Heap();

    last_id: number = 0;

    current_time: number;

    constructor(start_time: number)
    {
        super(undefined);
        this.current_time = start_time;
    }

    step(interval: number): void
    {

    }

    getTime(): number
    {
        return this.current_time;
    }

    setTimeout(task: (...args: any[]) => void, timeout: number = 0, ...args: any[]): number
    {
        let id: number = ++this.last_id;
        let call_time: number = this.current_time + timeout;
        this.timeout_tasks.add({ id: id, task: task, invoke_time: call_time, args: args });
        return id;
    }

    clearTimeout(task_id: number): void
    {
        
    }

    setInterval(task: (...args: any[]) => void, interval: number = 0, ...args: any[]): number
    {
        return 0;
    }

    clearInterval(task_id: number): void
    {
    }
}