let hearts = [];
let flowers = [];
let pigs = [];
let clouds = [];
let planes = [];

let numHearts;
let numFlowers;
let numPigs;
let numClouds;
let numPlanes;

let bgColor;
let dt;

function setup() {
	var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
	cnv.style('display', 'block');

	angleMode(DEGREES);
	imageMode(CENTER);
	
	bgColor = color(255, 50, 50);
	background(bgColor);
	
	numHearts = 15;	
	numFlowers = 25;
	numPigs = 6;
	numClouds = 6;
	numPlanes = 4;

	for (var i = 0; i < numFlowers; i++)
	{
		var hgt = random(10, 30);
		var z = 0;
		if (hgt <= 16) {
			z = -1;		
		}
		else if (hgt <= 25) {
			z = 0;
		}
		else{
			z = 1;
		}
		
		flowers.push(
			new Flower(
				i * (windowWidth/numFlowers)  - (windowWidth/2) + (random(-10, 10)), //x
				windowHeight/2 - (windowHeight/8), //y
				z, //z
				random(5, 35), //size
				random(-10, 10), //rotation 
				color(random(0, 200), random(0, 200), random(0, 200)), //petal color
				color(random(0, 200), random(0, 200), random(0, 200)), //center color
				random(1, 4), //stem width 
				hgt, 
				random(50, 120),
				random(8, 20))); //stem length
	}

	for (var p = 0; p < numPigs; p++)
	{
		var nm = 'assets/pig_' +  int(random(0, 3)).toString() + '.png';
		var hgt = random(-5, 5);
		var z = 0;
		if (hgt <= 0) {
			z = -1;		
		}
		else if (hgt <= 2.5) {
			z = 0;
		}
		else{
			z = 1;
		}
		pigs.push(
			new Pig(
				random(-(windowWidth/2) + random(-20, 20), (windowWidth/2) + random(-50, 50)), 
				windowHeight/2 - (windowHeight/8) + hgt,
				z, 
				random(6,20), 
				loadImage(nm), 
				int(random(0,2)),
				40, 
				23,
				0)
			);	
	}

	for (var c = 0; c < numClouds; c++)
    {
        clouds.push(new 
			Cloud(
				random(-windowWidth/2 - 5, windowWidth/2), 
				random(-windowHeight/2, -windowHeight/2 + (windowHeight/6)), 
				random(30, 120),
				color(200, 180, random(180, 220))));
    }

	for (var x = 0; x < numPlanes; x++)
	{
		var nm = 'assets/plane_' +  x.toString() + '.png';

		planes.push( new Pig(
			-windowWidth/2 - random(300, 1000),
			-windowHeight/2 + (windowHeight/8) + ((windowHeight/8) * x),
			-1, 
			random(20,50), 
			loadImage(nm), 
			int(random(0,2)), 
			200, 
			50, 
			100));
	}


}

function draw() {
	dt = 1/frameRate();
	
	background(bgColor);

	DrawGround();

	for (var i = 0; i < flowers.length; i++)
	{
		flowers[i].grow();

		flowers[i].display();
	}

	for (var j = 0; j < pigs.length; j++)
	{
		pigs[j].move();
		pigs[j].display();
	}

	for (var c = 0; c < clouds.length; c++)
	{
		clouds[c].display();
	}

	for (var x = 0; x < planes.length; x++)
	{
		planes[x].move();
		planes[x].display();
	}
	MouseBalloons();

}

function mouseClicked() {

	for (var i = 0; i < numHearts; i++) {
		var msX = mouseX - width / 2;
		var msY = mouseY - height / 2;
		hearts.push(new HeartBalloon(msX, msY, random(5, 25), color(random(0, 200), random(0, 200), random(0, 200))));
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}



function DrawGround() {	
	push();
	translate(-windowWidth/2, windowHeight/2 - 100, -2);
	fill(150, 120, 40, 240);
	rect(0, 0, windowWidth, 100);
	pop();

}

function MouseBalloons()
{
	var removeNdx = -1;
	for (var i = 0; i < hearts.length; i++) {
		hearts[i].display();
		hearts[i].move();
		if (hearts[i].y < -500) {
			removeNdx = i;
		}
	}
	if (removeNdx >= 0) {
		hearts.splice(removeNdx, 1);
	}
}

function DrawFlower(x, y, z, rotation, stemLength, stemWidth, petalColor, middleColor) {
	push();
	translate(x,y,z);
	rotate(rotation);

	//stem
	push();
		translate(0,0,-1);
		beginShape(LINES);		
		stroke('green');

		strokeWeight(stemWidth);
		vertex(0, 0);
		vertex(0, stemLength);
		endShape();
	pop();

	//petals
	//rt = i * 90
	//x = i * s = 0
	//x = 16
	DrawHeart(0, -16, color(petalColor), 16, 0, 0);
	DrawHeart(16, 0, color(petalColor), 16, 90, 0);
	DrawHeart(0, 16, color(petalColor), 16, 180, 0);
	DrawHeart(-16, 0, color(petalColor), 16, 270, 0);
	//center
	DrawHeart(0, -6, color(middleColor), 12, 0, 1);
	
	pop();
}
function DrawHeart(x, y, color, size, rotation, z) {
	push();
	translate(x, y, z);
	rotate(rotation);

	fill(color);
	beginShape();

	vertex(0, 0);
	
	bezierVertex(
		-size / 2,		//x1
		-size / 2, 		//y1
		-size, 			//x2
		size / 3, 		//y2
		0, 				//x anchor
		size);			//y anchor

	bezierVertex(
		size,
		size / 3, 
		size / 2, 
		-size / 2, 
		0,
		0);


	endShape();
	pop();

}
function DrawImg(x,y, w, h, img, flip)
{
	push();
	translate(x,y, -1);
	if (flip)
	{
		scale(-1, 1)
		image(img, 0, 0, w, h);
	}
	else
	{
		image(img, 0, 0, w, h);
	}

	pop();
}


class Pig {
	constructor(_x, _y, _rotation, _speed, _img, _dir, _w, _h, _offscreenOffset)
	{
		this.x = _x;
		this.y = _y;
		this.rotation = _rotation;
		this.speed = _speed;
		this.dir = _dir;
		this.img = _img;
		this.w = _w;
		this.h = _h;
		this.offscreenOffset = _offscreenOffset;
	}

	move()
	{		
		if (dt != Infinity)
		{
			var mov = this.speed * dt;
			if (this.dir == 1)
			{
				mov = mov * -1;				
			}

			this.x += mov;

			if (this.dir == 0 && this.x > windowWidth + this.offscreenOffset)
			{
				this.dir = 1;
			}
			else if (this.dir == 1 && this.x < -windowWidth)
			{			
				this.dir = 0;
			}
		}
	}

	display()
	{
		var flip = this.dir == 1;

		DrawImg(this.x, this.y,  this.w, this.h, this.img, flip);
	}
}
class Flower {
	constructor(_x, _y, _z, _size, _rotation, _color, _middleColor, _stemWidth, _stemHeight, _maxStemHeight, _growSpeed)
	{
		this.x = _x;
		this.y = _y;
		this.z = _z;
		this.rotation = _rotation;
		this.size = _size;
		this.color = _color;
		this.middleColor = _middleColor;
		this.stemWidth = _stemWidth;
		this.stemHeight = _stemHeight;
		this.maxHeight = _maxStemHeight;
		this.growSpeed = _growSpeed;
	}

	display()
	{
		DrawFlower(this.x, this.y, this.z, this.rotation, this.stemHeight, this.stemWidth, this.color, this.middleColor);
	}

	grow()
	{
		if (dt != Infinity && this.stemHeight != this.maxHeight)
		{			
			this.stemHeight += this.growSpeed * dt;
			this.y -=  this.growSpeed * dt;
			if (this.stemHeight > this.maxHeight)
			{
				this.stemHeight = this.maxHeight;
			}
		}
	
	}
}

class Cloud {
    constructor(_x, _y, _size, _color) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.color = _color;
    }

    display() {
		push();
		translate(this.x, this.y, -1);
        fill(this.color)
        noStroke();
        ellipse(0, 0, this.size, this.size - 20);
        ellipse(10, 10, this.size, this.size - 20);
        ellipse(-20, 10, this.size, this.size - 20);
		pop();
    }
}


class HeartBalloon {
	constructor(_x, _y, _size, _color) {
		this.x = _x;
		this.y = _y;
		this.size = _size;
		this.color = _color;
		this.ropeLength = random(this.size * 2, this.size * 5);
		this.speedX = random(-256, 256);
		this.speedY = random(50, 256);
		this.strokeWeight = random(1,2);
	}

	display() {
		fill(this.color)
		strokeWeight(this.strokeWeight);
		stroke('black');

		beginShape();
		vertex(this.x, this.y);
		bezierVertex(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
		bezierVertex(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
		endShape();

		beginShape(LINES);
		vertex(this.x, this.y + this.size);
		vertex(this.x, this.y + this.ropeLength);
		endShape();
	}

	move() {
		this.y -= this.speedY * dt;
		this.x += this.speedX * dt;
		// var rand = random(0, 6);
		// if (rand == 0) {
		// 	this.x += 2;
		// }
		// else if (rand == 1) {
		// 	this.x -= 2;
		// }
		// else if (rand == 2) {
		// 	this.y += 2;
		// }
		// else if (rand == 3) {
		// 	this.y -= 2;
		// }
	}
}

class MSG {
	constructor(_x, _y, _size, _color, _msg) {
		this.x = _x;
		this.y = _y;
		this.size = _size;
		this.color = _color;
		this.msg = _msg;
	}

	display() {
		textSize(this.size);
		fill(this.color)
		text(this.msg, this.x, this.y);
	}
}














let flowerOffset = 125;
// function flower() {
// 	//drawFlower();
// 	translate(0, -flowerOffset);
// 	//flower1
// 	for (var r11 = 0; r11 < 10; r11++) {
// 		stroke(85, 107, 47, 20);
// 		strokeWeight(3);
// 		if (frameCount <= 600) {
// 			line(400, 550, 400, 400 + frameCount / 10);
// 		}
// 		if (frameCount > 600) {
// 			line(400, 550, 400, 460);
// 		}
// 		noStroke();
// 	}

// 	push();
// 	fill(230, 190, 230, 240);
// 	translate(400, 400);
// 	noStroke();
// 	//rotate(radians(frameCount / 2));
// 	for (var r1 = 0; r1 < 10; r1++) {
// 		if (frameCount <= 600) {
// 			ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
// 		}
// 		if (frameCount > 600) {
// 			ellipse(0, 40, 25, 50);
// 		}
// 		rotate(PI / 5);
// 	}
// 	pop();


// 	//flower2
// 	for (var r21 = 0; r21 < 10; r21++) {
// 		stroke(85, 107, 47, 20);
// 		strokeWeight(3);
// 		if (frameCount <= 600) {
// 			line(300, 580, 300, 430 + frameCount / 10);
// 		}
// 		if (frameCount > 600) {
// 			line(300, 580, 300, 490);
// 		}
// 		noStroke();
// 	}

// 	push();
// 	fill(235, 194, 204, 240);
// 	translate(300, 430);
// 	noStroke();

// 	for (var r2 = 0; r2 < 10; r2++) {
// 		if (frameCount <= 600) {
// 			ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
// 		}
// 		if (frameCount > 600) {
// 			ellipse(0, 40, 25, 50)
// 		}
// 		rotate(PI / 5);
// 	}
// 	pop();


// 	//flower3
// 	for (var r31 = 0; r31 < 10; r31++) {
// 		stroke(85, 107, 47, 20);
// 		strokeWeight(3);
// 		if (frameCount <= 600) {
// 			line(180, 535, 180, 390 + frameCount / 10);
// 		}
// 		if (frameCount > 600) {
// 			line(180, 535, 180, 435);
// 		}
// 		noStroke();
// 	}

// 	push();
// 	fill(245, 204, 174, 240);
// 	translate(180, 385);
// 	noStroke();
// 	for (var r3 = 0; r3 < 10; r3++) {
// 		if (frameCount <= 600) {
// 			ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
// 		}
// 		if (frameCount > 600) {
// 			ellipse(0, 40, 25, 50)
// 		}
// 		rotate(PI / 5);
// 	}
// 	pop();


// 	//flower4
// 	for (var r41 = 0; r41 < 10; r41++) {
// 		stroke(85, 107, 47, 20);
// 		strokeWeight(3);
// 		if (frameCount <= 600) {
// 			line(510, 575, 510, 425 + frameCount / 10);
// 		}
// 		if (frameCount > 600) {
// 			line(510, 575, 510, 485);
// 		}
// 		noStroke();
// 	}

// 	push();
// 	fill(245, 174, 154, 240);
// 	translate(510, 425);
// 	noStroke();
// 	for (var r4 = 0; r4 < 10; r4++) {
// 		if (frameCount <= 600) {
// 			ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
// 		}
// 		if (frameCount > 600) {
// 			ellipse(0, 40, 25, 50)
// 		}
// 		rotate(PI / 5);
// 	}
// 	pop();

// 	//flower5
// 	for (var r51 = 0; r51 < 10; r51++) {
// 		stroke(85, 107, 47, 20);
// 		strokeWeight(3);
// 		if (frameCount <= 600) {
// 			line(70, 600, 70, 450 + frameCount / 10);
// 		}
// 		if (frameCount > 600) {
// 			line(70, 600, 70, 510);
// 		}
// 		noStroke();
// 	}

// 	push();
// 	fill(245, 174, 184, 240);
// 	translate(70, 450);
// 	noStroke();
// 	for (var r5 = 0; r5 < 10; r5++) {
// 		if (frameCount <= 600) {
// 			ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
// 		}
// 		if (frameCount > 600) {
// 			ellipse(0, 40, 25, 50)
// 		}
// 		rotate(PI / 5);
// 	}
// 	pop();

// 	translate(0, flowerOffset );

// }
