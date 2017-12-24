$(function () {
    alert('hey Im working');
    var h = $('#picture-container').height();
    var picH = $('#picture-container img').height();
    var scrollHeight = (picH - h) * -1;
    console.log('h: ' + h);
    console.log('picH: ' + picH);
    console.log("scrollH: " + scrollHeight);

    $("img").draggable(
        {
            containment: [0, scrollHeight, 0, 0]
        });
});