//----------------------Główne zmienne
var money = 0;
var moneyPerSec = 0;
var science = 0;
var polot = 0;

//----------------------Funkcje
function addMoney(){
    money = money + 1;
    document.getElementById("money").innerHTML = money;
}

function learn(){
    science = science + 1;
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

//----------------------Informacja na start
function getStarted(){
    alert("Witaj w symulatorze studenta informatyki!\nW tej grze możesz wcielić się w typowego studenta. Twoim celem jest ukończenie studiów w jak najkrótszym czasie, wyprowadzenie się od rodziców i znalezienie dziewczyny. Zadanie nie jest łatwe, bo jesteś w końcu studentem informatyki.\n\nPowodzenia!");
}

//----------------------Nowa gra
function newgame(){
    location.reload();
}