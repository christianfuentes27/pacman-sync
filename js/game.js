var game = game || {};
game = {
    Game: class {
        constructor() {
            this.board = document.getElementById('board');
            this.lose = document.getElementById('lose');
            this.btn = document.querySelector('.btn');
            this.contentBoard = null;
            this.able = true;

            this.pacmanX = 2;
            this.pacmanY = 8;

            this.ghost1X = 0;
            this.ghost1Y = 0;

            this.ghost2X = 8;
            this.ghost2Y = 17;
            this.contentBoard = [
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0],
                [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
            ];
            this.maxValueX = this.contentBoard.length - 1;
            this.maxValueY = this.contentBoard[0].length - 1;
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
                for (let j = 0; j < this.contentBoard[0].length; j++) {
                    let content = document.createElement('div');
                    content.innerHTML = this.contentBoard[i][j];
                    row.appendChild(content);
                }
                fragment.appendChild(row);
            }
            this.board.appendChild(fragment);
        }

        movingPacman = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (this.pacmanX != 0 && this.contentBoard[this.pacmanX - 1][this.pacmanY] == 0) {
                        this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                        this.pacmanX--;
                    }
                    break;
                case 'ArrowRight':
                    if (this.pacmanY != this.maxValueY && this.contentBoard[this.pacmanX][this.pacmanY + 1] == 0) {
                        this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                        this.pacmanY++;
                    }
                    break;
                case 'ArrowDown':
                    if (this.pacmanX != this.maxValueX && this.contentBoard[this.pacmanX + 1][this.pacmanY] == 0) {
                        this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                        this.pacmanX++;
                    }
                    break;
                case 'ArrowLeft':
                    if (this.pacmanY != 0 && this.contentBoard[this.pacmanX][this.pacmanY - 1] == 0) {
                        this.contentBoard[this.pacmanX][this.pacmanY] = 0;
                        this.pacmanY--;
                    }
                    break;
            }
            this.contentBoard[this.pacmanX][this.pacmanY] = 'X';

            let values1 = this.moveGhosts(this.ghost1X, this.ghost1Y);
            this.ghost1X = values1[0];
            this.ghost1Y = values1[1];
            let values2 = this.moveGhosts(this.ghost2X, this.ghost2Y);
            this.ghost2X = values2[0];
            this.ghost2Y = values2[1];

            this.checkLose();
            this.board.textContent = '';
            this.render();
        }

        movePacman() {
            document.addEventListener('keyup', this.movingPacman);
        }

        moveGhosts(x, y) {
            let option = this.findPacman(x, y, this.checkOptions(x, y));

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

            if (x != 0 && this.contentBoard[x - 1][y] != 1 && this.contentBoard[x - 1][y] != 'A') options.push('up');
            if (y != this.maxValueY && this.contentBoard[x][y + 1] != 1 && this.contentBoard[x][y + 1] != 'A') options.push('right');
            if (x != this.maxValueX && this.contentBoard[x + 1][y] != 1 && this.contentBoard[x + 1][y] != 'A') options.push('down');
            if (y != 0 && this.contentBoard[x][y - 1] != 1 && this.contentBoard[x][y - 1] != 'A') options.push('left');
            
            return options;
        }

        findPacman(x, y, options) {
            let selected = null;
            if (x > this.pacmanX && options.includes('up')) selected = 'up';
            else if (y > this.pacmanY && options.includes('left')) selected = 'left';
            else if (x < this.pacmanX && options.includes('down')) selected = 'down';
            else if (y < this.pacmanY && options.includes('right')) selected = 'right';
            else {
                let index = Math.floor(Math.random() * options.length);
                selected = options[index];
            }

            return selected;
        }

        checkLose() {
            if (this.contentBoard[this.pacmanX][this.pacmanY] != 'X') {
                this.lose.style.display = 'block';
                document.removeEventListener('keyup', this.movingPacman);
            }
        }

        restart() {
            this.btn.addEventListener('click', () => window.location.reload());
        }

        init() {
            this.setPacman();
            this.setGhosts();
            this.render();
            this.movePacman();
            this.restart();
        }
    }
}