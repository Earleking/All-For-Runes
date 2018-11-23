function initTooltip() {
    console.log('init');

    $("body").on("mouseenter", ".rune", (event) => {
        // Set position of hoverbox
        $("#hover-box").css({
            display: "block",
        });
        $("#hover-box").html(curRunes.getRuneDescription(event.target.id));
    });

    $("body").on("mousemove", ".rune", (event) => {
        var posX = event.originalEvent.pageX;
        var posY = event.originalEvent.pageY;

        // Set position of hoverbox
        $("#hover-box").css({
            top: posY - 20,
            left: posX + 10
        });
    });

    $("body").on("mouseleave", ".rune", (event) => {
        // var posX = event.originalEvent.pageX;
        // var posY = event.originalEvent.pageY;

        // Set position of hoverbox
        $("#hover-box").css({
            display: "none"
        });
    });
}