const expect = require("expect");
const { isRealString } = require("./validation");

describe("isRealString tests", () => {
  it("should reject non-string values", () => {
    let name = 123;
    expect(isRealString(name)).toBe(false);
  });

  it("should reject string with only spaces", () => {
    let name = "     ";
    expect(isRealString(name)).toBe(false);
  });

  it("should allow string with non-space characters", () => {
    let name = " s sh ";
    expect(isRealString(name)).toBe(true);
  });
});
