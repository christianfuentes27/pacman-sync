var game = game || {};
game = {
    Game:class {
        constructor() {
            this.board = document.getElementById('board');
            this.contentBoard = null;
            this.pacman = null;
        }

        setPacman() {
            this.contentBoard[2][2] = 'X';
        }

        setBoard() {
            this.contentBoard = [
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1],
                [0, 0, 0, 0, 0]
            ]

            let fragment = document.createDocumentFragment();
            for(let i = 0; i < this.contentBoard.length; i++) {
                let row = document.createElement('div');
                row.classList.add('row');
                for(let j = 0; j < this.contentBoard.length; j++) {
                    let content = document.createElement('div');
                    content.innerHTML = this.contentBoard[i][j];
                    row.appendChild(content);
                }
                fragment.appendChild(row);
            }
            this.board.appendChild(fragment);
            this.setPacman();
        }

        movePacman() {
            
        }
    }
}