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
    background(255);
  
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        } else if (grid[i][j] == 2) {
            fill(200);
            stroke(1);
            rect(x, y, resolution - 1, resolution - 1);
        } else if (grid[i][j] == 3) {
            fill(100);
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }

    canvas.onmousemove = function(e) {
        if (previousY === null && previousX === null) {
            previousY = ceil(e.clientY / resolution) - 1;
            previousX = ceil(e.clientX / resolution) - 1;
        }
        else if (previousY !== ceil(e.clientY / resolution) - 1 || previousX !== ceil(e.clientY / resolution) - 1) {
            if (grid[ceil(e.clientX / resolution) - 1][ceil(e.clientY / resolution) - 1] !== 3) {
                grid[ceil(e.clientX / resolution) - 1][ceil(e.clientY / resolution) - 1] = 2;
                grid[previousX][previousY] = 1;
                previousY = ceil(e.clientY / resolution) - 1;
                previousX = ceil(e.clientX / resolution) - 1;
            }
        }
        // if (previousX !== undefined && previousY !== undefined) {
        //     grid[previousX][previousY] = 1;
        // }
        // else {
        //     previousX = ceil(e.clientX / resolution) - 1;
        //     previousY = ceil(e.clientY / resolution) - 1;
        // }

        
    }

    canvas.onmousedown = function(e) {
        grid[ceil(e.clientX / resolution) - 1][ceil(e.clientY / resolution) - 1] = 3;
        // y = (ceil(e.clientY / resolution) ) * resolution 
        // x = (ceil(e.clientX / resolution)) * resolution
        // print(x, y)
        // rect(y, x, resolution + 1, resolution + 1);
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