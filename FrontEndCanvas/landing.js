pencil_click = true;
eraser_click = false;
toggle_color_tab = false;
toggle_algorithm_tab = false;

var color_tab;
var pencil_element;
var eraser_element;
var algorithms_tab;

window.onload = () => {
    pencil_element = document.getElementById("pencil_icon")
    eraser_element = document.getElementById("eraser_icon")
    algorithms_tab = document.getElementById("select_tab")
    color_tab = document.getElementsByClassName("color_tab")[0];
    eraser_element.style.cursor = "pointer"
}

function Point(x, y) { 
	this.x = x
	this.y = y
}

var grahamScan = (points) => {

	if (points.length <= 3)
		return points

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

		result[len++] = pointC
	}
	result.length = len
	return result	
}

function get_coords() {
    var coords = localStorage.coords.split(' '), points = []
    
    for (let i = 0; i < coords.length - 2; i +=2 ) { 
        points.push(new Point(coords[i], coords[i + 1]))
    }
    console.log(points)
}

function set_draw() {
    console.log("grtgr")
    localStorage.drawGraham = "draw"
}

function pencil_clicked() {
    if (!pencil_click) {
        localStorage.state = "draw";

        pencil_click = true
        eraser_click = false
        eraser_element.style.cursor = "pointer"
        pencil_element.style.cursor = "default"
        pencil_element.src = "./pencil_icon2.png"
        eraser_element.src = "./eraser_icon1.png"
    }
}

function eraser_clicked() {
    if (!eraser_click) {
        localStorage.state = "erase";

        eraser_click = true
        pencil_click = false
        pencil_element.src = "./pencil_icon1.png"
        eraser_element.src = "./eraser_icon2.png"
        eraser_element.style.cursor = "default"
        pencil_element.style.cursor = "pointer"
    } 
}

function toggle_colors_tab() {

    if (toggle_color_tab == true) {
        console.log(toggle_color_tab)

        color_tab.style.display = "none"
        toggle_color_tab = false

    } else if (toggle_color_tab == false) {
        console.log(toggle_color_tab)

        color_tab.style.display = "block"
        toggle_color_tab = true
    }
}

function toggle_algorithms_tab() {
    
    if (toggle_algorithm_tab == true) {
        console.log(toggle_algorithm_tab)

        algorithms_tab.style.display = "none"
        toggle_algorithm_tab = false

    } else if (toggle_algorithm_tab == false) {
        console.log(toggle_algorithm_tab)

        algorithms_tab.style.display = "block"
        toggle_algorithm_tab = true
    }
}

function change_color(element) {
    localStorage.color = element.className.split(' ')[1]
    color_tab.style.display = "none"
    toggle_color_tab = false
}

