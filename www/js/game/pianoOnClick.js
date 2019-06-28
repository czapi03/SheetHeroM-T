class PianoOnClick {
  constructor() {
    this.allkeys = $('.pianoOnClick').on('click', function() {

      var mykey = $(this).attr('id');
      console.log(mykey);

      // var media = new Media('../../assets/wav/' + mykey + '.wav', function() {
      var media = new Media("/android_assets/www/assets/wav"+ mykey +".wav", function() {
        console.log('geht');
      }, function(err) {

        alert(JSON.stringify(err));

      });
      media.play();
      console.log(media.src);



    })

  }
}
