let heart;
let clouds = [];
let stars = [];
let cam;
let bgColor;
let txt;
let txt2;
let fnt;


function setup() {
    bgColor = color(200, 200, 200);
    createCanvas(400, 400, WEBGL);
    background(bgColor);
    cam = createCamera();
    fill(204, 101, 192);
    fnt = loadFont('TwilightFont-Regular.otf');
    heart = new Heart(0, -50, 80, color(200, 30, 80), 2);
    txt = new MSG(-45, -3100, 42, color('white'), "Happy Valentine's Day", fnt);
    txt2 = new MSG(-45, -2900, 36, color('white'), "Love CJ", fnt);
    for (let i = 0; i < 100; i++) {
        clouds.push(new Cloud(random(-400, 400), random(-2000, 0), random(30, 120), color(200, 180, random(180, 220))));
    }

    for (let i = 0; i < 100; i++) {
        stars.push(new Star(random(-400, 400), random(-4000, -2500), random(2, 10), color(200, 200, 200)));
    }
}

function draw() {
    background(bgColor);

    for (let i = 0; i < clouds.length; i++) {
        stars[i].display();
    }
    heart.display();
    txt.display();
    txt2.display();

    for (let i = 0; i < clouds.length; i++) {
        clouds[i].display();
    }
    if (heart.y > -3000) {
        heart.move();
    }

    if (heart.y < -2500) {
        bgColor = color('black');
    } else if (heart.y < -2000) {
        bgColor = color(100, 100, 100);
    }


}


class Heart {
    constructor(_x, _y, _size, _color, _speed) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.color = _color;
        this.speed = _speed;
        this.ropeLength = random(this.size * 2, this.size * 3);
    }

    move() {
        this.y -= this.speed;
        cam.move(0, -this.speed, 0);
        //console.log(this.y);
    }
    display() {
        fill(this.color)
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
}

class Cloud {
    constructor(_x, _y, _size, _color) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.color = _color;
    }

    display() {
        fill(this.color)
        noStroke();
        ellipse(this.x, this.y, this.size, this.size - 20);
        ellipse(this.x + 10, this.y + 10, this.size, this.size - 20);
        ellipse(this.x - 20, this.y + 10, this.size, this.size - 20);
    }
}

class Star {
    constructor(_x, _y, _size, _color) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.color = _color;
    }

    display() {
        fill(this.color)
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }
}

class MSG {
    constructor(_x, _y, _size, _color, _msg, _fnt) {
        this.x = _x;
        this.y = _y;
        this.size = _size;
        this.color = _color;
        this.msg = _msg;
        this.fnt = _fnt;
    }

    display() {
        textSize(this.size);
        fill(this.color)
        textFont(this.fnt);
        textAlign(CENTER, CENTER);
        text(this.msg, this.x, this.y, 100, 100);
    }
}