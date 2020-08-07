$( document ).ready(function() {
    $('.icon').click(function () {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    });
    $(".link").click(function () {
        $(".link").removeClass('clicked');
        $(this).addClass('clicked')
    })
    //Hier hier kannst du die nächsten 4 Zeilen löschen Nikita
    $(".btn").click(function(){
       var div = $("div");
       div.animate({left: '500px'}, "fast");
    });
});