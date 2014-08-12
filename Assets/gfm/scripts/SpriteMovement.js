#pragma strict

var animator:Animator;
var speed:float = 0.5f;
var randomDir:int = 0;

/**
 * When this is set, the sprite is forced to
 * update to the current position.
 */
var forcePosition:boolean = false;
private var _direction:String = "right";
/**
 * Enables/Disables the sprite movement
 */
private var _moving:boolean = true;
/**
 * Horizontal displacement; used for animations
 */
var dX:float = 0.0f;
/**
 * Vertical displacement; used for animations
 */
var dY:float = 0.0f;

/**
 * Store the current X position (so it can be animated)
 */
private var curY:float;
/**
 * Store the current Y position (so it can be animated)
 */
private var curX:float;
/**
 * Whether already touched a wall that sends you right
 */
private var enteredWallRight:boolean = false;
/**
 * Whether already touched a wall that sends you left
 */
private var enteredWallLeft:boolean = false;

private var lastDir:String;
private var minY:float;
private var thr:float = 0.0f;
private var maxtime:float = 0.5f;
private var time:float = 0.0f;

function Start() {
	if (randomDir == 1)
		direction = "right";
	else if (randomDir == 2)
		direction = "left";
	setPos(transform.position.x, transform.position.y);
}

function Update() {
	if (moving) {
		// Update logical position
		if (direction == "right")
			curX += speed * Time.deltaTime;
		else if (direction == "left")
			curX -= speed * Time.deltaTime;
	}
	// Check if going over a wall and block it
	if (enteredWallRight && curX + dX < -2.0f) {
		curX = -2.0f;
		dX = 0.0f;
		if (direction != "right")
			direction = "right";
	}
	else if (enteredWallLeft && curX + dX > 2.0f) {
		curX = 2.0f;
		dX = 0.0f;
		if (direction != "left")
			direction = "left";
	}
	// Update "physical" position
	transform.position.x = curX + dX;
	transform.position.y = curY + dY;
	// Check if the physical position should be set as logical
	if (forcePosition) {
		curX += dX;
		curY += dY;
	}
}

function OnTriggerEnter2D(other:Collider2D) {
	// When touch a wall
	if (other.tag.Contains("wall")) {
		// Destroy it, if it's a projectile
		if (tag == "projectile")
			Destroy(gameObject);
		// Otherwise, change direction as necessary
		else if (!enteredWallRight && other.tag.Contains("right") && direction != "right")
			enteredWallRight = true;
		else if (!enteredWallLeft && other.tag.Contains("left") && direction != "left")
			enteredWallLeft = true;
	}
}

function addX(val:float) {
	curX += val;
}
function addY(val:float) {
	curY += val;
}
function setX(val:float) {
	curX = val;
}
function setY(val:float) {
	curY = val;
}
function setPos(X:float, Y:float) {
	setX(X);
	setY(Y);
}

function setDirection(Dir:String) {
	if (direction != Dir) {
		direction = Dir;
		animator.SetBool("direction", Dir == "right");
	}
}

function Throw(Strength:float) {
	if (time != 0.0f)
		return;
	lastDir = direction;
	minY = transform.position.y;
	thr = Strength;
	time = maxtime;
}

function set direction(value:String) {
	_direction = value;
	if (value != "none")
		animator.SetBool("direction", value == "right");
}

function get direction():String {
	return _direction;
}

function set moving(value:boolean) {
	_moving = value;
	animator.SetBool("moving", value);
}

function get moving():boolean {
	return _moving;
}
