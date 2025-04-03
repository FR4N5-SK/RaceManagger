export function filterData(oldData, setData, key, value) {
  let newData = []
    if (value === "*") {
    setData(oldData);
    return true
  } else {
    newData = oldData.filter((item) => item[key] === value);
  }
  setData(newData);
  return true
}

export function searchData(array, value, key, setData) {
  let newData = [];
  let nowData = [];

  array.forEach((item) => {
    console.log(item[key])
    item[key].toLowerCase().includes(value.toLowerCase())
      ? newData.push(item)
      : nowData.push(item);
  });
  setData(newData);
  return true
}