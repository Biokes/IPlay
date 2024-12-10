import getLastThursday from "@/functions/func";

describe("functions tests", () => {
  it("should return the correct date for the last Thursday", () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = (dayOfWeek <= 4 ? 7 : 0) + (dayOfWeek - 4);
    const expectedDate = new Date(today.setDate(today.getDate() - diff))
      .toISOString()
      .split("T")[0];
    expect(getLastThursday()).toBe(expectedDate);
  });
});
