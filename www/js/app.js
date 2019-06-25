//some code

// document.addEventListener('deviceready', function() {


  $('document').ready(function() {
    console.log('app.js');

    console.log($(window).width(), $(window).height());

    // x,y,width,height,color
    // var rect1 = new Background(0, 0, $(window).width(), $(window).height(), "#a09d9a");

    $('defs > path').on("click",function(){
      $(this).toggleClass('blue')
    })


  })
// })
