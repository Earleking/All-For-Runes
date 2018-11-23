class runesSeleted {
    constructor() {
        this.allRunes = {};
        this.runesList = {};
        this.primaryTree = 0;
        this.secondaryTree = 0;
        this.firstSecondary = 0;
        this.primaryRunes = {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0
        }
        this.secondaryRunes = {
            "1": 0,
            "2": 0,
            "3": 0
        }
    }

    sortRunes() {
        for(var tree of this.allRunes) {
            for(var slot of tree["slots"]) {
                for(var rune of slot["runes"]) {
                    this.runesList[rune["id"]] = rune;
                }
            }
        }
        // console.log(this.runesList);
    }

    fullSecondary() {
        var freeSlots = 0;
        for(var r in this.secondaryRunes) {
            if(this.secondaryRunes[r] == 0)
                freeSlots += 1;
        }
        if(freeSlots > 1)
            return false;
        return true;
    }
    
    addRune(newRune) {
        for(var tree of this.allRunes) {
            // Check primary tree
            if(tree["id"] == this.primaryTree) {
                for(var slotI in tree["slots"]) {
                    var slot = tree["slots"][slotI];
                    for(var runeI in slot["runes"]) {
                        var rune = slot["runes"][runeI];
                        if(rune["id"] == newRune) {
                            // Rune is in primary tree in slot
                            var oldRune = this.primaryRunes[slotI];
                            if(oldRune == newRune) {
                                this.primaryRunesw[slotI] = 0;
                                return oldRune;
                            }
                            this.primaryRunes[slotI] = newRune;
                            return oldRune;
                        }
                    }
                }
            }

            // check seecondary tree
            if(tree["id"] == this.secondaryTree) {
                for(var slotI in tree["slots"]) {
                    var slot = tree["slots"][slotI];
                    for(var runeI in slot["runes"]) {
                        var rune = slot["runes"][runeI];
                        if(rune["id"] == newRune) {
                            // we found your new rune

                            if(this.firstSecondary == 0) {
                                this.firstSecondary = slotI;
                            }
                            // Rune is in primary tree in slot
                            var oldRune = this.secondaryRunes[slotI];

                            // If the already selected rune is clicked, deselect
                            if(oldRune == newRune) {
                                this.secondaryRunes[slotI] = 0;
                                return oldRune;
                            }

                            // Check if 2 are already selected
                            if(this.fullSecondary() && oldRune == 0) {
                                // console.log(this.firstSecondary);
                                oldRune = this.secondaryRunes[this.firstSecondary];
                                this.secondaryRunes[this.firstSecondary] = 0;
                                for(var i in this.secondaryRunes) {
                                    if(i != this.firstSecondary && i != slotI) {
                                        this.firstSecondary = i;
                                        // Set new rune
                                        this.secondaryRunes[slotI] = newRune;
                                        return oldRune; 
                                    }
                                }
                                // console.log('fdsaf');
                            } 

                            this.lastSecondary = slotI;
                            // Set new rune
                            this.secondaryRunes[slotI] = newRune;
                            return oldRune;
                        }
                    }
                }
            }
        }
    }

    resetPrimaryRunes() {
        this.primaryRunes = {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0
        }
    }
    
    resetSecondaryRunes() {
        this.secondaryRunes = {
            "1": 0,
            "2": 0,
            "3": 0
        }
    }

    getRuneDescription(runeId) {
        if(this.runesList[runeId]) {
            return this.runesList[runeId]["shortDesc"];
        }
        return "Not Found";
    }
}