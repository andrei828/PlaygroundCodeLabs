pencil_click = true;
eraser_click = false;
toggle_algorithm_tab = false;

var pencil_element;
var eraser_element;
var algorithms_tab;

window.onload = () => {
    pencil_element = document.getElementById("pencil_icon")
    eraser_element = document.getElementById("eraser_icon")
    algorithms_tab = document.getElementById("select_tab")
    eraser_element.style.cursor = "pointer"
}

function get_coords() {
    localStorage.state = "erase";
    var coords = localStorage.coords.split(' ')
    var paragraph = document.getElementById("p")
    paragraph.style.visibility = "visible"
    paragraph.innerHTML = "["
    for (let i = 0; i < coords.length - 2; i +=2 ) { 
        console.log(coords[i], coords[i + 1])
        paragraph.innerHTML += coords[i] + ' ' + coords[i + 1] + ', '
    }
    paragraph.innerHTML = paragraph.innerHTML.slice(0, paragraph.innerHTML.length - 2) + ']'
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