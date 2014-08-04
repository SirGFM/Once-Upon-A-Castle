#pragma strict

var projectile:GameObject;
var spawnTime:float = 1.0f;
var behind:boolean = false;
private var acc:float;
private var sprMov:SpriteMovement;

function Start () {
	acc = 0.0f;
	sprMov = GetComponent(SpriteMovement) as SpriteMovement;
}

function Update () {
	acc += Time.deltaTime;
	if (acc >= spawnTime) {
		var obj:GameObject;
		var objSprMov:SpriteMovement;
		
		// reset timer
		acc -= spawnTime;
		// instantiate the projectile
		obj = Instantiate(projectile);
		// set its position
		obj.transform.position.x = transform.position.x;
		obj.transform.position.y = transform.position.y;
		// set its directoin
		objSprMov = obj.GetComponent(SpriteMovement) as SpriteMovement;
		if (!behind)
			objSprMov.direction = sprMov.direction;
		else {
			if (sprMov.direction == "right")
				objSprMov.direction = "left";
			else
				objSprMov.direction = "right";
		}
		// reset it health (LOL)
		(obj.GetComponent(AttackBehaviour) as AttackBehaviour).reset();
	}
}
