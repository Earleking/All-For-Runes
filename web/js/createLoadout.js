// Define Global Consts
var curRunes = new runesSeleted();


function loadSecondaryTree(treeId) {
    curRunes.secondaryTree = treeId;
    for(var tree of curRunes.allRunes) {
        if(tree["id"] == treeId) {
            for(var slot in tree["slots"]) {
                if(slot == 0)
                    continue;
                loadLevel(tree["slots"][slot]["runes"], slot, false);
            }
        }
    }
    console.log("No Tree matched for secondary");
}


function loadPrimaryTree(treeId) {
    curRunes.primaryTree = treeId;
    for(var tree of curRunes.allRunes) {
        if(tree["id"] == treeId) {
            for(var slot in tree["slots"]) {
                loadLevel(tree["slots"][slot]["runes"], slot, true);
            }
        }
    }
    console.log("No Tree matched for primary");    
}

function loadLevel(slot, i, primaryTree) {    
    
    var runePath = "./../../static/runes/perks/";

    var treeID = "-1";
    if(primaryTree) {
        treeID = "";
    }
    var master = document.getElementById(`${i}-slot${treeID}`);
    for(var rune of slot) {
        var img = document.createElement("img");
        img.src = runePath + rune["id"] + ".png";
        img.classList.add("rune");
        img.id = rune["id"];
        if(i != 0)
            img.classList.add("sub-rune");
        master.appendChild(img);
    }
}

function selectNewRune(newId) {
    var oldRune = curRunes.addRune(newId);
    document.getElementById(newId).classList.add("selected");
    if(oldRune == 0)
        return;
    document.getElementById(oldRune).classList.remove("selected");
}

$(document).ready(() => {
    $.getJSON("./../../static/json/runes.json", (json) => {
        curRunes.allRunes = json;
        loadPrimaryTree(8100);
        loadSecondaryTree(8200);
        $("body").on("click", ".rune", (event) => {
            selectNewRune(event["currentTarget"]["id"]);
        });
    });
});

