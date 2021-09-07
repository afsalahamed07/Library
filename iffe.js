// immediately invoked function expression
// data privacy

// (function () {
//     // foo cannot be accessed in global scope
//     let foo = "hello"
//
//     console.log(foo)
// }())

const Formatter = (function() {
    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`);
    const timesRun = [];

    const makeUppercase = (text) => {
        log("Making uppercase");
        timesRun.push(null);
        return text.toUpperCase();
    };

    return {
        makeUppercase,
        timesRun,
    }
})();

console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.makeUppercase("tomek"));
console.log(Formatter.makeUppercase("tomek"));
Formatter.timesRun.push(null)
console.log(Formatter.timesRun.length);