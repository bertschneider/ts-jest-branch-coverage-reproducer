import {helloWorld}  from "./targetTs";

describe('helloWorld', () => {
    it("prints 'Hello World!' when no input is provided", () => {
        expect(helloWorld()).toEqual('Hello World!');
    });
    it("prints a message with the provided name", () => {
        expect(helloWorld("TestName")).toEqual("Hello TestName!");
    });
    it("prints a message with the first letter of the provided name as uppercase ", () => {
        expect(helloWorld("testName")).toEqual("Hello TestName!");
    });
});
