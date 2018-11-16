// Define Global Consts

function loadPrimaryTreeBasic(treeId) {
    $.getJSON("./../../static/json/runes.json", (json) => {
        for(var i of json) {
            if(i["id"] == treeId) {
                loadPrimaryTree(i);
                // return;
            }
        }
        console.log("No Tree matched for primary");
    });
}

function loadPrimaryTree(tree) {
    console.log(tree)
    for(var slot in tree["slots"]) {
        loadLevel(tree["slots"][slot]["runes"], slot, true);
        // return;
    }
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
        master.appendChild(img);
    }

}

$(document).ready(() => {
    loadPrimaryTreeBasic(8100);
});
