import { StrengthPipe } from "./strength.pipe";

describe(`Strength Pipe`, () => {
  it("should display weak if strenght is 5", () => {
    //arrange
    let pipe = new StrengthPipe();

    //act
    expect(pipe.transform(5)).toEqual("5 (weak)");
  });

  it("should display weak if strenght is 10", () => {
    //arrange
    let pipe = new StrengthPipe();

    //act
    expect(pipe.transform(10)).toEqual("10 (strong)");
  });
});
