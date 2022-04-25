var grid = [];
//1 = cross; -1 = circle;
var next = 1;
var winner = 0;
var lockInput = false;
function newGame() {
    document.getElementById("board").innerHTML="";
    document.getElementById("newGame").classList.remove("bBtn");
    const fieldTemplate = '<div id="%x-%y"><button class="field" onclick="clickField(%x,%y)"> </button></div>';
    grid = [];
    winner = 0;
    lockInput=false;
    for (let y = 0; y < 3; y++) {
        var row = [];
        for (let x = 0; x < 3; x++) {
            row.push(0);
            document.getElementById("board").innerHTML+=fieldTemplate.replaceAll("%x",x).replaceAll("%y",y);
            //col.push(fieldTemplate.replace("%x",x).replace("%y",y));
        };
        grid.push(row);
    }
    //console.log(grid);
}

function clickField(x,y) {
    if(lockInput)return;
    grid[y][x]=next==1?1:-1;
    document.getElementById(x+"-"+y).classList.add(grid[y][x]==1?"cross":"circle");
    document.getElementById(x+"-"+y).innerHTML="";
    next=next==1?-1:1;
    checkWin();
}

function checkWin() {
    var wC = 0;
    // horizontal
    for(let row of grid){
        wC = 0;
        row.forEach(c=>{wC=wC+c});
        if(wC==3||wC==-3){
            winner=wC==3?1:-1;
            win();
            return;
        };
    }
    // vertical
    for(let x = 0; x < 3; x++){
        wC = grid[0][x]+grid[1][x]+grid[2][x];
        if(wC==3||wC==-3){
            winner=wC==3?1:-1;
            win();
            return;
        };
    }
    // diagonal
    for(let i = 0; i < 2; i++){
        wC=grid[0+(i*2)][0]+grid[1][1]+grid[2-(i*2)][2];
        if(wC==3||wC==-3){
            winner=wC==3?1:-1;
            win();
            return;
        };
    }
}

function win() {
    lockInput=true;
    console.log("Winner: " + winner);
    alert(`${winner==1?"X":"O"} wins!`);
    document.getElementById("newGame").classList.add("bBtn");
}