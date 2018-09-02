const expect = require("expect");
const { generateMessage } = require("./message");

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
