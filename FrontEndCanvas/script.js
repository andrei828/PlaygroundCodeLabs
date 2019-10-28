// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  
  let grid;
  let cols;
  let rows;
  let resolution = 40;
  var canvas = document.getElementById("defaultcanvas0");
  var previousX = null;
  var previousY = null;
  var currentX;
  var currentY;
  var clickActive = false;
  function neighbors(x, y) {
    if (x != null && y != null && x >= 0 && y >= 0 && y < rows && x < cols && grid[x][y] != 3) 
      rect(x * resolution, y * resolution, resolution + 1, resolution - 1);
  }

  function setup() {
    createCanvas(1400, 800);
    cols = width / resolution;
    rows = height / resolution;
  
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
      }
    }
  }
  function draw() {
    background('#0d3575');
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill('255');
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        } else if (grid[i][j] == 2) {
            fill(200);
            stroke(1);
            rect(x, y, resolution - 1, resolution - 1);
        } else if (grid[i][j] == 3) {
            fill('#eb4034');
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
    if (clickActive === true) {
      fill('#eb4034');
      stroke(0);
      grid[currentX][currentY] = 3
      neighbors(currentX, currentY);
    }
    else {
      fill('#adb6e0');
      stroke(1);
      neighbors(currentX, currentY);
      neighbors(currentX + 1, currentY);
      neighbors(currentX - 1, currentY);
      neighbors(currentX, currentY + 1);
      neighbors(currentX, currentY - 1);
    
      fill('#03ecfc');
      stroke(0);
      neighbors(currentX + 1, currentY + 1);
      neighbors(currentX - 1, currentY - 1);
      neighbors(currentX - 1, currentY + 1);
      neighbors(currentX + 1, currentY - 1);
    }
    canvas.onmousemove = (e) => {
      currentX = ceil(e.clientX / resolution) - 1;
      currentY = ceil(e.clientY / resolution) - 1;
      //   if (previousY === null && previousX === null) {
      //       previousY = currentY
      //       previousX = currentX
      //   }
      //   else if (previousY != currentY || previousX != currentX) {
      //       if (grid[currentX][currentY] == 1) {
      //           grid[currentX][currentY] = 2;
      //           grid[currentX - 1][currentY - 1] = 2;
      //           grid[currentX + 1][currentY + 1] = 2;
      //           grid[currentX - 1][currentY + 1] = 2;
      //           grid[currentX + 1][currentY - 1] = 2;


      //           if (grid[previousX][previousY] !== 3) {
      //             grid[previousX][previousY] = 1;
      //             previousY = currentY;
      //             previousX = currentX;
      //           }else {
      //             previousX = null
      //             previousY = null
      //           }
      //       }       
      //   }
    }

    canvas.onmousedown = function(e) {
        clickActive = true;
        grid[ceil(e.clientX / resolution) - 1][ceil(e.clientY / resolution) - 1] = 3;
    }

    canvas.onmouseup = (e) => {
      clickActive = false
    }
    
  
    // let next = make2DArray(cols, rows);
  
    // // Compute next based on grid
    // for (let i = 0; i < cols; i++) {
    //   for (let j = 0; j < rows; j++) {
    //     let state = grid[i][j];
    //     // Count live neighbors!
    //     let sum = 0;
    //     let neighbors = countNeighbors(grid, i, j);
  
    //     if (state == 0 && neighbors == 3) {
    //       next[i][j] = 1;
    //     } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
    //       next[i][j] = 0;
    //     } else {
    //       next[i][j] = state;
    //     }
  
    //   }
    // }
  
    // grid = next;
  }
  
  
//   function countNeighbors(grid, x, y) {
//     let sum = 0;
//     for (let i = -1; i < 2; i++) {
//       for (let j = -1; j < 2; j++) {
//         let col = (x + i + cols) % cols;
//         let row = (y + j + rows) % rows;
//         sum += grid[col][row];
//       }
//     }
//     sum -= grid[x][y];
//     return sum;
//   }