const sinon = require('sinon');
const assert = require('assert');

const Fibonacci = require('./index');

(async () => {
  {
    const fibonacci = new Fibonacci();
    const fibonacciCalls = sinon.spy(fibonacci, fibonacci.run.name);

    for await (const index of fibonacci.run(3)) { }

    const expectedCount = 4;

    assert.deepStrictEqual(fibonacciCalls.callCount, expectedCount);

    console.log('calls', fibonacciCalls.callCount);
  }
  {
    const fibonacci = new Fibonacci();
    const fibonacciCalls = sinon.spy(fibonacci, fibonacci.run.name);

    const [...results] = fibonacci.run(5);

    console.log('results', results);
    console.log('calls', fibonacciCalls.callCount);

    const { args } = fibonacciCalls.getCall(2);
    const expected = [1, 1, 2, 3, 5];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    });

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expected);
  }
})();
