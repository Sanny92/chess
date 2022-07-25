var img_fer_b = "<img src = img/fer_b.png width='45px' height='45px' align='center'>"
var img_fer_w = "<img src = img/fer_w.png width='45px' height='45px' align='center'>"
var img_kon_b = "<img src = img/kon_b.png width='45px' height='45px' align='center'>"
var img_kon_w = "<img src = img/kon_w.png width='45px' height='45px' align='center'>"
var img_kor_b = "<img src = img/kor_b.png width='45px' height='45px' align='center'>"
var img_kor_w = "<img src = img/kor_w.png width='45px' height='45px' align='center'>"
var img_lad_b = "<img src = img/lad_b.png width='45px' height='45px' align='center'>"
var img_lad_w = "<img src = img/lad_w.png width='45px' height='45px' align='center'>"
var img_off_b = "<img src = img/off_b.png width='45px' height='45px' align='center'>"
var img_off_w = "<img src = img/off_w.png width='45px' height='45px' align='center'>"
var img_pes_b = "<img src = img/pes_b.png width='45px' height='45px' align='center'>"
var img_pes_w = "<img src = img/pes_w.png width='45px' height='45px' align='center'>"

var move_color = "white"

var info_go = Array()
var field = Array()

var move_from_x;
var move_from_y;

function show_start_position() {

    field = [
        ["R", "P", " ", " ", " ", " ", "p", "r"],
        ["N", "P", " ", " ", " ", " ", "p", "n"],
        ["B", "P", " ", " ", " ", " ", "p", "b"],
        ["Q", "P", " ", " ", " ", " ", "p", "q"],
        ["K", "P", " ", " ", " ", " ", "p", "k"],
        ["B", "P", " ", " ", " ", " ", "p", "b"],
        ["N", "P", " ", " ", " ", " ", "p", "n"],
        ["R", "P", " ", " ", " ", " ", "p", "r"]

    ];
}

function info_go_color() {
    info_go = [
        [" ", " ", " ", " ", " ", " ", " ", " "], // 1, если может ходить
        [" ", " ", " ", " ", " ", " ", " ", " "], // 2, куда может пойти данная фигура
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " "],

    ];
}

function show_figure(figure) {

    switch (figure) {
        case "K" :
            return img_kor_w;
        case "Q" :
            return img_fer_w;
        case "B" :
            return img_off_w;
        case "N" :
            return img_kon_w;
        case "R" :
            return img_lad_w;
        case "P" :
            return img_pes_w;
        case "k" :
            return img_kor_b;
        case "q" :
            return img_fer_b;
        case "b" :
            return img_off_b;
        case "n" :
            return img_kon_b;
        case "r" :
            return img_lad_b;
        case "p" :
            return img_pes_b;
        default:
            return "&nbsp";

    }
}

function setting_stroke(x, y) { // определение какого цвета фигура


    var figure = field[x][y]

    if (figure == " ") {
        //  console.log( "пусто")
        return " ";
    }

    if (figure.toUpperCase() == figure) {
        //   console.log("black")
        return "white"
    } else {
        //   console.log( "white")
        return "black"
    }


// return (figure.toUpperCase() == figure) ? "black" : "white"


}

function stroke_capability(x, y) { // сравнивает цвета фигуры с очередностью хода


    return (setting_stroke(x, y) == move_color)




    // if (setting_stroke(x,y) == move_color)
    // return true
    // else
    // return false
}

function mark_walking_ability() { // пометить способность ходить
    // console.log("mark_walking_ability!!!")

    info_go_color()

    for (var sx = 0; sx <= 7; sx++)
        for (var sy = 0; sy <= 7; sy++)
            for (var dx = 0; dx <= 7; dx++)
                for (var dy = 0; dy <= 7; dy++)
            if (can_move(sx,sy,dx,dy)) {
                info_go [sx][sy] = "1"

            }

}

function mark_walking_ability_there() {
    info_go_color()

    for (var x = 0; x <= 7; x++)
        for (var y = 0; y <= 7; y++)
            if (can_move(move_from_x, move_from_y, x, y))
            if ((setting_stroke(x, y) == " ") || (stroke_capability(x, y) == false)) {
                info_go [x][y] = "2"
// можем ходить туда где пусто или на клетки, где фигура соперника
            }
}

function click_box(x, y) {  // раздкляем на 2 функции

    if (info_go[x][y] == "1")  // когда выбираем фигура
        click_box_from(x, y);
    if (info_go[x][y] == "2")  // когда ходим фигурой
        click_box_to(x, y);
    if ((info_go[x][y] == " ") && (move_color == "black") && (setting_stroke(x, y) == "black")) // когда выбираем фигура
        click_box_any(x, y);
    if ((info_go[x][y] == " ") && (move_color == "white") && (setting_stroke(x, y) == "white")) // когда выбираем фигура
        click_box_any(x, y);

}

function click_box_any(x, y) {

    info_go[move_from_x][move_from_y] = " "
    move_from_x = x
    move_from_y = y
    info_go[x][y] = "3"
    mark_walking_ability()
    show_my_bord()
    click_box(x, y)


}

function click_box_from(x, y) {
    move_from_x = x
    move_from_y = y
    // при выборе фигурой узнаем куда можно пойти фигурой
    mark_walking_ability_there(); // куда можно пойти
    info_go[x][y] = "3"
    show_my_bord();
}

function click_box_to(x, y) {
    field[x][y] = field[move_from_x][move_from_y]
    field[move_from_x][move_from_y] = " "
    turn_move()
    mark_walking_ability();
    info_go[x][y] = "4"
    show_my_bord()
}

function turn_move() {
    if (move_color == "black")
        move_color = "white"
    else
        move_color = "black"
}

function show_my_bord() {
    console.log(" ход ")
    table = "<table>";
    var color_cell


    for (var y = 7; y >= 0; y--) {
        table += "<tr>"

        table += "<td class='cleen'>"
        table += y + 1
        table += "</td>"

        for (let x = 0; x <= 7; x++) {

            if (info_go[x][y] == " ")
                color_cell = change_color(x, y);

            if (info_go[x][y] == "1")
                color_cell = "#DFFD66"
            if (info_go[x][y] == "2")
                color_cell = "#FFB3FF"
            if (info_go[x][y] == "3")
                color_cell = "#D01212FF"
            if (info_go[x][y] == "4")
                color_cell = "#a712d0"


            table += "<td style=background-color:" + color_cell + " onclick='click_box(" + x + "," + y + ")'>";

            table += show_figure(field [x][y]);


            table += "</td>";
        }
        table += "</tr>"
    }
    table += "<tr>"
    table += "<td class='cleen'></td>"
    table += "<td class='cleen'>A</td>"
    table += "<td class='cleen'>B</td>"
    table += "<td class='cleen'>C</td>"
    table += "<td class='cleen'>D</td>"
    table += "<td class='cleen'>E</td>"
    table += "<td class='cleen'>F</td>"
    table += "<td class='cleen'>G</td>"
    table += "<td class='cleen'>H</td>"

    table += "</table>";

    document.getElementById("my_bord").innerHTML = table
}

function change_color(x, y) {
    if ((x + y) % 2 == 0)
        return "rgba(26,43,28,0.75)"
    else
        return "#d7a57f"
}

function can_move(sx,sy,dx,dy) {

    if (!stroke_capability(sx,sy))
        return false;
    if (!setting_stroke(dx,dy))
        return false;
    if (!is_correct_move(sx,sy,dx,dy))
        return false;
    return true;
}

function is_correct_move(sx,sy,dx,dy){
    var figure = field[sx][sy]
    if (is_knight(figure))
        return is_correct_knight_move(sx,sy,dx,dy)
    if (is_king(figure))
        return is_correct_king_move(sx,sy,dx,dy)
    if (is_rook(figure))
        return is_correct_rook_move(sx,sy,dx,dy)
    if (is_pawn(figure))
        return is_correct_pawn_move(sx,sy,dx,dy)
    if (is_pawnB(figure))
        return is_correct_pawnB_move(sx,sy,dx,dy)
    if (is_elephant(figure))
        return is_correct_elephant_move(sx,sy,dx,dy)
    if (is_queen(figure))
        return is_correct_queen_move(sx,sy,dx,dy)
    return true
}

function is_rook(figure){
    return figure.toUpperCase()=="R"
}
function is_knight(figure){
    return figure.toUpperCase()=="N"
}
function is_elephant(figure){
    return figure.toUpperCase()=="B"
}
function is_queen(figure){
    return figure.toUpperCase()=="Q"
}
function is_king(figure){
    return figure.toUpperCase()=="K"
}
function is_pawn(figure){
    return figure=="P"
}

function is_pawnB(figure){
    return figure=="p"
}

// КОРОЛЕВА
function is_correct_queen_move(sx,sy,dx,dy){
    if (Math.abs(dx-sx)==1 && Math.abs(dy-sy)==1)
        return true
    if (Math.abs(dx-sx)==2 && Math.abs(dy-sy)==2)
        return true
    if (Math.abs(dx-sx)==3 && Math.abs(dy-sy)==3)
        return true
    if (Math.abs(dx-sx)==4 && Math.abs(dy-sy)==4)
        return true
    if (Math.abs(dx-sx)==5 && Math.abs(dy-sy)==5)
        return true
    if (Math.abs(dx-sx)==6 && Math.abs(dy-sy)==6)
        return true
    if (Math.abs(dx-sx)==7 && Math.abs(dy-sy)==7)
        return true
    if (Math.abs(dx-sx)==0 && Math.abs(dy-sy)<=7)
        return true
    if (Math.abs(dx-sx)<=7 && Math.abs(dy-sy)==0)
        return true
    return false
}
// СЛОН
function is_correct_elephant_move(sx,sy,dx,dy){
    if (Math.abs(dx-sx)==1 && Math.abs(dy-sy)==1)
        return true
    if (Math.abs(dx-sx)==2 && Math.abs(dy-sy)==2)
        return true
    if (Math.abs(dx-sx)==3 && Math.abs(dy-sy)==3)
        return true
    if (Math.abs(dx-sx)==4 && Math.abs(dy-sy)==4)
        return true
    if (Math.abs(dx-sx)==5 && Math.abs(dy-sy)==5)
        return true
    if (Math.abs(dx-sx)==6 && Math.abs(dy-sy)==6)
        return true
    if (Math.abs(dx-sx)==7 && Math.abs(dy-sy)==7)
        return true
    return false
}

// ПЕШКА ЧЕРНАЯ + добавил 2 ход на 1 клетку разделил пешки для направления движения
function is_correct_pawnB_move(sx,sy,dx,dy){

    if (sy==6){
        if (Math.abs(dx-sx)==0 && Math.abs(dy-sy)<=2 && (dy<=sy)){
            console.log( "d= "+ dx,dy, "s= "+ sx, sy)
            return true}}
    else if (Math.abs(dx-sx)==0 && Math.abs(dy-sy)<=1 && (dy<=sy)) {
        return true
    }return false
}
// ПЕШКА + добавил 2 ход на 1 клетку
function is_correct_pawn_move(sx,sy,dx,dy){

    if (sy==1){
    if (Math.abs(dx-sx)==0 && Math.abs(dy-sy)<=2 && (dy>=sy)){
        console.log( "d= "+ dx,dy, "s= "+ sx, sy)
    return true}}
    else if (Math.abs(dx-sx)==0 && Math.abs(dy-sy)<=1 && (dy>=sy)) {
        return true
    }return false
}

// ЛАДЬЯ
function is_correct_rook_move(sx,sy,dx,dy){
    if (Math.abs(dx-sx)==0 && Math.abs(dy-sy)<=7)
        return true
    if (Math.abs(dx-sx)<=7 && Math.abs(dy-sy)==0)
        return true
    return false
}
// КОРОЛЬ
function is_correct_king_move(sx,sy,dx,dy){
    if (Math.abs(dx-sx)<=1 && Math.abs(dy-sy)<=1)
        return true
    return false
}
// КОНЬ
function is_correct_knight_move(sx,sy,dx,dy){
    if (Math.abs(dx-sx)==1 && Math.abs(dy-sy)==2)
        return true
    if (Math.abs(dx-sx)==2 && Math.abs(dy-sy)==1)
        return true
    return false
}


show_start_position()
mark_walking_ability()
show_my_bord()






// 2-мерный массив для доски
// let chess = [
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
// ]
//


// y=0 x=0 y=9 x=9 - 0 и 10 ряды для бук в цифр
// function draw(){
//     let out = '';
//     let m = 0;
//     for (let y = 0; y< chess.length; y++){
//         let arr = chess[y]
//         for (let x = 0; x< arr.length; x++){
//
//             if((`${x}` == 0 && `${y}` == 0)||(`${x}` == 0 && `${y}` == 9)||(`${x}` == 9 && `${y}` == 0)||(`${x}` == 9 && `${y}` == 9)) { out += `<div class="chess-block-angle"></div>`}
//
//             else if(`${y}` == 0 || `${y}` == 9){ out += `<div class="chess-block-abc"></div>`} // как написать буквы в каждом блоке через js
//
//             else  if (`${x}` == 0 || `${x}` == 9) { out += `<div class="chess-block-num"">${y}</div>`} // как развернуть цифр от 8 до 1 для красоты
//
//             else if(m % 2 == 0){
//                 out += `<div class="chess-block" id="${x}${y}"></div>`
//             }else{
//                 out += `<div class="chess-block bg-black" id="${x}${y}"></div>`
//             }
//             m++
//         }
//         m++
//     }
//     document.querySelector('#field').innerHTML = out
//     document.querySelectorAll(".chess-block").forEach(function (element){
// // element.onclick = horse // dspjd функции хода коня
//     })
// }
// draw()
// с примера как ходит конь
// function horse() {
//     document.querySelectorAll('.chess-block').forEach(function (element){
//         element.classList.remove('green')
//         element.classList.remove('active')
//     })
//     let x = this.dataset.x
//     let y = this.dataset.y
//     console.log(x+' '+y)
//     this.classList.add('green')
//     if (+x+2 <8 && +y+1 <8){
//         document.querySelector(`.chess-block[data-x="${+x+2}"][data-y="${+y+1}"]`).classList.add('active')
//     }
//     if (+x+2 <8 && +y-1 >=0){
//         document.querySelector(`.chess-block[data-x="${+x+2}"][data-y="${+y-1}"]`).classList.add('active')
//     }
//     if (+x-2 >=0 && +y+1 <8){
//         document.querySelector(`.chess-block[data-x="${+x-2}"][data-y="${+y+1}"]`).classList.add('active')
//     }
//     if (+x-2 >=0 && +y-1 >=0){
//         document.querySelector(`.chess-block[data-x="${+x-2}"][data-y="${+y-1}"]`).classList.add('active')
//     }
//     if (+x+1 <8 && +y-2 >=0){
//         document.querySelector(`.chess-block[data-x="${+x+1}"][data-y="${+y-2}"]`).classList.add('active')
//     }
//     if (+x-1 >=0 && +y-2 >=0){
//         document.querySelector(`.chess-block[data-x="${+x-1}"][data-y="${+y-2}"]`).classList.add('active')
//     }
//     if (+x+1 <8 && +y+2<8){
//         document.querySelector(`.chess-block[data-x="${+x+1}"][data-y="${+y+2}"]`).classList.add('active')
//     }
//     if (+x-1 >=0 && +y+2 <8){
//         document.querySelector(`.chess-block[data-x="${+x-1}"][data-y="${+y+2}"]`).classList.add('active')
//     }
// }


// // подключаю стили (не получилось заменить данные, сделал через создание нового элемента)
// const head = document.head;
// const body = document.body;
// const link = document.createElement('link');
// link.rel   = "stylesheet"
// link.href  = "css/style.css"
// head.appendChild(link);
// // переименовую title
// const title = document.querySelector('title');
// title.textContent = "ШАХМАТЫ"

//создаю div с классом wrapper
// const divWrapper  = document.createElement('div');
// divWrapper.classList.add('wrapper');
// body.appendChild(divWrapper);

// function newBlock(teg, className, parent) {
//     const blocks = document.createElement(teg);
//     blocks.classList.add(`${className}`);
//     parent.appendChild(blocks);
// }
// newBlock('span', 'tytclass', body)