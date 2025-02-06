import { calculateFutureDates, formatDate, deleteTopic } from "./script.js";
import { addData, getData } from "./storage.js";

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
  expect(formatDate("2024-12-02")).toBe("2nd December 2024");
  expect(formatDate("2024-01-03")).toBe("3rd January 2024");

});

// Test deleteTopic function
beforeAll(() => {
  // Create a mock div for agenda
  const agendaDiv = document.createElement('div');
  agendaDiv.id = "agenda";
  document.body.appendChild(agendaDiv);  // Append to the body to simulate DOM presence
});

test("should remove the correct topic and update local storage", () => {
  localStorage.clear(); // Clean up before each test
  const sampleData = [{ topic: "JavaScript", date: "2025-02-10" }, { topic: "Pythone", date: "2025-11-09" }, { topic: "HTML", date: "2025-11-09" }]
  const userId = 1
  addData(userId, sampleData)
  deleteTopic(userId, 1);
  const results = getData(userId)

  expect(results).toHaveLength(2);

  const expectedData = [
    { topic: "JavaScript", date: "2025-02-10" },
    { topic: "HTML", date: "2025-11-09" }
  ];

    expect(results).toEqual(expectedData);
  
});