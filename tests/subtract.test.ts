import { subtract } from "../src";

test("Subtracts two numbers correctly", () => {
  expect(subtract(3, 5)).toBe(-2);
});
