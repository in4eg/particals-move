(function() {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();


var config = {
	pointsMax: 5,
	maxParticleSize: 20,
	maxSpeed: 40,
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
	drawCircle();
});


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

Circle = function(x, y, radius){
	this.x = x || Math.round(Math.random() * canvas.width);
	this.y = y || Math.round(Math.random() * canvas.height);
	this.radius = radius || Math.round(Math.random() * config.maxParticleSize);
	this.color = getRandomColor();

	this.draw = function(){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0,Math.PI *2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	this.update = function(){
		if (this.x < canvas.width - radius*2) {
			this.x += 1
		} else {
			this.x = 0
		}
		if (this.y < canvas.height - radius*2) {
			this.y += 1
		} else {
			this.y = 0
		}
		this.draw(this.x, this.y);
	}

	// this.draw();
};

var pointsArray = [];

function drawCircle() {
	
	for ( var i = 0; i < config.pointsMax; i++ ){
		// Возвращает случайное число между min (включительно) и max (не включая max)
		// Math.random() * (max - min) + min;
		var radius = Math.ceil(Math.random() * config.maxParticleSize);
		// учитывая ширину частицы и отступы по краям
		var x = Math.random() * (width - radius*2) + radius;
		var y = Math.random() * (height - radius*2) + radius;
		
		pointsArray.push(new Circle(x, y, radius));
	};
};

function animateCircle() {
	ctx.clearRect(0, 0, width, height);

	for (var i = 0; i < pointsArray.length; i++ ){ 
		pointsArray[i].update();
	}
	requestAnimationFrame(animateCircle);
}

drawCircle()
animateCircle()