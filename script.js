//----------------------Get started
function ready(){
    document.body.removeChild(getStarted);
}

//----------------------Nowa gra
function newgame(){
    location.reload();
}

//----------------------Główne zmienne
let money = 0;
let moneyPerSec = 0;
let science = 0;
let polot = 0;

//----------------------Zmienne na zwycięstwo
let house = false;
let girl = false;
let studies = false;

//----------------------Zmienne ilości
let learnAmount = 1;
let haveMiner = false;
let minerLevel = 1;
let moneyPerClick = 1;
let practiceCost = 500;
let practiceLevel = 0;

//----------------------Funkcje
function addMoney(){
    money = money + moneyPerClick + Math.ceil(moneyBonus);
    document.getElementById("money").innerHTML = money;
}

function learn(){
    science = science + learnAmount + Math.ceil(learnBonus);
    document.getElementById("sci").innerHTML = science;
}

function beer(){
    if(money >= 30){
        polot = polot + 5;
        document.getElementById("polot").innerHTML = polot;
        money = money - 30;
        document.getElementById("money").innerHTML = money;
    }
}

function party(){
    if (money >= 150){
        money = money - 150;
        document.getElementById("money").innerHTML = money;
        polot = polot + 15;
        document.getElementById("polot").innerHTML = polot;
    }
}

function goLearn(){
    polot = polot - 15;
    document.getElementById("polot").innerHTML = polot;
    learnAmount = learnAmount +1;
    document.getElementById("learnAmount").innerHTML = learnAmount;
}

function miner(){
    if(money >= 10000 && haveMiner == false){
        haveMiner = true;
        money = money - 10000;
        document.getElementById("miner-btn").style.display = "none" // zamiana przycisku z kupna na ulepszenie
        document.getElementById("minerUpgrade-btn").style.display = "block";
        document.getElementById("moneyPerSec").innerHTML = 10*minerLevel;
        document.getElementById("money").innerHTML = money;
        window.setInterval(function(){
            money = money + (10*minerLevel);
            document.getElementById("money").innerHTML = money;
        }, 1000);
    }
}

function minerUpgrade(){ // ograniczyć ulepszanie, zwiększyć efektywność
    if(money >= 5000 && haveMiner == true){
        money = money - 5000;
        minerLevel++;
        document.getElementById("moneyPerSec").innerHTML = 10*minerLevel;
    }
}

function buyHouse(){
    if (money >= 1000000 && house == false){
        money = money - 1000000;
        house = true;
        document.getElementById("money").innerHTML = money;
    }
}

function practice(){
    if (science >= practiceCost){
        practiceCost = practiceCost + 500;
        document.getElementById("practiceCost").innerHTML = practiceCost;
        practiceLevel++;
        if (practiceLevel <= 5){
            moneyPerClick++;
        }
        if (practiceLevel >5){
            document.getElementById("practiceName").innerHTML = "Zdobywaj dośw. jako Junior Developer";
            document.getElementById("practiceToMoney").innerHTML = "3";
            moneyPerClick = moneyPerClick + 3;
        }
        if (practiceLevel >10){
            document.getElementById("practiceName").innerHTML = "Zdobywaj dośw. jako Mid-level Developer";
            document.getElementById("practiceToMoney").innerHTML = "5";
            moneyPerClick = moneyPerClick + 5;
        }
        if (practiceLevel >20){
            document.getElementById("practiceName").innerHTML = "Zdobywaj dośw. jako Senior Developer";
            document.getElementById("practiceToMoney").innerHTML = "10";
            moneyPerClick = moneyPerClick + 10;
        }
        if (practiceLevel == 25){
            moneyPerClick = moneyPerClick + 109; // +300$ z praktyk
            document.getElementById("practice-btn").innerHTML = "Zdobywaj dośw. jako Senior Developer<br><b>MAX</b>";
           // document.getElementById("practice-btn").className = "stdBtn-max";
        }
        document.getElementById("moneyPerClick").innerHTML = moneyPerClick;
    }
}

function inz(){
    if (science >= 15000){
        studies = true;
    }
}

//----------------------Events
let date = new Date(); //data pobierana z systemu
let month = date.getMonth() + 1; //1-sty, 2-lut, 3-mar ...
let days = date.getDate(); // dni miesiąca 1-31
/* SESJA */
let learnBonus = 0;
if(month == 2 || month == 6){
    document.getElementById("eventSesja-btn").style.display = "block";
}
else{
    document.getElementById("eventSesja-btn").style.display = "none";
}
function eventSesja(){
    document.getElementById("eventSesja-btn").className = "stdBtn-eventActive";
    document.getElementById("sesjaActive").innerHTML = " aktywny!";
    window.setInterval(function(){
        learnBonus = learnAmount * 0.3;
    },1000);
}
/* WAKACJE */
let moneyBonus = 0;
if(month == 7 || month == 8 || month == 9){
    document.getElementById("eventWakacje-btn").style.display = "block";
}
else{
    document.getElementById("eventWakacje-btn").style.display = "none";
}
function eventWakacje(){
    document.getElementById("eventWakacje-btn").className = "stdBtn-eventActive";
    document.getElementById("wakacjeActive").innerHTML = " aktywny!";
    window.setInterval(function(){
        moneyBonus = moneyPerClick * 0.5;
    },1000);
}
/* JUWENALIA */
let polotBonus = 0;
if(month == 5 && days >= 17){
    document.getElementById("eventJuwe-btn").style.display = "block";
}
else{
    document.getElementById("eventJuwe-btn").style.display = "none";
}
function eventJuwe(){
    document.getElementById("eventJuwe-btn").className = "stdBtn-eventActive";
    document.getElementById("juweActive").innerHTML = " aktywny!";
    window.setInterval(function(){
        polot = polot + 100;
        document.getElementById("polot").innerHTML = polot;
    },180000); //=3min
}


//----------------------Sprawdzanie warunków w czasie rzeczywistym
function check(){
    //----------------------Kolorowanie przycisków
    /* BEER */
    if(money < 30){
        document.getElementById("beer-btn").className = "stdBtn-disabled";
    }
    else{
        document.getElementById("beer-btn").className = "stdBtn";
    }
    
    /* BUY MINER */
    if(money < 10000){
        document.getElementById("miner-btn").className = "stdBtn-disabled";
    }
    else{
        document.getElementById("miner-btn").className = "stdBtn";
    }
    /* UPGRADE MINER */
    if(money < 5000){
        document.getElementById("minerUpgrade-btn").className = "stdBtn-disabled";
    }
    else{
        document.getElementById("minerUpgrade-btn").className = "stdBtn";
    }
    
    /* BUY HOUSE */
    if(money < 1000000){
        document.getElementById("buyHouse-btn").className = "stdBtn-disabled";
    }
    else if(house == true){
        document.getElementById("buyHouse-btn").className = "stdBtn-max";
    }
    else{
        document.getElementById("buyHouse-btn").className = "stdBtn";
    }
    
    /* PARTY */
    if(money < 150){
        document.getElementById("party-btn").className = "stdBtn-disabled";
    }
    else{
        document.getElementById("party-btn").className = "stdBtn";
    }
    
    /* PRACTICE */
    if(science < practiceCost){
        document.getElementById("practice-btn").className = "stdBtn-disabled";
    }
    else if (practiceLevel >= 25){
        document.getElementById("practice-btn").className = "stdBtn-max";
    }
    else{
        document.getElementById("practice-btn").className = "stdBtn";
    }
    
    /* INŻ */
    if(science < 15000){
        document.getElementById("inz-btn").className = "stdBtn-disabled";
    }
    else if(studies == true){
        document.getElementById("inz-btn").className = "stdBtn-max";
    }
    else{
        document.getElementById("inz-btn").className = "stdBtn";
    }
    
    //----------------------Niski polot, kolorowanie
    if(polot <= -200){
        document.getElementById("polot").style.color = "red";
        document.getElementById("polot").style.textShadow = "1px 1px black";
        document.getElementById("polotWarning").style.display = "inline";
    }
    else if (polot <= -50){
        document.getElementById("polot").style.color = "gold";
        document.getElementById("polot").style.textShadow = "1px 1px black";
        document.getElementById("polotWarning").style.display = "none";
    }
    else if (polot >= 100){
        document.getElementById("polot").style.color = "#4CAF50";
        document.getElementById("polot").style.textShadow = "1px 1px black";
        document.getElementById("polotWarning").style.display = "none";
        
    }
    else{
        document.getElementById("polot").style.color = "black";
        document.getElementById("polotWarning").style.display = "none";
    }
    //----------------------Wyświetlanie informacji o posiadaniu dziewczyny
    if(girl == true){
        document.getElementById("haveGirl").style.display = "block";
    }
    else{
        document.getElementById("haveGirl").style.display = "none";
    }
    //----------------------Wyświetlanie informacji o ukończonych studiach
    if(studies == true){
        document.getElementById("studiesEnd").style.display = "block";
    }
    else{
        document.getElementById("studiesEnd").style.display = "none";
    }
    //----------------------Czy zwycięstwo
    if(house == true && girl == true && studies == true){
        alert("Wygrałeś!");
    }
}
window.setInterval('check()','50');

//----------------------Szukanie dziewczyny
window.setInterval(function(){
    let random = Math.floor((Math.random()*100)+1); // 1-100
    if(polot >= 100 && random >= 80){girl = true;}
    if(polot >= 150 && random >= 50){girl = true;}
    if(polot >= 300){girl = true;}
    if(polot <= -50 && random <= 20){girl = false;}
    if(polot <= -200){girl = false;}
},60000); //losowanie co 1min
