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
            $('.bgVideo video').attr("autoplay", false);

            //hover on text
            // $("et_pb_text_inner").mouseover(function () {
            //     $("video").play();
            // });
            // $("et_pb_text_inner").mouseout(function () {
            //     $("video").pause();
            // });
            //original
            //  $("video").mouseover(function () {
            //      this.play();
            //  });
            // $(" video").mouseout(function () {
            //     this.pause();
            // });
        };

        // //adds a a link wrapper around fouracross
        $('.bgVideo').each(function () {
            var url = $(this).find('a').attr('href');
            $(this).wrap('<a href="' + url + '" class="bgVideoLink"></a>');
        });


        // if ($('#hero').length > 0) {
        //     //SVG animator
        //     var path = document.querySelector('path');
        //     var length = path.getTotalLength();

        //     // Clear any previous transition
        //     path.style.transition = path.style.WebkitTransition =
        //         'none';

        //     // Set up the starting positions
        //     path.style.strokeDasharray = length + ' ' + length;
        //     path.style.strokeDashoffset = length;
        //     // console.log( path.style.strokeDashoffset = length);
        //     // Trigger a layout so styles are calculated & the browser 
        //     // picks up the starting position before animating
        //     path.getBoundingClientRect();

        //     // Define our transition
        //     path.style.transition = path.style.WebkitTransition =
        //         'stroke-dashoffset 5s ease-in-out';

        //     // Go!
        //     path.style.strokeDashoffset = '0';
        // }
    });
})(jQuery);