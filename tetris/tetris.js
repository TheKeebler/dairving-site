        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const nextCanvas = document.getElementById('nextPieceCanvas');
        const nextCtx = nextCanvas.getContext('2d');

        const COLS = 10;
        const ROWS = 20;
        const BLOCK_SIZE = 30;

        // Tetromino shapes
        const SHAPES = {
            I: [[1, 1, 1, 1]],
            O: [[1, 1], [1, 1]],
            T: [[0, 1, 0], [1, 1, 1]],
            S: [[0, 1, 1], [1, 1, 0]],
            Z: [[1, 1, 0], [0, 1, 1]],
            J: [[1, 0, 0], [1, 1, 1]],
            L: [[0, 0, 1], [1, 1, 1]]
        };

        const COLORS = {
            I: '#00f0f0',
            O: '#f0f000',
            T: '#a000f0',
            S: '#00f000',
            Z: '#f00000',
            J: '#0000f0',
            L: '#f0a000'
        };

        let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
        let score = 0;
        let lines = 0;
        let level = 1;
        let gameOver = false;
        let paused = false;
        let currentPiece = null;
        let nextPiece = null;
        let dropCounter = 0;
        let dropInterval = 1000;
        let lastTime = 0;

        class Piece {
            constructor(shape, color) {
                this.shape = SHAPES[shape];
                this.color = COLORS[shape];
                this.type = shape;
                this.x = Math.floor(COLS / 2) - Math.floor(this.shape[0].length / 2);
                this.y = 0;
            }

            rotate() {
                const newShape = this.shape[0].map((_, i) =>
                    this.shape.map(row => row[i]).reverse()
                );
                
                const previousShape = this.shape;
                this.shape = newShape;
                
                if (this.collides()) {
                    this.shape = previousShape;
                }
            }

            collides() {
                for (let y = 0; y < this.shape.length; y++) {
                    for (let x = 0; x < this.shape[y].length; x++) {
                        if (this.shape[y][x]) {
                            const newX = this.x + x;
                            const newY = this.y + y;
                            
                            if (newX < 0 || newX >= COLS || newY >= ROWS) {
                                return true;
                            }
                            if (newY >= 0 && board[newY][newX]) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            }

            merge() {
                for (let y = 0; y < this.shape.length; y++) {
                    for (let x = 0; x < this.shape[y].length; x++) {
                        if (this.shape[y][x]) {
                            const boardY = this.y + y;
                            const boardX = this.x + x;
                            if (boardY >= 0) {
                                board[boardY][boardX] = this.color;
                            }
                        }
                    }
                }
            }
        }

        function createRandomPiece() {
            const shapes = Object.keys(SHAPES);
            const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
            return new Piece(randomShape, randomShape);
        }

        function drawBlock(x, y, color, context = ctx) {
            context.fillStyle = color;
            context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            
            context.strokeStyle = '#000';
            context.lineWidth = 2;
            context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            
            context.fillStyle = 'rgba(255, 255, 255, 0.3)';
            context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE / 3, BLOCK_SIZE / 3);
        }

        function drawBoard() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let y = 0; y < ROWS; y++) {
                for (let x = 0; x < COLS; x++) {
                    if (board[y][x]) {
                        drawBlock(x, y, board[y][x]);
                    }
                }
            }
        }

        function drawPiece(piece, context = ctx, offsetX = 0, offsetY = 0) {
            for (let y = 0; y < piece.shape.length; y++) {
                for (let x = 0; x < piece.shape[y].length; x++) {
                    if (piece.shape[y][x]) {
                        drawBlock(piece.x + x + offsetX, piece.y + y + offsetY, piece.color, context);
                    }
                }
            }
        }

        function drawNextPiece() {
            nextCtx.fillStyle = '#000';
            nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
            
            if (nextPiece) {
                const offsetX = (4 - nextPiece.shape[0].length) / 2;
                const offsetY = (4 - nextPiece.shape.length) / 2;
                
                for (let y = 0; y < nextPiece.shape.length; y++) {
                    for (let x = 0; x < nextPiece.shape[y].length; x++) {
                        if (nextPiece.shape[y][x]) {
                            drawBlock(x + offsetX, y + offsetY, nextPiece.color, nextCtx);
                        }
                    }
                }
            }
        }

        function movePiece(dir) {
            currentPiece.x += dir;
            if (currentPiece.collides()) {
                currentPiece.x -= dir;
            }
        }

        function dropPiece() {
            currentPiece.y++;
            if (currentPiece.collides()) {
                currentPiece.y--;
                currentPiece.merge();
                clearLines();
                spawnPiece();
                return false;
            }
            return true;
        }

        function hardDrop() {
            while (dropPiece()) {
                score += 2;
            }
            updateScore();
        }

        function clearLines() {
            let linesCleared = 0;
            
            for (let y = ROWS - 1; y >= 0; y--) {
                if (board[y].every(cell => cell !== 0)) {
                    board.splice(y, 1);
                    board.unshift(Array(COLS).fill(0));
                    linesCleared++;
                    y++;
                }
            }
            
            if (linesCleared > 0) {
                lines += linesCleared;
                const points = [0, 100, 300, 500, 800][linesCleared];
                score += points * level;
                
                level = Math.floor(lines / 10) + 1;
                dropInterval = Math.max(100, 1000 - (level - 1) * 100);
                
                updateScore();
            }
        }

        function spawnPiece() {
            currentPiece = nextPiece || createRandomPiece();
            nextPiece = createRandomPiece();
            drawNextPiece();
            
            if (currentPiece.collides()) {
                endGame();
            }
        }

        function updateScore() {
            document.getElementById('score').textContent = score;
            document.getElementById('lines').textContent = lines;
            document.getElementById('level').textContent = level;
        }

        function endGame() {
            gameOver = true;
            document.getElementById('finalScore').textContent = score;
            document.getElementById('finalLines').textContent = lines;
            document.getElementById('finalLevel').textContent = level;
            document.getElementById('gameOverOverlay').style.display = 'flex';
        }

        function restartGame() {
            board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
            score = 0;
            lines = 0;
            level = 1;
            gameOver = false;
            paused = false;
            dropInterval = 1000;
            currentPiece = null;
            nextPiece = null;
            
            document.getElementById('gameOverOverlay').style.display = 'none';
            document.getElementById('pausedOverlay').style.display = 'none';
            
            updateScore();
            spawnPiece();
            requestAnimationFrame(gameLoop);
        }

        function togglePause() {
            if (!gameOver) {
                paused = !paused;
                document.getElementById('pausedOverlay').style.display = paused ? 'block' : 'none';
            }
        }

        function gameLoop(time = 0) {
            if (gameOver) return;
            
            if (!paused) {
                const deltaTime = time - lastTime;
                lastTime = time;
                dropCounter += deltaTime;
                
                if (dropCounter > dropInterval) {
                    dropPiece();
                    dropCounter = 0;
                }
                
                drawBoard();
                drawPiece(currentPiece);
            }
            
            requestAnimationFrame(gameLoop);
        }

        document.addEventListener('keydown', (e) => {
            if (gameOver) return;
            
            if (e.key === 'p' || e.key === 'P') {
                togglePause();
                return;
            }
            
            if (paused) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    movePiece(-1);
                    break;
                case 'ArrowRight':
                    movePiece(1);
                    break;
                case 'ArrowDown':
                    if (dropPiece()) {
                        score += 1;
                        updateScore();
                    }
                    dropCounter = 0;
                    break;
                case 'ArrowUp':
                case 'x':
                case 'X':
                    currentPiece.rotate();
                    break;
                case ' ':
                    e.preventDefault();
                    hardDrop();
                    break;
            }
        });

        // Mobile touch controls
        function setupMobileControls() {
            const leftBtn = document.getElementById('leftBtn');
            const rightBtn = document.getElementById('rightBtn');
            const downBtn = document.getElementById('downBtn');
            const rotateBtn = document.getElementById('rotateBtn');
            const dropBtn = document.getElementById('dropBtn');

            leftBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!gameOver && !paused) movePiece(-1);
            });

            rightBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!gameOver && !paused) movePiece(1);
            });

            downBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!gameOver && !paused) {
                    if (dropPiece()) {
                        score += 1;
                        updateScore();
                    }
                    dropCounter = 0;
                }
            });

            rotateBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!gameOver && !paused) currentPiece.rotate();
            });

            dropBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                if (!gameOver && !paused) hardDrop();
            });

            // Also support mouse clicks for testing
            leftBtn.addEventListener('click', () => {
                if (!gameOver && !paused) movePiece(-1);
            });

            rightBtn.addEventListener('click', () => {
                if (!gameOver && !paused) movePiece(1);
            });

            downBtn.addEventListener('click', () => {
                if (!gameOver && !paused) {
                    if (dropPiece()) {
                        score += 1;
                        updateScore();
                    }
                    dropCounter = 0;
                }
            });

            rotateBtn.addEventListener('click', () => {
                if (!gameOver && !paused) currentPiece.rotate();
            });

            dropBtn.addEventListener('click', () => {
                if (!gameOver && !paused) hardDrop();
            });
        }

        // Start the game
        setupMobileControls();
        spawnPiece();
        requestAnimationFrame(gameLoop);
    
const music = document.getElementById("tetrisMusic");

function startMusic(){
  music.volume = 0.4;
  music.play();
}

document.addEventListener("keydown", startMusic, { once: true });
document.addEventListener("click", startMusic, { once: true });

document.getElementById('playAgainBtn').addEventListener('click', restartGame);
