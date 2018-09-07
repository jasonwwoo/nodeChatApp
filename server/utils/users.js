// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    let user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter(user => user.id !== id); //removes users if true
    }

    return user;
  }
  getUser(id) {
    const user = this.users.filter(user => user.id === id)[0];
    return user;
  }
  getUserList(room) {
    let users = this.users.filter(user => user.room === room); //returns users if true
    var namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = { Users };
// class Person {
//   constructor(name, age) {
//     // console.log(name, age);
//     this.name = name;
//     this.age = age;
//   }

//   getUserDescription() {
//     return `${this.name} is ${this.age}`;
//   }
// }

// let me = new Person("Jason", 23);
// console.log(me.getUserDescription());

// let be = new Person("Be", 23);
