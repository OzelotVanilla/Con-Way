export class savestate
{
    name: string;
    stage: string;
    score: number;

    constructor(name: string = "User", stage: string = "meadow", score: number = 0)
    {
        if (name === null)
        {
            this.name = "User";
        } else
        {
            this.name = name;
        }

        if (stage === null)
        {
            this.stage = "meadow";
        } else
        {
            this.stage = stage;
        }

        this.score = score;
    }
}
