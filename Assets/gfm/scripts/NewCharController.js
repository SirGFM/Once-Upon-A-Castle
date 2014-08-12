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

private var roomBhv:RoomBehaviour = null;

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
	sprMovement.moving = true;
}

function Update () {
	if (roomBhv)
		checkRoom();
	if (action == "move") {
		if (sprMovement.direction == "none") {
			sprMovement.direction = "right";
		}
	}
	else if (action == "stairs") {
		if (doCenter())
			goUpstairs();
	}
	else if (action == "dinner") {
		if (doCenter()) {
			goDinner();
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
		sprMovement.direction = "left";
	else if (sprMovement.direction == "left" && dist < 0)
		sprMovement.direction = "right";
	return false;
}

function goUpstairs() {
	if (action == "wait")
		return;
	action = "wait";
	animator.SetBool("stairs", true);
	sprMovement.moving = false;
}

function goDinner() {
	if (action == "none")
		return;
	action = "none";
	animator.SetBool("wooble", true);
	sprMovement.moving = false;
}

// Called by the animation
function finishUpstairs() {
	action = "move";
	sprMovement.addY(1.5f);
	sprMovement.dY = 0.0f;
	sprMovement.moving = true;
	animator.SetBool("stairs", false);
}

function finishDinner() {
	sprMovement.dY = 0.0f;
	animator.SetBool("wooble", false);
}

function checkRoom() {
	if (!roomBhv)
		return;
	if (action != "wait" && roomBhv.tag == "Stairs" && roomBhv.click) {
		action = "stairs";
		targetX = roomBhv.transform.renderer.bounds.center.x;
	}
	else if (roomBhv.tag == "NurseryRoom" && roomBhv.click) {
		atkBhv.giveHealth(5);
	}
	else if (roomBhv.tag == "WeaponsRoom" && roomBhv.click) {
		Debug.Log("here!");
		if (didDecGold() && curClass != myClasses.ZOU) {
			Debug.Log(curClass);
			setClass(curClass+1);
		}
	}
	else if (roomBhv.tag == "DinnerRoom") {
		if (roomBhv.click) {
			// TODO check capacity
			// home
			if (roomBhv.button == 1 && (action != "dinner" && action != "none")) {
				action = "dinner";
				targetX = roomBhv.transform.renderer.bounds.center.x + Random.Range(-0.15f, 0.15f);
			}
			else if (action == "none") {
				// left
				if (roomBhv.button == 2) {
					sprMovement.dY = 0.0f;
					action = "move";
					sprMovement.direction = "left";
					sprMovement.moving = true;
				}
				// right
				else if (roomBhv.button == 3) {
					sprMovement.dY = 0.0f;
					action = "move";
					sprMovement.direction = "right";
					sprMovement.moving = true;
				}
			}
		}
	}
}

function OnTriggerEnter2D(other:Collider2D) {
	// Try to get the current room behaviour
	if (other.tag == "Stairs" || other.tag.Contains("Room")) {
		roomBhv = other.GetComponent(RoomBehaviour) as RoomBehaviour;
	}
}

function OnTriggerExit2D(other:Collider2D) {
	// Check if it's exiting the room
	if (other.transform == roomBhv.transform)
		roomBhv = null;
}

/*
function OnTriggerStay2D(other:Collider2D) {
	var room:RoomBehaviour;
	Debug.Log(other.tag);
	if (other.tag == "Stairs" || other.tag.Contains("Room")) {
		Debug.Log("room!");
		Debug.Break();
		room = other.GetComponent(RoomBehaviour) as RoomBehaviour;
	}
	if (action != "wait" && other.tag == "Stairs" && room.click) {
		action = "stairs";
		targetX = other.renderer.bounds.center.x;
	}
	else if (other.tag == "NurseryRoom" && room.click) {
		atkBhv.giveHealth(5);
	}
	else if (other.tag == "WeaponsRoom" && room.click) {
		Debug.Log("here!");
		if (didDecGold() && curClass != myClasses.ZOU) {
			Debug.Log(curClass);
			setClass(curClass+1);
		}
	}
	else if (other.tag == "DinnerRoom") {
		if (room.click) {
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
					sprMovement.direction = "left";
					animator.SetBool("wooble", false);
					action = "move";
				}
				// right
				else if (room.button == 3) {
					sprMovement.dY = 0.0f;
					sprMovement.direction = "right";
					animator.SetBool("wooble", false);
					action = "move";
				}
			}
		}
	}
}
*/

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
