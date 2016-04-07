// getting elements
var sun = $("img.sun");
var background = $("div.background");
var foreground = $("div.foreground");

// window width and height (auto set on load and resize)
var wWidth, wHeight;

// centers the sun and draws stars
var sWidth = sun.width(), sHeight = sun.height(), stars;
var resize = function() {
  // center the sun
  wWidth = $(window).width();
  wHeight = $(window).height();
  sun.css({
    left: (wWidth - sWidth) / 2,
    top: (wHeight - sHeight) / 2
  });
  // draw stars
  $(".star").remove();
  stars = [];
  for(var i = 0; i < 20; i++) {
    var size = 10;
    var x = 10+Math.random()*(wWidth-20);
    var y = 10+Math.random()*(wHeight-20);
    var newStar = $("<img/>");
    newStar.attr("src", "img/star.png");
    newStar.addClass("star");
    newStar.css({
      left: x,
      top: y,
      width: size,
      opacity: Math.random()
    });
    stars.push(newStar);
    background.append(newStar);
  }
};
$(window).resize(resize).resize();

// getting the planets
var planets = [];
for(var i = 1; i <= 6; i++) {
  var radius = 40*i+150;
  var angle = Math.random()*2*Math.PI;
  var size = 10*i+20;
  var speed = 0.1/i;
  var newPlanet = $("<img/>");
  newPlanet.addClass("planet");
  newPlanet.attr("src", "img/" + i + ".png");
  newPlanet.css({
    width: size,
    top: wHeight/2,
    left: wWidth/2+radius
  });
  planets.push({ elem: newPlanet, radius: radius, angle: angle, speed: speed });
  foreground.append(newPlanet);
}
// and special properties for the moon
planets[5].elem.css("width", 20);
planets[5].radius = 30;
planets[5].speed = 0.5;

// accessory function to get dimension number value
var rmPx = function(string) {
  return parseInt(string.substring(0, string.length-2));
}

// draw planets
var draw = function() {
  for(var i = 0; i < 5; i++) {
    planets[i].angle += planets[i].speed;
    planets[i].elem.css({
      top: wHeight/2-(planets[i].radius*Math.sin(planets[i].angle))-rmPx(planets[i].elem.css("height"))/2,
      left: wWidth/2-planets[i].radius*Math.cos(planets[i].angle)-rmPx(planets[i].elem.css("width"))/2
    });
  }
  // and the moon!
  planets[5].angle += planets[5].speed;
  planets[5].elem.css({
    top: rmPx(planets[1].elem.css("top"))-planets[5].radius*Math.sin(planets[5].angle)-rmPx(planets[5].elem.css("height"))/2+rmPx(planets[1].elem.css("height"))/2,
    left: rmPx(planets[1].elem.css("left"))-planets[5].radius*Math.cos(planets[5].angle)-rmPx(planets[5].elem.css("width"))/2+rmPx(planets[1].elem.css("width"))/2
  });
  // and dim stars
  for(var i = 0; i < stars.length; i++) {
    stars[i].css("opacity", "-=0.01");
    if(stars[i].css("opacity") <= 0) {
      var size = 10;
      var x = 10+Math.random()*(wWidth-20);
      var y = 10+Math.random()*(wHeight-20);
      var newStar = $("<img/>");
      newStar.attr("src", "img/star.png");
      newStar.addClass("star");
      newStar.css({
        left: x,
        top: y,
        width: size,
        opacity: Math.random()
      });
      background.append(newStar);
      stars.splice(i, 1, newStar);
    }
  }
};
setInterval(draw, 50);
