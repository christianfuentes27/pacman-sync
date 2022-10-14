var game = game || {};
game = {
    Game: class {
        constructor() {
            this.board = document.getElementById('board');
            this.contentBoard = null;
            this.pacman = null;
            this.positionX = 2;
            this.positionY = 2;
            this.contentBoard = [
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 'X', 0, 0],
                [0, 0, 1, 1, 1],
                [0, 0, 0, 0, 0]
            ];
            this.maxValue = this.contentBoard.length - 1;
        }

        // setPacman() {
        //     this.pacman = this.board.children[this.positionX].children[this.positionY];
        //     this.pacman.setAttribute('id', 'pacman');
        //     this.pacman.innerHTML = 'X';
        // }

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
                switch (e.key) {
                    case ('ArrowUp'):
                        if (this.positionX != 0 && this.contentBoard[this.positionX - 1][this.positionY] != 1) {
                            this.contentBoard[this.positionX][this.positionY] = 0;
                            this.positionX--;
                        }
                        break;
                    case ('ArrowRight'):
                        if (this.positionY != this.maxValue && this.contentBoard[this.positionX][this.positionY + 1] != 1) {
                            this.contentBoard[this.positionX][this.positionY] = 0;
                            this.positionY++;
                        }
                        break;
                    case ('ArrowDown'):
                        if (this.positionX != this.maxValue && this.contentBoard[this.positionX + 1][this.positionY] != 1) {
                            this.contentBoard[this.positionX][this.positionY] = 0;
                            this.positionX++;
                        }
                        break;
                    case ('ArrowLeft'):
                        if (this.positionY != 0 && this.contentBoard[this.positionX][this.positionY - 1] != 1) {
                            this.contentBoard[this.positionX][this.positionY] = 0;
                            this.positionY--;
                        }
                        break;
                }
                this.contentBoard[this.positionX][this.positionY] = 'X';
                this.board.textContent = '';
                this.render();
            });
        }
    }
}