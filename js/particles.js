//global
particles = [];
canvas = null;
context = null;

function draw() {
	context.fillStyle = "rgb(250,1250,250)"
	for(var i = 0; i < particles.length; i++) {
		particle = particles[i];
		context.beginPath();
		context.lineWidth = "100"
		context.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI, false);
      	context.fill();
	}
}

function move() {
	for(var i = 0; i < particles.length; i++) {
		particle = particles[i];
		if (particle.y >= canvas.height() || particle.y <= 0) {
			particle.y = canvas.height();
		} 
		particle.y = particle.y + particle.vy;

		if (particle.x >= canvas.width() || particle.x <= 0) {
			particle.vx = -particle.vx
		} 
		particle.x = particle.x + particle.vx;
	}
}

function update() {
	resizeCanvas();
	context.clearRect(0, 0, canvas.width(), canvas.height());
	move();
	draw();
}

function initialize(n) {
	for(var i = 0; i < n; i++) {
		particles.push({
			r : Math.floor(Math.random() * 4),
			x : Math.random() * canvas.width(),
			y : Math.random() * canvas.height(),
			vx : (Math.random() - 0.5) / 2.5,
			vy : -(Math.abs(Math.random() / 2.5))
		});
	}
}

function resizeCanvas() {
	context.canvas.width = window.innerWidth;
	context.canvas.height = canvas.parent().height();
}

$(function() {
	canvas = $("#particles");
	context = canvas[0].getContext("2d");
	$(window).resize(resizeCanvas);
	resizeCanvas();
	initialize($(window).width() / 15);
	setInterval(update, 80)
});