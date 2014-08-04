#pragma strict

var minX:float = -4.0f;
var maxX:float = 4.0f;

function Update () {
	if (transform.position.x < minX || transform.position.x > maxX)
		Destroy(gameObject);
}