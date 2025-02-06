
# **Piscine-Spaced-Repetition-Tracker-Project**

## **Overview**

This project was created by [Rihanna](https://github.com/RihannaP) and [Fatma](https://github.com/AFatmaa) as a group project for **Code Your Future**. The aim of this project is to build a tool that helps users apply the **spaced repetition** learning technique.

Spaced repetition involves reviewing topics at increasing time intervals (e.g., after one week, one month, three months, six months, and one year) to improve long-term retention. One of the key challenges of this method is keeping track of when to revise each topic. Our application solves this by allowing users to track their topics and see when it's time to review them.

---

## **Features**

- Track multiple topics and their revision schedules.
- Automatically display upcoming revision dates.
- Simple agenda-style layout for easy tracking.

---

## **Technologies Used**

- **HTML** for structuring the content.
- **JavaScript** for managing the logic and functionality.
- **LocalStorage** to persist user data (no backend required).
- **No CSS** is used, as the focus is on functionality rather than UI design.

---

## **How to Use**

1. Clone the repository:
   ```bash
   git clone https://github.com/RihannaP/Piscine-Spaced-Repetition-Tracker-Project.git
   ```
2. Open the `index.html` file in your browser. **Ensure you are using a local server to open the HTML** because it uses modules (e.g., `http-server` or `live-server`).

   ```bash
   npx http-server
   ```

3. Add topics you want to track and let the app handle the scheduling!


---

## **Testing**

We have written unit tests for some of the core functions in this project. They ensure that the application behaves as expected.

### **To Run Tests:**

1. Install Jest (if it's not already installed):
   ```bash
   npm install --save-dev jest
   ```

2. Run the tests:
   ```bash
   npm test
   ```

---

## **Project Goals**

- Focus on implementing **correct logic** to manage spaced repetition schedules.
- Build a functional **frontend** without spending time on UI styling.
- Understand and apply **JavaScript** for dynamic content management.
- Make use of **LocalStorage** to store user data persistently.

---

## **Key Functions**

### **`calculateFutureDates(newTopic)`**

This function calculates spaced repetition dates for a given topic, including intervals of 1 week, 1 month, 3 months, 6 months, and 1 year.

### **`formatDate(dateString)`**

This function formats a given date string into a human-readable format like `10th February 2025`.

### **`deleteTopic(userId, index)`**

This function deletes a topic from the user's agenda stored in `LocalStorage` and updates the display.

### **`displayAgenda(userId)`**

This function displays a table of the user's agenda, sorted by upcoming revision dates. It also includes a delete button for each topic.

---


## **Contributing**

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and create a pull request.


