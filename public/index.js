document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("money-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Extract values from the form
    const userId = "5f3e3d9f4d2d4a4567890123";
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;
    updateDashboard(type, amount, date, note);
    // Prepare the formData object
    const formData = { type, amount, date, note };

    try {
      // Attempt to send the form data to the server
      const response = await fetch("/add-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

function updateDashboard(type, amount, date, note) {
  // Select the parent element based on the type
  const parentElement = document.getElementById(
    type === "expense" ? "expenses" : "earnings"
  );

  // Create the list item
  const listItem = document.createElement("li");
  listItem.classList.add("entry");

  // Format the date for display
  const displayDate = new Date(date).toLocaleDateString();

  // Set the text content
  listItem.textContent = `${displayDate} - ₹${amount} - ${note}`;

  // Append the new entry to the list
  parentElement.querySelector("ul").appendChild(listItem);
}
