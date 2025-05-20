function hideIncompleteRows() {
            const cardsWidth = document.querySelector('.cards').offsetWidth
            const gap = 20; // Совпадает с CSS gap
            const minSize = 115;
            const maxSize = 150;

            // Ширина доступного пространства (минус gap)
            const availableWidth = cardsWidth - gap;

            // Максимальное возможное количество колонок
            let columns = Math.floor(availableWidth / (maxSize + gap));

            // Проверяем, чтобы все колонки были ≥ minSize
            while (columns > 0 && (availableWidth / columns - gap) < minSize) {
                columns--;
            }

            const items = document.querySelectorAll('.card');
            const itemsPerRow = columns; // Колонок в ряду

            // Подсчет карточек
            items.forEach(item => item.style.display = 'block');

            // Проверка последнего ряда
            const fullRows = Math.floor(items.length / itemsPerRow);
            const cutoff = fullRows * itemsPerRow;

            // Скрываем неполный последний ряд
            for (let i = cutoff; i < items.length; i++) {
                items[i].style.display = 'none';
            }
        }

        // Запускаем при загрузке и ресайзе
        window.addEventListener('load', hideIncompleteRows);
        window.addEventListener('resize', hideIncompleteRows);