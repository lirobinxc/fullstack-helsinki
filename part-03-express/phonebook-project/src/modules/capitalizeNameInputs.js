const capitalizeName = str => {
  const name = str
  const capitalizeName = name.trim()
    .split(' ')
    .map((ele, i) => {
      if (ele) {
        return ele[0].toUpperCase() + ele.slice(1)
      } else return undefined;
    })
    .filter(ele => ele !== undefined)
  const finalName = capitalizeName.flat().join(' ')
  return finalName;
}

export default capitalizeName;