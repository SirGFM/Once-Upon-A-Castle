#pragma strict

var animator:Animator;
private var sprMovement:SpriteMovement;
private var atkBhv:AttackBehaviour;
private var action:String = "move";
private var targetX:float;

static private var lvlBhv:LevelBehaviour = null;
var hat:SpriteRenderer;

var chicken:Sprite;
var tiger:Sprite;
var elephant:Sprite;

var myaudio1:AudioSource;
var myaudio2:AudioSource;
var myaudio3:AudioSource;
static private var playingSound:boolean = false;

enum myClasses {
	NONE,
	CHICKEN,
	TIGER,
	ZOU
};

var curClass:myClasses = myClasses.NONE;

function Start () {
	if (lvlBhv == null) {
		lvlBhv = GameObject.FindGameObjectWithTag("Manager").GetComponent(LevelBehaviour) as LevelBehaviour;
	}
	sprMovement = GetComponent(SpriteMovement) as SpriteMovement;
	atkBhv = GetComponent(AttackBehaviour) as AttackBehaviour;
	action = "move";
}

function Update () {
	if (action == "move") {
		if (sprMovement.direction == "none") {
			sprMovement.setDirection("right");
		}
	}
	else if (action == "stairs") {
		if (doCenter())
			goUpstairs();
	}
	else if (action == "dinner") {
		if (doCenter()) {
			enterDinner();
		}
	}
	else if (action != "wait" && action != "attack")
		sprMovement.direction = "none";
}

function doCenter():boolean {
	var thisX:float = renderer.bounds.center.x;
	var dist:float = thisX - targetX;
	if (Mathf.Abs(dist) < 0.05f)
		return true;
	else if (sprMovement.direction == "right" && dist > 0)
		sprMovement.setDirection("left");
	else if (sprMovement.direction == "left" && dist < 0)
		sprMovement.setDirection("right");
	return false;
}

function goUpstairs() {
	if (action == "wait")
		return;
	action = "wait";
	sprMovement.moving = false;
	animator.SetTrigger("stairs");
}

// Called by the animation
function finishUpstairs() {
	if (action == "none")
		return;
	action = "move";
	sprMovement.moving = true;
	sprMovement.addY(1.5f);
	sprMovement.dY = 0.0f;
}

function enterDinner() {
	if (action == "none")
		return;
	action = "none";
	sprMovement.moving = false;
	animator.SetTrigger("stairs");
	animator.SetBool("wooble", true);
}

function OnTriggerStay2D(other:Collider2D) {
	if (action != "wait" && other.tag == "Stairs" && (other.GetComponent(RoomBehaviour) as RoomBehaviour).click == true) {
		action = "stairs";
		targetX = other.renderer.bounds.center.x;
	}
	else if (other.tag == "NurseryRoom" && (other.GetComponent(RoomBehaviour) as RoomBehaviour).click == true) {
		atkBhv.giveHealth(5);
	}
	else if (other.tag == "WeaponsRoom" && (other.GetComponent(RoomBehaviour) as RoomBehaviour).click == true) {
		Debug.Log("here!");
		if (didDecGold() && curClass != myClasses.ZOU) {
			Debug.Log(curClass);
			setClass(curClass+1);
		}
	}
	else if (other.tag == "DinnerRoom") {
		var room:RoomBehaviour = other.GetComponent(RoomBehaviour) as RoomBehaviour;
		if (room.click == true) {
			// TODO check capacity
			// home
			if (room.button == 1 && (action != "dinner" && action != "none")) {
				action = "dinner";
				targetX = other.renderer.bounds.center.x + Random.Range(-0.15f, 0.15f);
			}
			else if (action == "none") {
				// left
				if (room.button == 2) {
					sprMovement.dY = 0.0f;
					sprMovement.setDirection("left");
					animator.SetBool("wooble", false);
					action = "move";
				}
				// right
				else if (room.button == 3) {
					sprMovement.dY = 0.0f;
					sprMovement.setDirection("right");
					animator.SetBool("wooble", false);
					action = "move";
				}
			}
		}
	}
}

function playSound(audiotoplay:AudioSource) {
	if (playingSound)
		return;
	playingSound = true;
	if (audiotoplay)
		audiotoplay.Play();
	yield WaitForSeconds(1);
	playingSound = false;
}

function addGold(i:int):boolean {
	return lvlBhv.addGold(i);
}

function didDecGold():boolean {
	if (curClass == myClasses.NONE)
		return addGold(-10);
	else if (curClass == myClasses.CHICKEN)
		return addGold(-20);
	else if (curClass == myClasses.TIGER)
		return addGold(-30);
	return false;
}

function setClass(newClass:myClasses) {
	Debug.Log(newClass);
	if (newClass == myClasses.NONE) {
		atkBhv.damage = 1.0f;
		atkBhv.maxHealth = 1.0f;
		atkBhv.reset();
		hat.enabled = false;
	}
	else if (newClass == myClasses.CHICKEN) {
		atkBhv.damage = 2.0f;
		atkBhv.maxHealth += 2.0f;
		atkBhv.giveHealth(2.0f);
		hat.enabled = true;
		hat.sprite = chicken;
		hat.transform.position = hat.transform.parent.TransformPoint(-0.12,0.53,0.0);
		playSound(myaudio1);
	}
	else if (newClass == myClasses.TIGER) {
		atkBhv.damage = 4.0f;
		atkBhv.maxHealth += 4.0f;
		atkBhv.giveHealth(4.0f);
		hat.enabled = true;
		hat.sprite = tiger;
		hat.transform.position = hat.transform.parent.TransformPoint(-0.038,0.46,0.0);
		playSound(myaudio2);
	}
	else if (newClass == myClasses.ZOU) {
		atkBhv.damage = 8.0f;
		atkBhv.maxHealth += 8.0f;
		atkBhv.giveHealth(8.0f);
		hat.enabled = true;
		hat.sprite = elephant;
		hat.transform.position = hat.transform.parent.TransformPoint(-0.024,0.424,0.0);
		playSound(myaudio3);
	}
	curClass = newClass;
}
