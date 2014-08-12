#pragma strict

var hasbuttons:boolean=false;
var button:int;
var button1:Transform;
var button2:Transform;
var button3:Transform;

var roomtime:float=2;
var cantouch:boolean=true;

function OnMouseDown () 
{
	if(cantouch)
	{
		if(!hasbuttons)
		{
			click=true;
			yield WaitForFixedUpdate();
			click=false;
		}
		else
		{
			var dx:float=Camera.main.ScreenToWorldPoint(Input.mousePosition).x;
			if(dx<transform.position.x-0.15)
			{
				button=2;
			}
			else if(dx>transform.position.x+0.15)
			{
				button=3;
			}
			else
			{
				button=1;
			}
			click=true;
			yield WaitForFixedUpdate();
			click=false;
		}
		stopTouch();
	}
}

function stopTouch()
{
	cantouch=false;
	renderer.material.color=Color.gray;
	yield WaitForSeconds(roomtime);
	cantouch=true;
	renderer.material.color=Color.white;
}

function OnMouseOver()
{
	
	if(hasbuttons)
	{
		var dx:float=Camera.main.ScreenToWorldPoint(Input.mousePosition).x;
		if(dx<transform.position.x-0.15)
		{
			button1.localScale=Vector3(1,1,1);
			button2.localScale=Vector3(1.5,1.5,1.5);
			button3.localScale=Vector3(1,1,1);
		}
		else if(dx>transform.position.x+0.15)
		{
			button1.localScale=Vector3(1,1,1);
			button2.localScale=Vector3(1,1,1);
			button3.localScale=Vector3(1.5,1.5,1.5);
		}
		else
		{
			button1.localScale=Vector3(1.5,1.5,1.5);
			button2.localScale=Vector3(1,1,1);
			button3.localScale=Vector3(1,1,1);
		}
	}
}

function OnMouseExit()
{
	
	if(hasbuttons)
	{
		button1.localScale=Vector3(1,1,1);
		button2.localScale=Vector3(1,1,1);
		button3.localScale=Vector3(1,1,1);
	}
}

var click:boolean=false;


// ================================================


/**
 * How many players are in the room atm
 */
var passingPlayers:int;
var power:float = 10.0f;
/**
 * How many players can enter the room... if that makes sense
 */
var maxPlCounter:int;

function OnTriggerEnter2D(other:Collider2D) {
	if (other.tag != "character") {
		return;
	}
	passingPlayers++;
}

function OnTriggerExit2D(other:Collider2D) {
	if (other.tag != "character") {
		return;
	}
	passingPlayers--;
}
