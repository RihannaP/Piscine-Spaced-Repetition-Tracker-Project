import { calculateFutureDates, formatDate } from "./script.js";

// Test calculateFutureDates function
test("calculateFutureDates should return correct spaced repetition dates", () => {
  const topic = { topic: "JavaScript", date: "2025-02-10" };
  const results = calculateFutureDates(topic);

  expect(results).toHaveLength(5);

  const expectedDates = [
    "17th February 2025", // 1 week later
    "10th March 2025", // 1 month later
    "10th May 2025", // 3 months later
    "10th August 2025", // 6 months later
    "10th February 2026", // 1 year later
  ];

  results.forEach((item, index) => {
    expect(formatDate(item.date)).toBe(expectedDates[index]);
  });
});

// Test formatDate function
test("formatDate should return date in '10th February 2025' format", () => {
  expect(formatDate("2025-02-10")).toBe("10th February 2025");
  expect(formatDate("2024-12-31")).toBe("31st December 2024");
});