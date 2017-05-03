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
});
