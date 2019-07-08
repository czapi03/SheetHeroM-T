class PianoOnClick {
  constructor() {
    this.allkeys = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');

      $('#game').trigger('keyhit',mykey)







      // var media = new Media('assets/wav/' + mykey + '.wav', function() {
      var media = new Media("/android_asset/www/assets/wav/"+ mykey +".wav", function() {

          media.release();

      }, function(err) {

        alert(JSON.stringify(err));

      });
      media.play();




    })

  }
}
