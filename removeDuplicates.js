module.exports = function removeDuplicates(data, key) {
  return [
    ...new Map(data.map((item) => [item[key], item])).values(),
  ];
};