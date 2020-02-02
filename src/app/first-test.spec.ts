describe("My first Test", () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it("should be true if true", () => {
    //arrange
    sut.a = false;
    // act
    sut.a = true;
    //asset
    expect(sut.a).toBe(true);
  });
});
