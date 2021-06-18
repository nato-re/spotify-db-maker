module.exports = main = (users) => {


function removeDuplicates(data, key) {
  
  return [
    ...new Map(data.map(item => [key(item), item])).values()
  ]

};

const unique = removeDuplicates(users, item => item.display_name);

require('fs').writeFileSync('./usersUnique.json', JSON.stringify(unique))
}
