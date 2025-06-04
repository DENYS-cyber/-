// МАСИВ завдань на день з емодзі
const tasks = [
  "Випити 1.5 л води 💧",
  "Зробити 8000 кроків 🚶‍♂️",
  "З'їсти овочі під час обіду 🥗",
  "Не їсти після 20:00 🚫",
  "15 хвилин медитації 🧘",
  "Зарядка зранку 🤸‍♀️"
];

// Функція для генерації випадкових завдань
function generateTasks() {
  const taskList = document.getElementById("dailyTasks"); // Отримуємо елемент списку завдань
  taskList.innerHTML = ""; // Очищаємо список перед новою генерацією
  const selected = tasks.sort(() => 0.5 - Math.random()).slice(0, 3); // Випадково вибираємо 3 завдання
  selected.forEach(task => { // Для кожного вибраного завдання
      const li = document.createElement("li"); // Створюємо новий елемент списку
      li.className = "list-group-item d-flex justify-content-between align-items-center"; // Додаємо Bootstrap класи
      li.innerHTML = `<span>${task}</span> <input type='checkbox' class='form-check-input'>`; // Додаємо текст завдання та чекбокс
      taskList.appendChild(li); // Додаємо елемент у DOM
  });
}

// МАСИВ для збереження записів їжі
let entries = [];
const form = document.getElementById("foodForm"); // Отримуємо форму
const foodList = document.getElementById("foodList"); // Отримуємо список продуктів
const calorieChart = document.getElementById("calorieChart").getContext("2d"); // Отримуємо контекст для графіку калорій
let chart; // Змінна для збереження об'єкта графіку

// Обробник події відправки форми
form.addEventListener("submit", function(e) {
  e.preventDefault(); // Скасовуємо стандартну поведінку форми (перезавантаження сторінки)
  const food = document.getElementById("food").value; // Отримуємо введену назву продукту
  const calories = parseInt(document.getElementById("calories").value); // Отримуємо введену кількість калорій
  entries.push({ food, calories }); // Додаємо запис до масиву
  updateFoodList(); // Оновлюємо список продуктів
  updateChart(); // Оновлюємо графік калорій
  form.reset(); // Очищаємо форму після додавання запису
});

// Функція оновлення списку введених продуктів
function updateFoodList() {
  foodList.innerHTML = ""; // Очищаємо список
  entries.forEach(entry => { // Для кожного запису
      const li = document.createElement("li"); // Створюємо новий елемент списку
      li.className = "list-group-item"; // Додаємо клас Bootstrap
      li.innerText = `${entry.food}: ${entry.calories} ккал`; // Виводимо назву продукту та калорії
      foodList.appendChild(li); // Додаємо елемент у DOM
  });
}

// Функція оновлення графіку калорій
function updateChart() {
  const labels = entries.map(e => e.food); // Отримуємо масив назв продуктів
  const data = entries.map(e => e.calories); // Отримуємо масив калорій
  if (chart) chart.destroy(); // Якщо графік існує — видаляємо його
  chart = new Chart(calorieChart, { // Створюємо новий графік
      type: 'bar', // Тип графіку — стовпчиковий
      data: {
          labels: labels, // Підписи на осі X
          datasets: [{
              label: 'Калорії', // Назва набору даних
              data: data, // Дані (калорії)
              backgroundColor: 'rgba(75, 192, 192, 0.6)' // Колір стовпчиків
          }]
      },
      options: {
          responsive: true, // Адаптивність для різних екранів
          plugins: {
              legend: { display: false } // Приховати легенду
          }
      }
  });
}

// Функція для розрахунку індексу маси тіла (ІМТ)
function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value); // Отримуємо введене зростання (см)
  const weight = parseFloat(document.getElementById("weight").value); // Отримуємо введену вагу (кг)
  const result = document.getElementById("bmiResult"); // Отримуємо елемент для виводу результату
  if (!height || !weight) { // Перевірка на правильність введення
    result.textContent = "Будь ласка, введіть коректні дані."; // Виводимо повідомлення про помилку
    return; // Вихід з функції
  }
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1); // Формула розрахунку ІМТ з округленням до 1 знаку
  let status = ""; // Змінна для статусу
  if (bmi < 18.5) status = "Недостатня вага"; // Менше 18.5 — недостатня вага
  else if (bmi < 24.9) status = "Норма"; // До 24.9 — норма
  else if (bmi < 29.9) status = "Надмірна вага"; // До 29.9 — надмірна вага
  else status = "Ожиріння"; // Понад 30 — ожиріння
  result.textContent = `Ваш ІМТ: ${bmi} (${status})`; // Виводимо результат
}

// МАСИВ мотиваційних цитат
const quotes = [
  "Здоров'я — це ще не все, але все без здоров'я — ніщо. – Сократ",
  "Найкращий час для змін — зараз!",
  "Щоденна дисципліна творить великі речі.",
  "Твоє тіло — твоя домівка. Дбай про нього.",
  "Рух — це життя. Не зупиняйся."
];

// Функція генерації випадкової цитати
function generateQuote() {
  const q = document.getElementById("quoteText"); // Отримуємо елемент цитати
  const random = quotes[Math.floor(Math.random() * quotes.length)]; // Вибираємо випадкову цитату
  q.textContent = random; // Встановлюємо текст цитати
}

// МАСИВ рецептів з описом та калорійністю
const recipes = [
  { title: "Смузі зі шпинатом", desc: "Шпинат, банан, яблуко, кефір", kcal: 220 },
  { title: "Овочевий салат", desc: "Помідори, огірки, оливкова олія, лимон", kcal: 180 },
  { title: "Каша з насінням льону", desc: "Вівсянка, лляне насіння, мед", kcal: 250 },
  { title: "Йогуртовий перекус", desc: "Йогурт, ягоди, грецькі горіхи", kcal: 200 }
];

// При завантаженні сторінки виконується наступне
window.onload = function() {
  generateTasks(); // Генеруємо завдання на день
  const cards = document.getElementById("recipeCards"); // Отримуємо контейнер для рецептів
  recipes.forEach(r => { // Для кожного рецепту
      const div = document.createElement("div"); // Створюємо новий блок
      div.className = "col-md-6 col-lg-4 mb-4"; // Додаємо Bootstrap класи
      div.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${r.title}</h5> <!-- Назва рецепту -->
          <p class="card-text">${r.desc}</p> <!-- Опис рецепту -->
          <p class="text-muted">${r.kcal} ккал</p> <!-- Калорійність -->
        </div>
      </div>`; // HTML-контент картки
      cards.appendChild(div); // Додаємо картку в DOM
  });
};
