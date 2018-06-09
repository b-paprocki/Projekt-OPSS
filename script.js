//----------------------Główne zmienne
var money = 0;
var moneyPerSec = 0;
var science = 0;
var polot = 0;

//----------------------Zmienne na zwycięstwo
var house = false;
var girl = false;
var studies = false;

//----------------------Zmienne ilości
var learnAmount = 1;
var haveMiner = false;
var minerLevel = 1;
var moneyPerClick = 1;
var practiceCost = 500;
var practiceLevel = 0;

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
        document.getElementById("buyHouse-btn").className = "stdBtn-max";
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
           // document.getElementById("practice-btn").className = "stdBtn-max"; przeniesiono do funkcji check()
        }
        document.getElementById("moneyPerClick").innerHTML = moneyPerClick;
    }
}

//----------------------Events
var date = new Date(); //data pobierana z systemu
var month = date.getMonth() + 1; //1-sty, 2-lut, 3-mar ...
var days = date.getDate(); // dni miesiąca 1-31
/* SESJA */
var learnBonus = 0;
if(month == 2 || month == 6){ // dlaczego nie działa negacja?????
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
var moneyBonus = 0;
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
var polotBonus = 0;
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


//----------------------Kolorowanie przycisków
function check(){
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
        document.getElementById("miner-btn").className = "stdBtn-disabled";
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
    else if (practiceLevel == 25){
        document.getElementById("practice-btn").className = "stdBtn-max";
    }
    else{
        document.getElementById("practice-btn").className = "stdBtn";
    }
}
window.setInterval('check()','100');

//----------------------Informacja na start
function getStarted(){
    alert("Witaj w symulatorze studenta informatyki!\nW tej grze możesz wcielić się w typowego studenta. Twoim celem jest ukończenie studiów w jak najkrótszym czasie, wyprowadzenie się od rodziców i znalezienie dziewczyny. Zadanie nie będzie łatwe, bo jesteś w końcu studentem informatyki.\n\nPowodzenia!");
}

//----------------------Nowa gra
function newgame(){
    location.reload();
}