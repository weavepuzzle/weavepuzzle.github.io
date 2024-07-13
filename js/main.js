document.querySelector('.btn-start-4x4').addEventListener('click', () => {
    startGame(4);
});

document.querySelector('.btn-start-5x5').addEventListener('click', () => {
    startGame(5);
});

document.querySelector('.btn-start-6x6').addEventListener('click', () => {
    startGame(6);
});

function startGame(size) {
    let rows = size;
    let columns = size;

    for (let i = 1; i <= rows; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;

        document.querySelector('.set-color-idx').append(option);
    };

    let colors = ['#ff9999', '#ffc299', '#ffff99', '#b3ffb3', '#b3e0ff', '#d9b3ff'];
    let colorNames = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple'];
    function getRandomColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    let gameColors = [];
    let gameColorNames = [];
    for (let i = 0; i < size; i++) {
        let color = getRandomColor();
        let idx = colors.indexOf(color);
        colors.splice(idx, 1);
        gameColors.push(color);
        gameColorNames.push(colorNames[idx]);
        colorNames.splice(idx, 1);
    };

    for (let i = 0; i < gameColorNames.length; i++) {
        let option = document.createElement('option');
        option.value = gameColors[i];
        option.textContent = gameColorNames[i];

        document.querySelector('.set-color-color').append(option);
    };

    function getRandomGameColor() {
        return gameColors[Math.floor(Math.random() * gameColors.length)];
    };

    const gameBoard = document.querySelector('.game-board');
    for (let i = 1; i <= rows; i++) {
        const row = document.createElement('div');
        row.classList.add(`row-${i}`);

        gameBoard.append(row);
        for (let x = 1; x <= columns; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile', `tile-r${i}-c${x}`);

            document.querySelector(`.row-${i}`).append(tile);
        };
    };

    const goalBoard = document.querySelector('.goal-board');
    for (let i = 1; i <= rows; i++) {
        const row = document.createElement('div');
        row.classList.add(`row-g${i}`);

        goalBoard.append(row);
        for (let x = 1; x <= columns; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile', `tile-rg${i}-cg${x}`);

            document.querySelector(`.row-g${i}`).append(tile);
        };
    };
    for (let i = 0; i < rows * columns; i++) {
        setRandomColumnColor();
    };

    function setRandomColumnColor() {
        let dir = (getRandomNum(1, 2) == 1) ? 'r' : 'c';
        let idx = getRandomNum(1, size);
        let color = getRandomGameColor();
        let tiles = document.querySelectorAll(`div[class*='${dir}g${idx}']`);
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].style.background = color;
        };
    };

    document.querySelector('.btn-set-color').addEventListener('click', () => {
        let dir = document.querySelector('.set-color-dir').value;
        let idx = document.querySelector('.set-color-idx').value;
        let color = document.querySelector('.set-color-color').value;

        let tiles = document.querySelectorAll(`div[class*='${dir}${idx}']`);
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].style.background = color;
        };

        setTimeout(checkForWin, 1);
    });
    
    document.querySelector('.btn-reset-board').addEventListener('click', () => {
        let tiles = document.querySelectorAll("div[class*='tile-r']");
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].className.includes('rg')) continue;
            tiles[i].style.background = 'gray';
        };
    });

    function checkForWin() {
        let win = true;
        let numOfTiles = rows * columns;
        for (let i = 1; i <= rows; i++) {
            for (let x = 1; x <= columns; x++) {
                let tile = document.querySelector(`.tile-r${i}-c${x}`);
                let tileColor = window.getComputedStyle(tile).backgroundColor;

                let goalTile = document.querySelector(`.tile-rg${i}-cg${x}`);
                let goalTileColor = window.getComputedStyle(goalTile).backgroundColor;

                if (tileColor != goalTileColor) win = false;
            };
        };

        if (win == true) alert('Congratualtions! You won!');
    };

    document.querySelector('.title').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
};

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
