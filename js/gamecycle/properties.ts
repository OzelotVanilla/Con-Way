/**
 * The global state of the whole Con-Way game.
 * The complete function returns true only if all the states are correct.
 */

class asserting
{

    assertion: () => any;
    defaultState: any;

    constructor(assertion: () => any, defaultState: any)
    {
        this.assertion = assertion;
        this.defaultState = defaultState;
    }

    getAssert(): boolean
    {
        return this.assertion() === this.defaultState;
    }

}

export var properties = {
    value: new Map<string, asserting>(),

    registAssertion: function <T>(name: string, assertion: () => T, defaultState: T)
    {
        this.value.set(name, new asserting(assertion, defaultState));
    },

    complete: function (): boolean
    {
        return this.value.every(function (name: string, assertion: asserting): boolean
        {
            return assertion.getAssert();
        });
    },

    isFine: function (name: string): boolean
    {
        return this.value.get(name).getAssert();
    }

};
