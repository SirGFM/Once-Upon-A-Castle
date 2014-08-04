#pragma strict

var fuckYou:boolean = true;
private var atkBhv:AttackBehaviour;

function Start() {
	atkBhv = GetComponent(AttackBehaviour) as AttackBehaviour;
}

function Update () {
	if (fuckYou) {
		fuckYou = false;
		changeAtk();
	}
}

function changeAtk() {
	var i:int = 10;
	yield WaitForSeconds(5);
	while (i > 0) {
		var sprMove:SpriteMovement;
		sprMove = atkBhv.getOtherSprMove();
		if (sprMove) {
			sprMove.Throw(2);
		}
		yield WaitForSeconds(0.5f);
		i--;
	}
	fuckYou = true;
}
