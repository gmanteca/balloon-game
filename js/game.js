var GAME = GAME || {};

$('document').ready(function(){
  GAME.init();
});

GAME.targets = [];
GAME.points = 0;


GAME.init = function(){
  GAME.poinst = 0;
  $('#points').text('0 puntos.');
  setTimeout(function(){
    GAME.updateGame();
  },0);
  GAME.addBalloons();

}

GAME.updateGame = function(){
  var height = $('body').height();
  console.log(GAME.targets);
  GAME.targets.forEach(function(t){
    console.log(t);
    t.bottom +=1;
    if(t.bottom >= height){
      GAME.lose();
      GAME.removeTarget(t);
    }
    t.rep.css('bottom',t.bottom+'px');
  });
  setTimeout(function(){
    console.log('test');
    GAME.updateGame();
  },30);
}

GAME.lose = function(){
  $('.live').last().remove();
  if($('.live').length === 0){
    //LOSE
  }
}

GAME.addBalloons = function(){
  GAME.createTarget();
  setTimeout(function(){
    GAME.addBalloons();
  }, Math.floor(Math.random()*4+2)*1000);
}

GAME.setPoints = function(points){
  GAME.points += points;
  $('#points').text(GAME.points + ' puntos.');
}

GAME.createTarget = function(){
  var target = {};
  var $balloon = $('<div>');
  target.rep = $balloon;
  target.bottom = -100;
  target.left = Math.floor(Math.random()*930);
  $balloon.css('height','100px').css('width','70px');
  $balloon.css('bottom',target.bottom+'px');
  $balloon.css('left',target.left+'px');
  GAME.targets.push(target);
  switch(Math.floor(Math.random()*4)){
    case 0:
    $balloon.addClass('green-balloon').on('click.game', function(e){
      e.preventDefault();
      GAME.setPoints(5);
      GAME.removeTarget(target);
    });
    break;
    case 1:
    $balloon.addClass('orange-balloon').on('click.game', function(e){
      e.preventDefault();
      GAME.setPoints(15);
      GAME.removeTarget(target);
    });
    break;
    case 2:
    $balloon.addClass('blue-balloon').on('click.game', function(e){
      e.preventDefault();
      GAME.setPoints(10);
      GAME.removeTarget(target);
    });
    break;
    case 3:
    $balloon.addClass('red-balloon').on('click.game', function(e){
      e.preventDefault();
      GAME.setPoints(20);
      GAME.removeTarget(target);
    });
    break;
  }
  $balloon.appendTo($('.container'));
}

GAME.removeTarget = function(value){
  GAME.targets.splice(GAME.targets.indexOf(value),1);
  value.rep.remove();
}
