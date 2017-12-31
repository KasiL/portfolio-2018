(function ($) {
    //window loaded
    $(window).load(function () {
        //this function scrolls an image on  portfolio page
        //need to add #picture-container for this to work
        //check if class exists
        if ($('#picture-container').length > 0) { 
            var picHolder = $('#picture-container');
            // pic container height
            var h = $('#picture-container').height();
            //image size
            var picH = $('#picture-container img').height();
            var picW = $('#picture-container img').width();
            // get the offset height
            var scrollHeight = (h - picH);
            //get the top left coords for the container
            var position = picHolder.offset();
            var containerTop = position.top;
            var containerLeft = position.left;
            
            
            var heightCalc = containerTop - picH + h;

            console.log('h: ' + h);
            console.log('picH: ' + picH);
            console.log("scrollH: " + scrollHeight);
            console.log('left: ' + position.left + ' top: ' + position.top);

            $("#picture-container img").draggable({ 
                axis : "y",
                containment: [containerLeft, heightCalc, picW, containerTop] 
            });
        };
        //plays background video on hover
        //put bgVideo class on container
        //1. check to see if class exists on page
        if ($('.bgVideo').length > 0) { 
            $(".bgVideo video").mouseover(function () {
                // this.css("background-color","red");
                this.play();
            });
            $(".bgVideo video").mouseout(function () {
                this.pause();
            }
            );
        };
    });
})(jQuery);