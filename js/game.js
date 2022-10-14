var game = game || {};
game = {
    Game: class {
        constructor() {
            this.board = document.getElementById('board');
            this.contentBoard = null;
            this.pacman = null;
            this.pacmanX = 4;
            this.pacmanY = 4;

            this.ghost1X = 0;
            this.ghost1Y = 0;

            this.ghost2X = 9;
            this.ghost2Y = 9;
            this.contentBoard = [
                [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 1, 1, 0, 1, 1],
                [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
            ];
            this.maxValue = this.contentBoard.length - 1;
        }

        setPacman() {
            this.contentBoard[this.pacmanX][this.pacmanY] = 'X';
        }

        setGhosts() {
            this.contentBoard[this.ghost1X][this.ghost1Y] = 'A';
            // this.contentBoard[this.ghost2X][this.ghost2Y] = 'A';
            // this.contentBoard[this.ghost3X][this.ghost3Y] = 'A';
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
            let complete = false;
            document.addEventListener('keyup', (e) => {
                switch (e.key) {
                    case 'ArrowUp':
                        if (this.pacmanX != 0 && this.contentBoard[this.pacmanX - 1][this.pacmanY] != 1) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanX--;
                            complete = true;
                        }
                        break;
                    case 'ArrowRight':
                        if (this.pacmanY != this.maxValue && this.contentBoard[this.pacmanX][this.pacmanY + 1] != 1) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanY++;
                            complete = true;
                        }
                        break;
                    case 'ArrowDown':
                        if (this.pacmanX != this.maxValue && this.contentBoard[this.pacmanX + 1][this.pacmanY] != 1) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanX++;
                            complete = true;
                        }
                        break;
                    case 'ArrowLeft':
                        if (this.pacmanY != 0 && this.contentBoard[this.pacmanX][this.pacmanY - 1] != 1) {
                            this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                            this.pacmanY--;
                            complete = true;
                        }
                        break;
                }

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

                this.contentBoard[this.pacmanX][this.pacmanY] = 'X';
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

            switch (option) {
                case 'up':
                    if (x != 0 && this.contentBoard[x - 1][y] != 1) {
                        this.contentBoard[x][y] = 0;
                        x--;
                    }
                    break;
                case 'right':
                    if (y != this.maxValue && this.contentBoard[x][y + 1] != 1) {
                        this.contentBoard[x][y] = 0;
                        y++;
                    }
                    break;
                case 'down':
                    if (x != this.maxValue && this.contentBoard[x + 1][y] != 1) {
                        this.contentBoard[x][y] = 0;
                        x++;
                    }
                    break;
                case 'left':
                    if (y != 0 && this.contentBoard[x][y - 1] != 1) {
                        this.contentBoard[x][y] = 0;
                        y--;
                    }
                    break;
            }

            this.contentBoard[x][y] = 'A';
            return [x, y];
        }

        checkOptions(x, y) {
            let options = [];

            if (x != 0 && this.contentBoard[x - 1][y] != 1) options.push('up');
            if (y != this.maxValue && this.contentBoard[x][y + 1] != 1) options.push('right');
            if (x != this.maxValue && this.contentBoard[x + 1][y] != 1) options.push('down');
            if (y != 0 && this.contentBoard[x][y - 1] != 1) options.push('left');

            return options;
        }
    }
}