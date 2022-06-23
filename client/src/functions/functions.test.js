import { compareConcum } from "./compareConcum";
import parse from "./parse";
import findCombinations from "./findCombinations";

describe("Testing compareConcum functionality..", () => {
  test("Sorting compounds using concentration levels 'L', 'M', 'H'", () => {
    const initCompoundObjects = [
      { cmpdname: "a", CONCuM: "L" },
      { cmpdname: "b", CONCuM: "M" },
      { cmpdname: "c", CONCuM: "M" },
      { cmpdname: "d", CONCuM: "H" },
      { cmpdname: "e", CONCuM: "L" },
      { cmpdname: "f", CONCuM: "L" },
      { cmpdname: "g", CONCuM: "L" },
      { cmpdname: "h", CONCuM: "M" },
      { cmpdname: "j", CONCuM: "H" },
    ];
    const sortedCompounds = initCompoundObjects
      .sort(compareConcum)
      .map((o) => o.CONCuM);
    expect(sortedCompounds).toEqual([
      "H",
      "H",
      "M",
      "M",
      "M",
      "L",
      "L",
      "L",
      "L",
    ]);
  });
  test("Sorting compounds using concentration levels represented by numbers only", () => {
    const initCompoundObjects = [
      { cmpdname: "a", CONCuM: 1 },
      { cmpdname: "b", CONCuM: 100 },
      { cmpdname: "c", CONCuM: 20 },
      { cmpdname: "d", CONCuM: 10 },
      { cmpdname: "e", CONCuM: 10 },
      { cmpdname: "f", CONCuM: 1 },
      { cmpdname: "g", CONCuM: 50 },
      { cmpdname: "h", CONCuM: 100 },
      { cmpdname: "j", CONCuM: 1 },
    ];
    const sortedCompounds = initCompoundObjects
      .sort(compareConcum)
      .map((o) => o.CONCuM);
    expect(sortedCompounds).toEqual([100, 100, 50, 20, 10, 10, 1, 1, 1]);
  });
});

describe("Testing the parse function...", () => {
  test("should correctly parse a simple sentence containing one delimiter of choice", () => {
    const delimeter = ",";
    const sentence = "This is a sentence, ok?";
    const parsed = parse(delimeter, sentence);
    expect(parsed).toEqual(["This is a sentence", " ok?"]);
  });

  test("should correctly parse a simple sentence containing one delimiter of choice and let newline act like a delimiter", () => {
    const delimeter = ",";
    const sentence = "This is \na sentence, ok\n?";
    const parsed = parse(delimeter, sentence);
    expect(parsed).toEqual(["This is ", "a sentence", " ok", "?"]);
  });

  test("should correctly parse a larger sentence containing multiple delimiter of choice, empty strings gets filtered out", () => {
    const delimeter = "|";
    const sentence = "a||b|c|d|\n|s|k|||";
    const parsed = parse(delimeter, sentence);
    expect(parsed).toEqual(["a", "b", "c", "d", "s", "k"]);
  });
});

describe("Testing the functionality of findCombinations...", () => {
  test("should return null if there are no combinations", () => {
    const subs = findCombinations("(bbcabds)");
    expect(subs).toEqual(null);
  });
  test("should return the compounds that make up the present combinations", () => {
    const subs = findCombinations("(c)(a)(b)(z)");

    expect(subs).toContainEqual("(a)");
    expect(subs).toContainEqual("(b)");
    expect(subs).toContainEqual("(c)");
    expect(subs).toContainEqual("(z)");
  });
});
