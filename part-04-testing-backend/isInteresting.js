function isInteresting(number, awesomePhrases) {
  const testInterest = (num) => {
    const numStr = String(num)
    const numArr = numStr.split('').map(ele => Number(ele))
    if (numStr.length < 3) return false
    if (numStr.match(/^\d0+$/) 
      || numStr.match(/^(\d)\1+$/)
      || isIncrementing(numArr)
      || isDecrementing(numArr)
      || isPalindrome(numStr)
      || awesomePhrases.includes(num)
    ) return true
    else return false
  }
  
  if (testInterest(number) === true) return 2
  else if (testInterest(number + 1) || testInterest(number + 2)) return 1
  else return 0
}

function isPalindrome(str) {
  return str === str.split('').reverse('').join('')
}
console.log(`📣 isPalindrome ~`, isPalindrome('122112221'))

function isIncrementing(numArr) {
  const inc = [1,2,3,4,5,6,7,8,9,0,undefined]
  return numArr.every((ele, i, arr) => {
    if (i === arr.length - 1) return true
    return Number(arr[i + 1]) === inc[inc.indexOf(ele) + 1]
  }) 
}

function isDecrementing(numArr) {
  const dec = [9,8,7,6,5,4,3,2,1,0,undefined]
  return numArr.every((ele, i, arr) => {
    if (i === arr.length - 1) return true
    return Number(arr[i + 1]) === dec[dec.indexOf(ele) + 1]
  }) 
}

console.log(`📣 test ~`, isInteresting(3210, []))