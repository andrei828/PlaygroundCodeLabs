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
  var previousList = []
  var calculating = false;
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

  function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

  function Point(x, y) { 
	this.x = x
	this.y = y
  }

  var grahamScan = (points) => {
	console.log("Calculating")
	if (points.length <= 3) {
		calculating = true;
		return points
	}

	getOrientation = (pointA, pointB, pointC) => {
		let val = (pointB.y - pointA.y) * (pointC.x - pointA.x) -
				  (pointB.x - pointA.x) * (pointC.y - pointA.y)
		
		// points are colinear
		if (val == 0) 
			return 0 
		// clockwise or counterclockwise
		return (val > 0 ? 1 : 2)
	}

	// relative polar coords by pivot
	getPolarCoords = (refPoint, targetPoint) => {
	    return { 
	    	radians: Math.atan2(targetPoint.y - refPoint.y, 
	    						targetPoint.x - refPoint.x),

	    	distance: Math.sqrt(targetPoint.x * targetPoint.x +
							 	targetPoint.y * targetPoint.y)
	    }
	}

	pivot = points[0]
	points.forEach(point => {
		if ((point.y == pivot.y && point.x < pivot.x) || point.y < pivot.y)
			pivot = point
	})

	// sort array and place at points[0] the bottom-most coordonate
	points.sort((pointA, pointB) => {
		dataPointA = getPolarCoords(pivot, pointA)
		dataPointB = getPolarCoords(pivot, pointB)

		return dataPointA.radians === dataPointB.radians ?
			pointA.x - pointB.x :
			dataPointA.radians - dataPointB.radians
	})

	var result = [points[0]], len = 1

	for (var i = 1; i < points.length; i++) {
		pointA = result[len - 2]
		pointB = result[len - 1]
		pointC = points[i]

		while ((len === 1 && pointB.x === pointC.x && pointB.y === pointC.y) ||
				(len > 1 && (getOrientation(pointA, pointB, pointC) === 1 || getOrientation(pointA, pointB, pointC) === 0))) {
			len--;
			pointB = pointA
			pointA = result[len - 2]
		}
		// stroke(155, 155, 0);
  		// strokeWeight(1);
		// drawLine(pointB.x, pointB.y, pointC.x, pointC.y)
		// await sleep(500)
		result[len++] = pointC
	}
	result.length = len
	// stroke(0);
	// strokeWeight(1);
	// drawLine(result[result.length - 1].x, result[result.length - 1].y, result[0].x, result[0].y)
	// await sleep(500)
	// for (i = 1; i < result.length; i++) {
	// 	drawLine(result[i - 1].x, result[i - 1].y, result[i].x, result[i].y)
	// 	await sleep(500)
	// }
	calculating = true;
	return result	
  }

  function setup() {
	localStorage.color = "red"
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
		calculating = false
		updateLocalStorageCoords();
	}

	canvas.onmouseleave = (e) => {
		clickActive = false
		calculating = false
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
          stroke('#3b43d6');
          rect(x, y, resolution - 1, resolution - 1);
        } else if (grid[i][j] == 2) {
            fill(200);
            stroke('red');
            rect(x, y, resolution - 1, resolution - 1);
        } else if (grid[i][j] == 3) {
            fill(localStorage.color);
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }


	if (localStorage.state == "draw") {
		if (clickActive === true) {
		fill(localStorage.color);
		stroke('red');
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
			stroke('red');
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
			X = 0, Y = 1, list = []
			for (var x_value in coordinates) {
				coordinates[x_value].forEach((y_value) => {
					// list.push([x_value, y_value]) 
					list.push(new Point(parseInt(x_value), y_value))           
				})
			}
			if (calculating == false) {
				list = grahamScan(list)
				previousList = list.slice(0)
			} else {
				list = previousList.slice(0)
			} 

			drawLine(list[list.length - 1].x, list[list.length - 1].y, list[0].x, list[0].y)
			for (i = 1; i < list.length; i++) 
				drawLine(list[i - 1].x, list[i - 1].y, list[i].x, list[i].y)
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