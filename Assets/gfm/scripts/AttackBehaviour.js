#pragma strict

var targetTag:String = "";
var doRun:boolean = false;
var damage:float = 1.0f;
var maxHealth:float = 1.0f;
var animator:Animator;
// time to live
var ttl:float = 0.5f;
var gold:float = 0.0f;
var myaudio:AudioSource;
var ondeath:AudioSource;

private var playingSound:boolean = false;
private var alive:boolean;
private var delta:float;
private var health:float;
private var sprMove:SpriteMovement;
private var other:AttackBehaviour;

function Start() {
	sprMove = GetComponent(SpriteMovement) as SpriteMovement;
	other = null;
	health = maxHealth;
	alive = true;
}

function reset() {
	other = null;
	health = maxHealth;
	alive = true;
}

function Update() {
	if (!alive)
		return;
	if (other != null) {
		if (gameObject.tag != "projectile") {
			if (gameObject.tag == "character" || gameObject.tag == "boss")
				animator.SetTrigger("attack");
			playSound();
			if (!other.giveHealth(-damage * Time.deltaTime)) {
				other = null;
					return;
			}
		}
		else {
			other.giveHealth(-damage);
			Destroy(gameObject);
			return;
		}
		if (renderer.bounds.center.x < other.renderer.bounds.center.x + delta)
			sprMove.setDirection("right");
		else if (renderer.bounds.center.x > other.renderer.bounds.center.x - delta)
			sprMove.setDirection("left");
	}
	if (health <= 0) {
		alive = false;
		playDeathAnim();
	}
}

function playSound() {
	if (playingSound)
		return;
	playingSound = true;
	if (myaudio)
		myaudio.Play();
	yield WaitForSeconds(1);
	playingSound = false;
}

function playDeathAnim() {
	animator.SetTrigger("death");
	if (sprMove.direction == "right")
		sprMove.direction = "left";
	else
		sprMove.direction = "right";
	collider2D.enabled = false;
	if (ondeath)
		ondeath.Play();
	yield WaitForSeconds(ttl);
	if (tag == "enemy") {
		var intGold:int = gold*1.5f;
		(GameObject.FindGameObjectWithTag("Manager").GetComponent(LevelBehaviour) as LevelBehaviour).addGold(intGold);
	}
	Destroy(gameObject);
}

function OnTriggerEnter2D(otherCol:Collider2D) {
	if (other == null)
		getTarget(otherCol);
}
function OnTriggerStay2D(otherCol:Collider2D) {
	if (other == null)
		getTarget(otherCol);
}

function getTarget(otherCol:Collider2D) {
	if (otherCol.tag == targetTag) {
		if (doRun) {
			if (sprMove.direction == "right")
				sprMove.setDirection("left");
			else if (sprMove.direction == "left")
				sprMove.setDirection("right");
		}
		else {
			other = otherCol.GetComponent(AttackBehaviour) as AttackBehaviour;
			delta = Random.Range(0.0f, 0.3f);
		}
	}
}

function OnTriggerExit2D(otherCol:Collider2D) {
	if (otherCol.tag == targetTag) {
		if (other == otherCol.GetComponent(AttackBehaviour) as AttackBehaviour)
			other = null;
	}
}

function giveHealth(val:float):boolean {
	health += val;
	if (health > maxHealth)
		health = maxHealth;
	return health > 0;
}

function getHealth():float {
	return health;
}

function untarget() {
	other = null;
}

function getSprMove():SpriteMovement {
	return sprMove;
}

function getOtherSprMove():SpriteMovement {
	if (other)
		return other.getSprMove();
	return null;
}
