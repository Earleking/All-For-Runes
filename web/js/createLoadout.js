// Define Global Consts
var curRunes = new runesSeleted();

function loadTreeIcons() {
    for(var tree of curRunes.allRunes) {
        // Primary Tree stuff
        var url = `./../../static/runes/styles/${tree["id"]}.png`;
        var img = document.createElement("img");
        img.src = url;
        img.id = tree["id"] + "-0";
        img.classList.add("path");
        document.getElementById("path-0").appendChild(img); 


        // Secondary tree stuff
        var img2 = document.createElement("img");
        img2.src = url;
        img2.id = tree["id"] + "-1";
        img2.classList.add("path");
        document.getElementById("path-1").appendChild(img2); 

    }
}

function loadSecondaryTree(treeId) {
    clearSecondaryRunes();
    curRunes.secondaryTree = treeId;
    for(var tree of curRunes.allRunes) {
        if(tree["id"] == treeId) {
            for(var slot in tree["slots"]) {
                if(slot == 0) //Skip keystone
                    continue;
                loadLevel(tree["slots"][slot]["runes"], slot, false);
            }
        }
    }
    console.log("No Tree matched for secondary");
}


function loadPrimaryTree(treeId) {
    clearPrimaryRunes();    
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
    var master = document.getElementById(`slot-${i}${treeID}`);
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

function selectNewTree(id) {
    // id will  be of the format id-x
    // id is the tree id
    // x is 0 or 1 for primary or secondary tree
    var newId = id.split("-")[0];
    var tree = id.split("-")[1];
    var oldTree = 0;
    if(tree == 0) {
        oldTree = curRunes.primaryTree;
        console.log(newId + " " + curRunes.secondaryTree);
        if(newId == curRunes.secondaryTree) {
            // Clear secondary tree stuff
            clearSecondaryRunes();
            document.getElementById(curRunes.secondaryTree + "-1").classList.remove("selected");
        }
        else if(newId == curRunes.primaryTree) {
            console.log('ff');
            // Tree was reselected
            document.getElementById(curRunes.primaryTree + "-0").classList.remove("selected");
            clearPrimaryRunes();
            return;
        }
    }
    else {
        oldTree = curRunes.secondaryTree;
        if(newId == curRunes.primaryTree)
        //  sure secondary tree isn't the same as the primary
            return;
        else if(newId == curRunes.secondaryTree) {
            clearSecondaryRunes();
            document.getElementById(curRunes.secondaryTree + "-1").classList.remove("selected");
            return;
        }
    }
    console.log("x" + oldTree)

    if(tree == 0) {
        loadPrimaryTree(newId);
        document.getElementById(newId + "-0").classList.add("selected");
        if(oldTree == 0)
            return;
        document.getElementById(oldTree + "-0").classList.remove("selected");
    }
    else {
        loadSecondaryTree(newId);  
        document.getElementById(newId + "-1").classList.add("selected");     
        if(oldTree == 0)
            return;
        document.getElementById(oldTree + "-1").classList.remove("selected");
    }
}

function selectNewRune(newId) {
    var oldRune = curRunes.addRune(newId);
    document.getElementById(newId).classList.add("selected");
    if(oldRune == 0)
        return;
    document.getElementById(oldRune).classList.remove("selected");
}

function clearAllRunes() {
    clearPrimaryRunes();
    clearSecondaryRunes();
}

function clearPrimaryRunes() {
    curRunes.resetPrimaryRunes();
    for(var i = 0; i <=3 ; i++) {
        var row = document.getElementById("slot-" + i);
        while(row.firstChild) {
            row.removeChild(row.firstChild);
        }
    }
}

function clearSecondaryRunes() {
    curRunes.resetSecondaryRunes();
    for(var i = 1; i <=3 ; i++) {
        var row = document.getElementById(`slot-${i}-1`);
        while(row.firstChild) {
            row.removeChild(row.firstChild);
        }
    }
}

$(document).ready(() => {
    $.getJSON("./../../static/json/runes.json", (json) => {
        curRunes.allRunes = json;
        curRunes.sortRunes();
        // loadPrimaryTree(8100);
        // loadSecondaryTree(8200);
        loadTreeIcons();
        initTooltip();
        // Create event listeners
        $("body").on("click", ".rune", (event) => {
            selectNewRune(event["currentTarget"]["id"]);
        });
        $(".path").on("click", (event) => {
            selectNewTree(event["currentTarget"]["id"]);
        });
    });
});

