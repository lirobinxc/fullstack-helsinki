// console.time('timer')
// const gridTrav = (m, n, memo = {}) => {
//   const key1 = `${m},${n}`
//   const key2 = `${n},${m}`
//   if (key1 in memo) return memo[key1]
//   if (m === 0 || n === 0) return 0;
//   if (m === 1 && n === 1) return 1;
//   memo[key1] = memo[key2] = gridTrav(m - 1, n, memo) + gridTrav(m, n - 1, memo)
//   return memo[[m, n]]
// }

// const grid = [18, 18]
// console.log(`📣 total ~`, gridTrav(...grid))
// console.timeEnd('timer')


function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 0) return 0;
  if (n <= 2) return 1;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

const age = 17
let canYouVote = age < 18
? 'Too young.'
: 'Yes!'
console.log(`📣 eval ~`, canYouVote)