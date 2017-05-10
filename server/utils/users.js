const _ = require('lodash');

class Users {
  constructor() {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var user = this.getUser(id);
    if(user) {
      // var index = this.users.indexOf(user[0]);
      // this.users.splice(index, 1);
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }
  getUserList(room) {
    var users = this.users.filter((user) => user.room === room);

    return users.map((user) => user.name);
  }
  getRoomsList(pattern){
    var PATTERN = new RegExp(pattern);
    var usersInRooms = this.users.filter((user) => PATTERN.test(user.room));
    return _.uniqBy(usersInRooms, 'room').map((user) => user.room);
  }
  isUserInRoom(name, room) {
    return _.find(this.users, { name, room });
  }
}

module.exports = { Users };
