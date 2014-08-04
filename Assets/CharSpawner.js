#pragma strict

var character:Transform;
var spawnSpeed:float;

var char1:Sprite;
var char2:Sprite;
var char3:Sprite;
var char4:Sprite;

function Start () 
{
	while(true)
	{
		var person:Transform;
		var script:SpriteMovement;
		
		person = Instantiate(character);
		script = person.GetComponent(SpriteMovement);
		script.speed=Random.Range(0.5,0.7);
		if(Random.Range(-1,1)==0)
		{
			person.position.x=-3.3;
			script.direction ="right";
			script.animator.SetBool("direction", true);
		}
		else
		{
			person.position.x=3.3;
			script.direction="left";
			script.animator.SetBool("direction", false);
		}
		var rnd:float;
		rnd = Random.Range(0.0f, 1.0f);
		if (rnd < 0.25f)
			(person.GetComponent(SpriteRenderer)as SpriteRenderer).sprite  = char1;
		else if (rnd < 0.5f)
			(person.GetComponent(SpriteRenderer)as SpriteRenderer).sprite  = char2;
		else if (rnd < 0.75f)
			(person.GetComponent(SpriteRenderer)as SpriteRenderer).sprite  = char3;
		else
			(person.GetComponent(SpriteRenderer)as SpriteRenderer).sprite  = char4;
		
		yield WaitForSeconds(spawnSpeed);
	}
}


function Update () 
{
	
}