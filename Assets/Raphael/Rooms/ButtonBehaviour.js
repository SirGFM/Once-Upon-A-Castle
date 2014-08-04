#pragma strict

var parent:RoomBehaviour;
var buttontype:int;
function OnMouseDown () 
{
	parent.button=buttontype;
	parent.click=true;
	yield WaitForFixedUpdate();
	parent.click=false;
}

function Update()
{
}

function OnMouseEnter () 
{
	Debug.Log("ok");
	transform.localScale=Vector3(1.5,1.5,1.5);
}

function OnMouseExit () 
{
	Debug.Log("ok");
	transform.localScale=Vector3(1,1,1);
}