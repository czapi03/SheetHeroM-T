console.log("--movenote--");

class MoveNote {
  constructor(speed,note) {
    this.speed = speed;
    this.note = note;
    this.distance = 0;
    this.hit = false;
    this.colorhit = "#56ce46";
    this.colorfail = "#F80E0E";
    this.clone = $('#n'+note+'').clone().attr('id','clonen'+note+'').appendTo('body')
    // this.childsofclone = $(")
    this.status = false;
    this.moveMe();


  }


  moveMe() {
    var _this = this;

    console.log($(_this.clone));
    _this.clone.css({display:"block"})



    var moveme = setInterval(function () {
       _this.distance+= _this.speed;

       if (_this.distance== 33){

         $('#game').trigger('halftime')


       }





       if (_this.distance==66){


         $(''+this.clone+" *").attr("fill","red");

       }

       if(_this.distance == 84){

         clearInterval(moveme);
       }

                  _this.clone.css({
                    right: ""+_this.distance+"%"

                  })

                }, 20);




  }

}
