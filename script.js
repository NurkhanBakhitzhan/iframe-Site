const games = [
    {
        title: "Угадай свой город",
        description: "Проверьте, насколько хорошо вы знаете свой город и его достопримечательности.",
        image: "images/WheresYourCountry.avif",
        iframeSrc: "https://g.igroutka.ru/games/864/gz97lcMRaCK5vp6u/aa6d935a-3584-4783-9e39-03e49dd0e347/index.html"
    },
    {
        title: "Игра Правда или Ложь: Факты",
        description: "Проверьте насколько хорошо осведомлены по поводу окружающей среды и всего, что связано с ней.",
        image: "images/TrueOrFalse.avif",
        iframeSrc: "https://igroutka.ru/loader/game/41561/"
    },
    {
        title: "Игра Угадай Чей Флаг 2",
        description: "Если у тебя есть желание проверить, насколько хорошо ты знаешь страны.",
        image: "images/GuesstheFlag.avif",
        iframeSrc: "https://igroutka.ru/loader/game/42199/"
    },
    {
        title: "Игра Тест: Какой Ты Мем?",
        description: "Выясни, какой мем ты представляешь, пройдя забавный тест!",
        image: "images/QuizWhatKindofMemeAreYou.avif",
        iframeSrc: "https://igroutka.ru/loader/game/42617/"
    }
];

function changeGame(title, description, image, iframeSrc) {
    const gameFrame = document.getElementById('game-frame');

    moveCurrentGameToList();

    // Обновляем название и описание только на первом экране
    document.getElementById('main-title').textContent = title;
    document.getElementById('main-description').textContent = description;
    document.getElementById('main-image').src = image;
    
    // Устанавливаем iframe на втором экране
    gameFrame.src = iframeSrc;

    removeGameFromList(title);
}

function moveCurrentGameToList() {
    const currentTitle = document.getElementById('main-title').textContent;
    const currentDescription = document.getElementById('main-description').textContent;
    const currentImage = document.getElementById('main-image').src;
    const currentIframeSrc = document.getElementById('game-frame').src;

    if (!currentTitle || !currentDescription || !currentImage) return;

    const gameList = document.querySelector('.game-list');

    // Убедимся, что карточка с "Loading" не будет добавлена в список
    if (currentTitle === "Loading...") return;

    const existingGame = Array.from(gameList.children).find(
        (item) => item.querySelector('h3').textContent === currentTitle
    );

    if (!existingGame) {
        const gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameItem.setAttribute(
            'onclick',
            `changeGame('${currentTitle}', '${currentDescription}', '${currentImage}', '${currentIframeSrc}')`
        );
        gameItem.innerHTML = `
            <img src="${currentImage}" alt="${currentTitle}">
            <h3>${currentTitle}</h3>
            <p>${currentDescription}</p>
        `;
        gameList.appendChild(gameItem);
    }
}

function removeGameFromList(title) {
    const gameList = document.querySelector('.game-list');
    const existingGame = Array.from(gameList.children).find(
        (item) => item.querySelector('h3').textContent === title
    );

    if (existingGame) {
        existingGame.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const randomIndex = Math.floor(Math.random() * games.length);
    const selectedGame = games[randomIndex];

    changeGame(
        selectedGame.title,
        selectedGame.description,
        selectedGame.image,
        selectedGame.iframeSrc
    );

    const gameList = document.querySelector('.game-list');
    games.forEach((game, index) => {
        if (index !== randomIndex) {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');
            gameItem.setAttribute(
                'onclick',
                `changeGame('${game.title}', '${game.description}', '${game.image}', '${game.iframeSrc}')`
            );
            gameItem.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
            `;
            gameList.appendChild(gameItem);
        }
    });
});
