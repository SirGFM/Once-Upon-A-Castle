#pragma strict

function Start () {

}

function Update () 
{
	transform.position.x=Camera.main.ScreenToWorldPoint(Input.mousePosition).x;
	transform.position.y=Camera.main.ScreenToWorldPoint(Input.mousePosition).y;
}