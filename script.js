document.addEventListener("DOMContentLoaded", () => {

const URL_APP = "https://script.google.com/macros/s/AKfycbwYZ4XGss0c2dgvyEwvjv5H4EJDk00D3cmDd03Fy60LmV3zCef-KhIFKfVhXCbLKV-a/exec";

const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const formData = new FormData(form);

  const data = new URLSearchParams();

  for (const pair of formData) {
    data.append(pair[0], pair[1]);
  }

  try {

    const response = await fetch(URL_APP, {
      method: "POST",
      body: data
    });

    const result = await response.json();

    if (result.type === "success") {

      form.reset();
      alert("Спасибо! Заявка отправлена");

    } else {

      alert("Ошибка: " + JSON.stringify(result.errors));

    }

  } catch (error) {

    alert("Ошибка отправки");

  }

});

});