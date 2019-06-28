//some code

window.onerror = function(err) {
  console.log(err);
  return true;
}
console.log = function(s) {
  $("<div>").html(s).css({
    padding: 5,
    "background": "#e57b7b"
  }).appendTo('#debug')
}




document.addEventListener('deviceready', function() {

console.log(Media);


  $('document').ready(function() {
    console.log('app.js');

    $('defs > path').on("click",function(){
      $(this).toggleClass('blue')
    })

    $('#camera').on("click",function(){
      console.log('hier ist camera');

      function onSuccess(){
        console.log("succuess");
      }
      function onFail(){
        console.log("fail");
      }


      navigator.camera.getPicture(onSuccess,onFail);
    })
    var pianoclick = new PianoOnClick();



  })
})
