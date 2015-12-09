var GAME = GAME || {};

$('document').ready(function(){
  GAME.init();
});

GAME.targets = [];
GAME.points = 0;
GAME.speed = 1;
GAME.over = false;

GAME.init = function(){
  GAME.points = 0;
  $('#points').text('0 puntos.');
  setTimeout(function(){
    GAME.updateGame();
  },0);
  GAME.addBalloons();

}

GAME.updateGame = function(){
  var height = $('body').height();
  var width = $('body').width();
  GAME.targets.forEach(function(t){
    t.update();
    if(t.out(height,width)){
      GAME.lose();
      GAME.removeTarget(t);
    }
  });
  setTimeout(function(){
    if(GAME.over){
      return;
    }
    GAME.updateGame();
  },30);
}

GAME.lose = function(){
  $('.live').last().remove();
  if($('.live').length === 0){
    GAME.over = true;
    $('#over').css('display','block');
  }
}

GAME.addBalloons = function(){
  GAME.createTarget();
  setTimeout(function(){
    if(GAME.over){
      return;
    }
    GAME.addBalloons();
  }, Math.floor(Math.random()*3)*(1000-GAME.speed*10));
}

GAME.setPoints = function(points){
  GAME.points += points;
  $('#points').text(GAME.points + ' puntos.');
  if(GAME.points % 50 == 0){
    GAME.speed++;
  }
}

GAME.createTarget = function(){
  var target = {};
  var $balloon = $('<div>');
  target.rep = $balloon;
  target.bottom = -100;
  target.left = Math.floor(Math.random()*930);
  target.update = function(){
    target.bottom +=GAME.speed;
    $balloon.css('bottom',target.bottom+'px');
  }
  target.out = function(height,width){
    return target.bottom >= height;
  }
  $balloon.css('height','100px').css('width','70px');
  $balloon.css('bottom',target.bottom+'px');
  $balloon.css('left',target.left+'px');
  GAME.targets.push(target);
  switch(Math.floor(Math.random()*5)){
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
    case 4:
    $balloon.addClass('ufo').on('click.game', function(e){
      e.preventDefault();
      GAME.setPoints(100);
      GAME.removeTarget(target);
    });
    $balloon.css('height','50px').css('width','80px');
    target.bottom = Math.floor(Math.random()*$('body').height()-50);
    target.left = -80;
    $balloon.css('bottom',target.bottom+'px').css('left',target.left+'px');
    target.update = function(){
      target.left +=GAME.speed;
      $balloon.css('left',target.left+'px');
    }
    target.out = function(height,width){
      return target.left >= width;
    }
    break;

  }
  $balloon.appendTo($('.container'));
}

GAME.removeTarget = function(value){
  GAME.targets.splice(GAME.targets.indexOf(value),1);
  value.rep.remove();
}
