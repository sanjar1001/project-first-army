const URL_APP = "https://script.google.com/macros/s/AKfycbx5AEia7SiOzfyhl4inYCnfIyj25bE2mlktgurUHgQFCp-IRBcfLf7QFbULXxU_2daH/exec";

// находим форму
const form = document.querySelector("#form");

// проверка обязательных полей
function isFilled(details) {
  const { departament, fio, rank, phone, birthday, car, family, children, rule } = details;
  if (!departament || !fio || !rank || !phone || !birthday || !car || !family || !children || !rule) return false;
  return true;
}

// обработчик отправки формы
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  // 2. Теперь собираем данные формы 
  const details = {
    departament: form.departament.value,
    fio: form.fio.value.trim(),
    rank: form.rank.value,
    phone: form.phone.value.trim(),
    birthday: form.birthday.value,
    car: form.car.value,
    family: form.family.value,
    children: form.children.value,
    rule: form.rule.checked
  };

  if (!isFilled(details)) return alert("Заполните все обязательные поля");
  // формируем x-www-form-urlencoded
  let formBody = [];
  for (let key in details) {
    formBody.push(encodeURIComponent(key) + "=" + encodeURIComponent(details[key]));
  }
  formBody = formBody.join("&");

  try {
    const result = await fetch(URL_APP, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: formBody
    }).then(res => res.json());

    if (result.type === "success") {
      form.reset();
      alert("Спасибо! Заявка отправлена");
    } else {
      alert("Ошибка: " + JSON.stringify(result.errors));
    }
  } catch (err) {
    alert("Ошибка отправки");
  }
});

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("splash").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("splash").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }, 600);
  }, 2000);
});

