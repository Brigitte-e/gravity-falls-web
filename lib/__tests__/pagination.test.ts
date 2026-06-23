import { getVisiblePages, parsePageParam } from "../pagination";

describe("parsePageParam", () => {
  it("returns 1 for missing or invalid values", () => {
    expect(parsePageParam()).toBe(1);
    expect(parsePageParam("")).toBe(1);
    expect(parsePageParam("0")).toBe(1);
    expect(parsePageParam("-2")).toBe(1);
    expect(parsePageParam("abc")).toBe(1);
  });

  it("parses valid page numbers", () => {
    expect(parsePageParam("3")).toBe(3);
    expect(parsePageParam(["5"])).toBe(5);
  });
});

describe("getVisiblePages", () => {
  it("returns all pages when total is small", () => {
    expect(getVisiblePages(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("includes ellipsis for large page counts", () => {
    expect(getVisiblePages(10, 20)).toEqual([1, "ellipsis", 9, 10, 11, "ellipsis", 20]);
  });

  it("shows leading pages near the start", () => {
    expect(getVisiblePages(2, 20)).toEqual([1, 2, 3, 4, "ellipsis", 20]);
  });

  it("shows trailing pages near the end", () => {
    expect(getVisiblePages(19, 20)).toEqual([1, "ellipsis", 17, 18, 19, 20]);
  });
});
