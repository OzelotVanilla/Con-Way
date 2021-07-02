export var sst: savestate;

export class savestate
{
    name: string;
    stage: string;
    score: number;

    constructor(name: string = "User", stage: string = "meadow", score: number = 0)
    {
        this.name = name;
        this.stage = stage;
        this.score = score;
    }
}

$(() =>
{
    sst = new savestate(
        localStorage.getItem("name"),
        localStorage.getItem("stage"),
        Number(localStorage.getItem("score"))
    );
})