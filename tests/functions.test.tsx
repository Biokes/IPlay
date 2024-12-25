import {getLastThursday, formatTime} from "@/functions/func";

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
  it("should format a number give to a time format ", () => {
    expect(formatTime(10)).toBe("00:10");
    expect(formatTime(0)).toBe("00:00")
    expect(formatTime(2)).toBe("00:02")
    expect(formatTime(270.1)).toBe("04:30")
    expect(formatTime(3600)).toBe("01:00:00")
    expect(formatTime(3601)).toBe("01:00:01")
    expect(formatTime(360000)).toBe("100:00:00")
    expect(formatTime(360010)).toBe("100:00:10")
  });
});
