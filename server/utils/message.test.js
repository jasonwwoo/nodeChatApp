const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "Jason";
    const text = "My name is Jason!";
    const message = generateMessage(from, text);
    expect(message).toMatchObject({ from, text });
    expect(typeof message.createdAt).toBe("number");
    console.log("message: ", JSON.stringify(message, null, 2));
  });
});

describe("generateLocationMesage", () => {
  it("should generate correct location object", () => {
    let from = "Mom";
    let latitude = "3";
    let longitude = "5";
    let url = "https://www.google.com/maps?q=3,5";

    const location = generateLocationMessage(from, latitude, longitude);
    expect(typeof location.createdAt).toBe("number");
    expect(location).toMatchObject({
      from,
      url
    });
    // expect(location.from).toBe(from);
    // expect(location.url).toBe("https://www.google.com/maps?q=3,5");
  });
});
