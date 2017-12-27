(function ($) {
    //window loaded
    $(window).load(function () {
        //check if class exists
        if ($('#picture - container').length > 0) { 
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
    });
})(jQuery);