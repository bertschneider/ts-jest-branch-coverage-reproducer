export function helloWorld(input?: string): string {
    if (input) {
        if (input[0].toLowerCase() === input[0]) {
            input = input[0].toUpperCase() + input.slice(1);
        }
        return 'Hello ' + input + '!';
    }
    return 'Hello World!';
}
