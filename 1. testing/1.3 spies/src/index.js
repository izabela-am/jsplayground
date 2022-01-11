class Fibonacci {
  *run(input, current = 0, next = 1) {
    if (input === 0) {
      return current;
    }

    yield next;
    yield* this.run(input - 1, next, current + next);


  }
}

module.exports = Fibonacci;