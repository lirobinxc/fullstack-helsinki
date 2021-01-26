function pascal(numRows) {
  const ARR = [[1]]
  if (numRows === 1) return ARR;
  for (let i = 0; i < numRows; i++) {
    const sourceArr = ARR[i]
    const destArr = [1]
    for (let j = 0; j < sourceArr.length; j++) {
      destArr.push(sourceArr[j] + (sourceArr[j + 1] || 0))
    }
    ARR.push(destArr)
  }
  return ARR
}

console.log(`📣 ARR ~`, pascal(5))