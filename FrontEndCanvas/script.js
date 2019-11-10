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
  const coordinates = {}
  var currentX;
  var currentY;
  var clickActive = false;

  function neighbors(x, y) {
    if (x != null && y != null && x >= 0 && y >= 0 && y < rows && x < cols && grid[x][y] != 3) 
      rect(x * resolution, y * resolution, resolution + 1, resolution - 1);
  }

  function drawLine(cell1X, cell1Y, cell2X, cell2Y) {
    strokeWeight(5); 
    line(cell1X * resolution + resolution / 2, 
         cell1Y * resolution + resolution / 2, 
         cell2X * resolution + resolution / 2, 
         cell2Y * resolution + resolution / 2);
    strokeWeight(1); 
  }

  function updateLocalStorageCoords() {
	localStorage.coords = ""
	for (var x_value in coordinates) {
		coordinates[x_value].forEach((y_value) => {
			localStorage.coords += x_value + ' ' + y_value + ' '
		})
	}
  }

  function setup() {

	localStorage.state = "draw"
	localStorage.drawGraham = ""

    console.log(window.innerWidth)
    createCanvas(window.innerWidth + 50, 800);
    cols = Math.floor(width / resolution);
    rows = Math.floor(height / resolution);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 1;
      }
	}
	
	canvas.onmousemove = (e) => {
		currentX = ceil(e.clientX / resolution) - 1;
		currentY = ceil(e.clientY / resolution) - 1;
	}

	canvas.onmousedown = function(e) {
		clickActive = true
		x_value = ceil(e.clientX / resolution) - 1;
		y_value = ceil(e.clientY / resolution) - 1

		if (localStorage.state == "draw") {
			grid[x_value][y_value] = 3;

			if (coordinates[x_value] === undefined) {
				coordinates[x_value] = new Set([y_value]);
			} else {
				coordinates[x_value].add(y_value);
			}
		} else if (localStorage.state == "erase") {
			if (coordinates[x_value] !== undefined && coordinates[x_value].has(y_value)) {
				grid[x_value][y_value] = 1;
				coordinates[x_value].delete(y_value)
			}
		}
		updateLocalStorageCoords()
	}

	canvas.onmouseup = (e) => {
		clickActive = false
		updateLocalStorageCoords();
	}

	canvas.onmouseleave = (e) => {
		clickActive = false
	}
  }

  function draw() {
    strokeWeight(1);
    background('#0d3575');
  
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
            fill('#eb4034');
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }


	if (localStorage.state == "draw") {
		if (clickActive === true) {
		fill('#eb4034');
		stroke(0);
		grid[currentX][currentY] = 3
		neighbors(currentX, currentY);

			if (coordinates[currentX] === undefined) {
				coordinates[currentX] = new Set([currentY]);
			} else {
				coordinates[currentX].add(currentY);
			}
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

		if (localStorage.drawGraham == "draw") {
			//localStorage.drawGraham = ""

			X = 0
			Y = 1
			list = []
			for (var x_value in coordinates) {
				coordinates[x_value].forEach((y_value) => {
				list.push([x_value, y_value])            
			})

			for (i = 1; i < list.length; i++) 
			drawLine(list[i - 1][X], list[i - 1][Y], list[i][X], list[i][Y])
		}
	}
		
		

	
	} else if (localStorage.state == "erase") {
		if (clickActive === true) {
			fill(255);
			stroke(0);
			if (coordinates[currentX] !== undefined && coordinates[currentX].has(currentY)) {
				grid[currentX][currentY] = 1
				coordinates[currentX].delete(currentY)
			}
			updateLocalStorageCoords()
			neighbors(currentX, currentY);
		}
		else {
			fill(220);
			stroke(1);
			neighbors(currentX, currentY);
			neighbors(currentX + 1, currentY);
			neighbors(currentX - 1, currentY);
			neighbors(currentX, currentY + 1);
			neighbors(currentX, currentY - 1);
			
			fill(230);
			stroke(0);
			neighbors(currentX + 1, currentY + 1);
			neighbors(currentX - 1, currentY - 1);
			neighbors(currentX - 1, currentY + 1);
			neighbors(currentX + 1, currentY - 1);
		}
	}

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