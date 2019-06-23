console.log('---SVGBACKGROUNDCLASS---JS');


class Background {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.createSVG();
  }

  createSVG() {


    $.svg('svg')
      .css({
        height: $(window).height(),
        width: $(window).width(),
        padding: 0,
        margin:0

      })
      .appendTo('#game')
      // .attr('viewBox', '0 0 1000 1000')
      .append(
        $.svg('rect')
        //$(  document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' ) )
        .attr({
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height,
          fill: this.color
        })
      );

  }




}
