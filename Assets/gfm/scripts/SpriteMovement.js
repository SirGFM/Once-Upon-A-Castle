#pragma strict

var animator:Animator;
var direction:String = "right";
var speed:float = 0.5f;
var randomDir:int = 0;

var doSin:boolean = false;
var dY:float = 0.0f;

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
	minY = transform.position.y;
}

function Update() {
	var delta:float = 0.0f;
	if (time > 0.0f) {
		time -= Time.deltaTime;
		if (time > maxtime*0.5f)
			transform.position.y = minY + Mathf.Lerp(0.0f, 0.25f, maxtime - time);
		else if (time > 0.0f)
			transform.position.y = minY + Mathf.Lerp(0.0f, 0.25f, time);
		else {
			transform.position.y = minY;
			thr = 0.0f;
			time = -2.0f;
		}
		if (lastDir == "right")
			delta = thr;
		else
			delta = -thr;
	}
	else if (time < 0.0f) {
		time += Time.deltaTime;
		if (time >= 0.0f)
			time = 0.0f;
	}
	
	if (direction == "right")
		transform.position.x += (speed-delta) * Time.deltaTime;
	else if (direction == "left")
		transform.position.x -= (speed-delta) * Time.deltaTime;
	
	if (doSin)
		transform.position.y = minY + dY;
}

function OnTriggerEnter2D(other:Collider2D) {
	if (other.tag.Contains("wall")) {
		if (tag == "projectile")
			Destroy(gameObject);
		else if (other.tag.Contains("right") && direction != "right") {
			//animator.SetTrigger("changeDirection");
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
