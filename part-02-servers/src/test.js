const fs = require('fs')

const FOLDER = './testfiles'

const fileList = fs.readdirSync(FOLDER, 'utf-8').map((ele, i) => `${FOLDER}/${ele}`)
console.log('📣 fileList ~', fileList)

const filterHtmlFiles = (ele, i) => {
  return ele.includes('.html') === true
}
const htmlFilesOnly = fileList.filter(filterHtmlFiles)
console.log('📣 html ~', htmlFilesOnly)

const readFileToString = (file) => {
  const rawData = fs.readFileSync(file, 'utf-8', (err, data) => {
    if (err) console.log('ERROR: SOMETHING WENT WRONG!')
  })
  console.log('📣 rawData ~', rawData)
  return rawData;
}

const PHONEREGEX = /\d{3}-\d{3}-\d{4}/g

const findPhoneNums = (str) => {
  return str.match(PHONEREGEX)  // returns found Phone Numbers in a ARRAY
}

const writeToFile = (file, data) => {
  fs.writeFileSync(file, data, 'utf-8', (err, data) => {
    if (err) console.log("ERROR WRITING FILE!")
  })  
}

const replacePhoneNums = (str, searchStr, newStr) => {
  return str.replaceAll(searchStr, newStr)
}

const final = (file, i) => {
  const htmlStr = readFileToString(file)
  const phoneNumArr = findPhoneNums(htmlStr)
  let newHtml = htmlStr;
  if (phoneNumArr) {
    for (number of phoneNumArr) {
      newHtml = replacePhoneNums(newHtml, number, 'REPLACED!')
    }
  }
  writeToFile(file, newHtml);
}

htmlFilesOnly.forEach(final);