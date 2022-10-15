var game = game || {};
game = {
    Game: class {
        constructor() {
            this.board = document.getElementById('board');
            this.lose = document.getElementById('lose');
            this.btn = document.querySelector('.btn');
            this.contentBoard = null;
            this.pacman = null;
            
            this.pacmanX = 2;
            this.pacmanY = 2;

            this.ghost1X = 0;
            this.ghost1Y = 0;

            this.ghost2X = 4;
            this.ghost2Y = 4;
            this.contentBoard = [
                [0, 1, 0, 0, 0],
                [0, 1, 0, 1, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 1, 1, 0],
                [1, 0, 0, 0, 0]
                // [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
                // [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
                // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
                // [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // [1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
                // [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                // [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                // [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
            ];
            this.maxValue = this.contentBoard.length - 1;
        }

        setPacman() {
            this.contentBoard[this.pacmanX][this.pacmanY] = 'X';
        }

        setGhosts() {
            this.contentBoard[this.ghost1X][this.ghost1Y] = 'A';
            this.contentBoard[this.ghost2X][this.ghost2Y] = 'A';
        }

        render() {
            let fragment = document.createDocumentFragment();
            for (let i = 0; i < this.contentBoard.length; i++) {
                let row = document.createElement('div');
                row.classList.add('row');
                for (let j = 0; j < this.contentBoard.length; j++) {
                    let content = document.createElement('div');
                    content.innerHTML = this.contentBoard[i][j];
                    row.appendChild(content);
                }
                fragment.appendChild(row);
            }
            this.board.appendChild(fragment);
        }

        movePacman() {
            document.addEventListener('keyup', (e) => {
                let complete = false;
                switch (e.key) {
                    case 'ArrowUp':
                        if (this.moveUp()) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanX--;
                            complete = true;
                        }
                        break;
                    case 'ArrowRight':
                        if (this.moveRight()) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanY++;
                            complete = true;
                        }
                        break;
                    case 'ArrowDown':
                        if (this.moveDown()) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanX++;
                            complete = true;
                        }
                        break;
                    case 'ArrowLeft':
                        if (this.moveLeft()) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanY--;
                            complete = true;
                        }
                        break;
                }
                this.contentBoard[this.pacmanX][this.pacmanY] = 'X';

                if (complete) {
                    console.log('X: ' + this.ghost1X + ' Y: ' + this.ghost1Y);
                    let values1 = this.moveGhosts(this.ghost1X, this.ghost1Y);
                    this.ghost1X = values1[0];
                    this.ghost1Y = values1[1];
                    console.log('X: ' + this.ghost1X + ' Y: ' + this.ghost1Y);
                    let values2 = this.moveGhosts(this.ghost2X, this.ghost2Y);
                    this.ghost2X = values2[0];
                    this.ghost2Y = values2[1];
                }
                this.checkLose();
                this.board.textContent = '';
                this.render();
            });
        }

        moveGhosts(x, y) {
            let options = this.checkOptions(x, y);
            console.log(options);
            let index = Math.floor(Math.random() * options.length);
            let option = options[index];
            console.log(option);

            this.contentBoard[x][y] = 0;
            switch (option) {
                case 'up':
                    x--;
                    break;
                case 'right':
                    y++;
                    break;
                case 'down':
                    x++;
                    break;
                case 'left':
                    y--;
                    break;
            }

            this.contentBoard[x][y] = 'A';
            return [x, y];
        }

        checkOptions(x, y) {
            let options = [];

            if (x != 0
                && this.contentBoard[x - 1][y] != 1
                && this.contentBoard[x - 1][y] != 'A'
                && this.contentBoard[x - 1][y] != 'X') options.push('up');

            if (y != this.maxValue
                && this.contentBoard[x][y + 1] != 1
                && this.contentBoard[x][y + 1] != 'A'
                && this.contentBoard[x][y + 1] != 'X') options.push('right');

            if (x != this.maxValue
                && this.contentBoard[x + 1][y] != 1
                && this.contentBoard[x + 1][y] != 'A'
                && this.contentBoard[x + 1][y] != 'X') options.push('down');

            if (y != 0
                && this.contentBoard[x][y - 1] != 1
                && this.contentBoard[x][y - 1] != 'A'
                && this.contentBoard[x][y - 1] != 'X') options.push('left');

            return options;
        }

        moveUp() {
            return this.pacmanX != 0 && this.contentBoard[this.pacmanX - 1][this.pacmanY] != 1
                                    && this.contentBoard[this.pacmanX - 1][this.pacmanY] != 'A';
        }

        moveRight() {
            return this.pacmanY != this.maxValue && this.contentBoard[this.pacmanX][this.pacmanY + 1] != 1
                            && this.contentBoard[this.pacmanX][this.pacmanY + 1] != 'A';
        }

        moveDown() {
            return this.pacmanX != this.maxValue && this.contentBoard[this.pacmanX + 1][this.pacmanY] != 1
                            && this.contentBoard[this.pacmanX + 1][this.pacmanY] != 'A';
        }

        moveLeft() {
            return this.pacmanY != 0 && this.contentBoard[this.pacmanX][this.pacmanY - 1] != 1
                            && this.contentBoard[this.pacmanX][this.pacmanY - 1] != 'A';
        }

        checkLose() {
            if (!this.moveUp() && !this.moveRight() && !this.moveDown() && !this.moveLeft()) {
                this.lose.innerHTML = 'You lose';
            }
        }

        restart() {
            this.btn.addEventListener('click', () => window.location.reload());
        }
    }
}