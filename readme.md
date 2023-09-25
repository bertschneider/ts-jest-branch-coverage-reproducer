# ts-jest branch coverage reproducer

This projects shows how to reproduce broken branch coverage reports of TS files.

# Project structure

The project contains two test files `target.test.js` and `target.test.ts` testing the dummy function `helloWorld` in `target.js` and `target.ts` respectively.
Both versions are as close to identical as possible and should produce the same coverage report.

# Problem description

Generating coverage reports for the JS und TS files should result in identical reports, this is not the case.
It seems that the TS coverage report is missing invocations of `else` branches in imported TS files.

Based on the Jest cache directory it looks like the coverage instrumentation is identical in both cases and should count `else` branches correctly.

```js
exports.helloWorld = void 0;
function helloWorld(input) {
  /* istanbul ignore next */
  cov_903hzn0a3().f[0]++;
  cov_903hzn0a3().s[2]++;
  if (input) {
    /* istanbul ignore next */
    cov_903hzn0a3().b[0][0]++;
    cov_903hzn0a3().s[3]++;
    if (input[0].toLowerCase() === input[0]) {
      /* istanbul ignore next */
      cov_903hzn0a3().b[1][0]++;
      cov_903hzn0a3().s[4]++;
      input = input[0].toUpperCase() + input.slice(1);
    } else
    /* istanbul ignore next */
    {
      cov_903hzn0a3().b[1][1]++;
    }
    cov_903hzn0a3().s[5]++;
    return 'Hello ' + input + '!';
  } else
  /* istanbul ignore next */
  {
    cov_903hzn0a3().b[0][1]++;
  }
  cov_903hzn0a3().s[6]++;
  return 'Hello World!';
}
```

The resulting `coverage-final.json` file contains different branch counters, though.

- JS: `"b":{"0":[2,1],"1":[1,1]}`
- TS: `"b":{"0":[2],"1":[1]}`

# How to reproduce

1. Generate JS coverage report via `npm run test:js`.
    - Notice that report `coverage/coverage-final.json` contains the key `b` with the value `{"0":[2,1],"1":[1,1]}`, so the invocations of the contained `if` and `else` branches was tracked correctly.
2. Generate TS coverage report via `npm run test:ts`.
   - Notice that report `coverage/coverage-final.json` contains the key `b` with the value `{"0":[2],"1":[1]}`, so the invocations of the contained `else` branches was not tracked.
   - Also notice that the report contains `branchMap` entries with missing `locations` for the `else` branches.
