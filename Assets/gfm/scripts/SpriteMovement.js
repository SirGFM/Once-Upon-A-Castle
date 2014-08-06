#pragma strict

var animator:Animator;
var direction:String = "right";
var speed:float = 0.5f;
var randomDir:int = 0;

/**
 * When this is set, the sprite is forced to
 * update to the current position.
 */
var forcePosition:boolean = false;
/**
 * Enables/Disables the sprite movement
 */
var moving:boolean = true;
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

private var lastDir:String;
private var minY:float;
private var thr:float = 0.0f;
private var maxtime:float = 0.5f;
private var time:float = 0.0f;

function Start() {
	if (randomDir == 1)
		setDirection("right");
	else if (randomDir == 2)
		setDirection("left");
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
		else if (other.tag.Contains("right") && direction != "right") {
			animator.SetBool("direction", true);
			direction = "right";
		}
		else if (other.tag.Contains("left") && direction != "left") {
			//animator.SetTrigger("changeDirection");
			animator.SetBool("direction", false);
			direction = "left";
		}
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
