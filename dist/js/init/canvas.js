(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();


var config = {
	pointsMax: 1,
	maxParticleSize: 20,
	speed: 1,
	colorVariation: 50
};

var pixelRatio = window.devicePixelRatio || 1;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var width = 0, height = 0;

(setCanvasSize = function() {
	width = $(canvas).parent().outerWidth() * pixelRatio;
	height = $(canvas).parent().outerHeight() * pixelRatio;
	canvas.width = width;
	canvas.height = height;
})();


window.addEventListener('resize', function() {
	setCanvasSize();
});


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

Circle = function(x, y, radius, color){
	this.x = x || Math.round(Math.random() * canvas.width);
	this.y = y || Math.round(Math.random() * canvas.height);
	this.radius = radius || Math.round(Math.random() * config.maxParticleSize);
	this.vx = -5 + Math.random()*10;
	this.vy = .2* this.radius;
	this.color = color;

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0,Math.PI *2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	this.update = function(){
		if (this.x < canvas.width - radius*2 && this.x > radius*2) {
			this.x = (this.x + this.vx/config.speed);
		} else {
			this.changeDirection()
		}
		if (this.y < canvas.height - radius*2 && this.y > radius*2) {
			this.y = (this.y + this.vy/config.speed);
		} else {
			this.changeDirection()
		}
		this.draw(this.x, this.y, this.radius, this.color);
	}
	this.updatePosition = function(x, y){
		this.x = x; this.y = y;
	}
	this.changeDirection = function(){
		// console.log(this.x, this.y)
		// this.x = (this.x - parseInt(this.vx/config.speed));
		// this.y = (this.y - parseInt(this.vx/config.speed));
	}
	// this.draw();
};

var pointsArray = [];

function getCursorPosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	return {x: x, y: y};
}

function animateCircle() {
	ctx.clearRect(0, 0, width, height);

	for (var i = 0; i < pointsArray.length; i++ ){ 
		pointsArray[i].update();
	}
	requestAnimationFrame(animateCircle);
};

function drawCircle() {
	for ( var i = 0; i < config.pointsMax; i++ ){
		// Возвращает случайное число между min (включительно) и max (не включая max)
		// Math.random() * (max - min) + min;
		var radius = Math.ceil(Math.random() * config.maxParticleSize);
		// учитывая ширину частицы и отступы по краям
		var x = Math.random() * (width - radius*2) + radius;
		var y = Math.random() * (height - radius*2) + radius;
		
		pointsArray.push(new Circle(x, y, radius, getRandomColor()));
	};
	animateCircle()
};

drawCircle()

//report the mouse position on click
canvas.addEventListener("click", function (event) {
	var coords = getCursorPosition(canvas, event);
	for (var i = 0; i < pointsArray.length; i++ ){ 
		pointsArray[i].updatePosition(coords.x, coords.y);
	}
});
