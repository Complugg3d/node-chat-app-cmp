const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Erick',
      room: 'Node Course'
    },{
      id: 2,
      name: 'Ram',
      room: 'html Course'
    },{
      id: 3,
      name: 'Martin',
      room: 'Node Course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Erick',
      room: 'A'
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);//used inn arrays
  });

  it('should remove a user', () => {
    var removedUser = users.users[1];
    var res = users.removeUser(removedUser.id);
    expect(users.users.length).toBe(2);
    expect(res).toEqual(removedUser);
  });

  it('should not remove a user', () => {
    var res = users.removeUser(5);
    expect(users.users.length).toBe(3);
    expect(res).toNotExist();
  });

  it('should find a user', () => {
    var findUser = users.users[2];
    var res = users.getUser(findUser.id);
    expect(res).toEqual(findUser);
  });

  it('should not find a user', () => {
    var res = users.getUser(5);
    expect(res).toNotExist();
  });

  it('should return names for node course', () => {
    var userList = users.getUserList(users.users[0].room);

    expect(userList).toEqual(['Erick', 'Martin']);
  });

  it('should return names for html course', () => {
    var userList = users.getUserList(users.users[1].room);

    expect(userList).toEqual(['Ram']);
  });

  it('should return a user if a user exist in a room', () => {
    var result = users.isUserInRoom(users.users[0].name, users.users[0].room);
    expect(result).toBe(users.users[0]);
  });

  it('should return null if a user do not exist in a room', () => {
    var result = users.isUserInRoom(users.users[1].name, users.users[0].room);
    expect(result).toNotExist();
  });

  it('should return the list of rooms based on a pattern', () => {
    var roomsList = users.getRoomsList('Nod');

    expect(roomsList.length).toBe(1);
    expect(roomsList[0]).toBe(users.users[0].room);
  });

  it('should return empty array if not rooms match', () => {
    var roomsList = users.getRoomsList('java');

    expect(roomsList.length).toBe(0);
  });
});
