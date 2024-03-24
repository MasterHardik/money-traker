document.addEventListener("DOMContentLoaded", async function () {
  await fetchAndDisplayEntries();
  const form = document.getElementById("money-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const note = document.getElementById("note").value;

    const formData = { type, amount, date, note };

    try {
      const response = await fetch("/add-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        updateDashboard(type, amount, date, note);
        alert("Entry added successfully!");
        form.reset();
      } else {
        const errorData = await response.json();
        console.error("Error adding entry:", errorData.message);
        alert(`Failed to add entry: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

async function fetchAndDisplayEntries() {
  try {
    const response = await fetch("/get-entries");
    const entries = await response.json();

    entries.forEach((entry) => {
      updateDashboard(entry.type, entry.amount, entry.date, entry.note);
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
}

function updateDashboard(type, amount, date, note) {
  const parentElement = document.getElementById(
    type === "expense" ? "expenses" : "earnings"
  );

  const listItem = document.createElement("li");
  listItem.classList.add("entry");

  const displayDate = new Date(date).toLocaleDateString();

  listItem.textContent = `${displayDate} - ₹${amount} - ${note}`;
  parentElement.querySelector("ul").appendChild(listItem);
}
