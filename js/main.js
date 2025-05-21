function hideIncompleteRows() {
  const cardsWidth = document.querySelector(".cards").offsetWidth;
  const gap = 20; // Совпадает с CSS gap
  const minSize = 115;
  const maxSize = 150;

  // Ширина доступного пространства (минус gap)
  const availableWidth = cardsWidth - gap;

  // Максимальное возможное количество колонок
  let columns = Math.floor(availableWidth / (maxSize + gap));

  // Проверяем, чтобы все колонки были ≥ minSize
  while (columns > 0 && availableWidth / columns - gap < minSize) {
    columns--;
  }

  const items = document.querySelectorAll(".card");
  const itemsPerRow = columns; // Колонок в ряду

  // Подсчет карточек
  items.forEach((item) => (item.style.display = "block"));

  // Проверка последнего ряда
  const fullRows = Math.floor(items.length / itemsPerRow);
  const cutoff = fullRows * itemsPerRow;

  // Скрываем неполный последний ряд
  for (let i = cutoff; i < items.length; i++) {
    items[i].style.display = "none";
  }
}

// Запускаем при загрузке и ресайзе
window.addEventListener("load", hideIncompleteRows);
window.addEventListener("resize", hideIncompleteRows);

const menu = document.querySelector(".menu");
const body = document.body;
let scrollPosition = 0;

// Настройка наблюдателя за меню
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Меню стало видимым - блокируем скролл
        scrollPosition = window.pageYOffset;
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollPosition}px`;
        body.style.width = "100%";
      } else {
        // Меню скрыто - разблокируем скролл
        body.style.removeProperty("overflow");
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("width");
        window.scrollTo(0, scrollPosition);
      }
    });
  },
  { threshold: 0.1 }
);

// Начинаем наблюдение за меню
observer.observe(menu);
