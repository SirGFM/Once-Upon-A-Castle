#pragma strict

private var halfHealth:float;
private var atkBhv:AttackBehaviour;

function Start () {
	atkBhv = GetComponent(AttackBehaviour) as AttackBehaviour;
	halfHealth = atkBhv.maxHealth * 0.5f;
}

function Update () {
	if (atkBhv.getHealth() < halfHealth) {
		atkBhv.doRun = true;
		this.enabled = false;
	}
}
