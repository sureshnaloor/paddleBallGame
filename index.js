
const grid = document.querySelector('.grid')

const blockWidth = 100
const blockHeight = 20

// game state variables
let gameStopped = true

// create block class

class Block {
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis+blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// //draw block

// function addBlock(){
//     const block = document.createElement('div');
// 	block.classList.add('block');
// 	block.style.left = 
// 	block.style.bottom = '50px';

// 	grid.appendChild(block);
// }

// addBlock()

// all blocks- 15 of them in 3 rows
const blocks = [
	new Block(10, 270),
	new Block(120, 270),
	new Block(230, 270),
	new Block(340, 270),
	new Block(450, 270),
	new Block(10, 270),
	new Block(10, 240),
	new Block(120, 240),
	new Block(230, 240),
	new Block(340, 240),
	new Block(450, 240),
	new Block(10, 210),
	new Block(120, 210),
	new Block(230, 210),
	new Block(340, 210),
	new Block(450, 210),
	new Block(10, 180),
	new Block(120, 180),
	new Block(230, 180),
	new Block(340, 180),
	new Block(450, 180),
];

// draw all blocks
function addBlocks(){
for (let i=0; i<blocks.length; i++){
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)    
}
}
addBlocks()

// now add the paddle of user

// let userStart = [240,10]
const currentPosPaddle = [240,10]
function addPaddle() {
    const paddle = document.createElement('div')
    paddle.classList.add('paddle')
    paddle.style.left = currentPosPaddle[0] + 'px'
    paddle.style.bottom = currentPosPaddle[1] + 'px'
    grid.appendChild(paddle)
}

addPaddle()

// now move the paddle when user uses arrow 
const paddle = document.querySelector('.paddle')
document.addEventListener('keydown', moveUser)

function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosPaddle[0] > 0){
                currentPosPaddle[0] -= 10;
				paddle.style.left = currentPosPaddle[0] + 'px';
				paddle.style.bottom = currentPosPaddle[1] + 'px';
            }
            break;
        case 'ArrowRight':
           if(currentPosPaddle[0] < 560-blockWidth){
                currentPosPaddle[0] += 10;
				paddle.style.left = currentPosPaddle[0] + 'px';
				paddle.style.bottom = currentPosPaddle[1] + 'px'; 
            }
            break;
        default:
            break;
    }
}

// draw the ball

const currentPosBall = [270, 30];
const ballDiameter = 20

function drawBall() {
	const ball = document.createElement('div');
	ball.classList.add('ball');
	ball.style.left = currentPosBall[0] + 'px';
	ball.style.bottom = currentPosBall[1] + 'px';
	grid.appendChild(ball);
}

drawBall();

const ball = document.querySelector('.ball')
const speedBall =40;

// moveBall
let xDirection = 2
let yDirection = 2

const moveBall = () => {
    currentPosBall[0] +=xDirection
    currentPosBall[1] +=yDirection
    ball.style.left = currentPosBall[0] + 'px'
    ball.style.bottom = currentPosBall[1] + 'px'
    // checkForCollisions()
    // if ball collides with paddle (down) or wall (up)  ball rebounds
    
    // collision with wall above or side wall to right or wall to left

    if((currentPosBall[0] >= 560-ballDiameter) ||  (currentPosBall[1] >= 300-ballDiameter)
    || (currentPosBall[0] <= 0 )){
        reverseBall()
    }

    // collision with paddle down
    if(currentPosBall[0] >= currentPosPaddle[0] && currentPosBall[0] <= currentPosPaddle[0] + 100
        && currentPosBall[1] <= currentPosPaddle[1]+10){
            reverseBall()
        }


    // checkforWin
    // if all blocks are completely destroyed, game is won
    // check for block collision
    for (let i=0; i< blocks.length; i++){
        if(
            
      (currentPosBall[0] > blocks[i].bottomLeft[0] && currentPosBall[0] < blocks[i].bottomRight[0]) &&
      ((currentPosBall[1] + ballDiameter) > blocks[i].bottomLeft[1] && currentPosBall[1] < blocks[i].topLeft[1])     
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            reverseBall()

            if (blocks.length ===0) {
                console.log('you have won')
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }

        }
        
    }


    // check for gameover
    // if the ball passes down through the bottomgrid, game is lost.

    if(currentPosBall[1] < 0){
        gameStopped = true;
        console.log('you lost!')
    }

    if(gameStopped){
        clearInterval(timerId)
    }
}

function reverseBall(){
    {
			if (xDirection === 2 && yDirection === 2) {
				yDirection = -2;
				return;
			}

			if (xDirection === 2 && yDirection === -2) {
				xDirection = -2;
				return;
			}

			if (xDirection === -2 && yDirection === -2) {
				yDirection = 2;
				return;
			}

			if (xDirection === -2 && yDirection === 2) {
				xDirection = 2;
				return;
			}
		}
}

let timerId;
timerId = setInterval(moveBall, speedBall);

document.querySelector('.btnStop').addEventListener('click',()=>{
    gameStopped=true;
    console.log('game is stopped')
})

document.querySelector('.btnStart').addEventListener('click',()=>{
    gameStopped=false;
    console.log('game is started')
    timerId = setInterval(moveBall, speedBall);
    console.log('ball', currentPosBall, 'paddle', currentPosPaddle)
})











