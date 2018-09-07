const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "Mike",
        room: "Node"
      },
      {
        id: "2",
        name: "Jen",
        room: "React"
      },
      {
        id: "3",
        name: "Julie",
        room: "Node"
      }
    ];
  });
  it("should add new user", () => {
    let users = new Users();
    let user = {
      id: "123",
      name: "Jason",
      room: "The Office Fans"
    };
    let addUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    // let mike = users.users[0];
    let userId = "1";
    let user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user", () => {
    let userId = "99";
    let user = users.removeUser(userId);
    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    var mike = users.users[0];
    expect(users.getUser(mike.id)).toEqual(mike);
  });

  it("should not find user", () => {
    var mike = users.users[0];
    var jen = users.users[1];
    expect(users.getUser(mike.id)).not.toEqual(jen);
  });

  it("should return names for node course", () => {
    var userList = users.getUserList("Node");
    expect(userList).toEqual(["Mike", "Julie"]);
  });

  it("should return names for react course", () => {
    var userList = users.getUserList("React");
    expect(userList).toEqual(["Jen"]);
  });
});
