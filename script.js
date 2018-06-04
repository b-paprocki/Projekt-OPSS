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
    money = money + moneyPerClick;
    document.getElementById("money").innerHTML = money;
}

function learn(){
    science = science + learnAmount;
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
        document.getElementById("buyHouse-btn").className = "stdBtn-disabled";
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
            document.getElementById("practice-btn").className = "stdBtn-disabled";
        }
        document.getElementById("moneyPerClick").innerHTML = moneyPerClick;
    }
}

//----------------------Informacja na start
function getStarted(){
    alert("Witaj w symulatorze studenta informatyki!\nW tej grze możesz wcielić się w typowego studenta. Twoim celem jest ukończenie studiów w jak najkrótszym czasie, wyprowadzenie się od rodziców i znalezienie dziewczyny. Zadanie nie będzie łatwe, bo jesteś w końcu studentem informatyki.\n\nPowodzenia!");
}

//----------------------Nowa gra
function newgame(){
    location.reload();
}