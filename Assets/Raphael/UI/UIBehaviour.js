#pragma strict

var goldicon:GUITexture;
var goldtext:GUIText;
var maintext:GUIText;

function Start () 
{
	goldicon.pixelInset.width=Screen.width/20;
	goldicon.pixelInset.height=Screen.width/20;
	goldtext.fontSize=goldicon.pixelInset.width=Screen.width/30;
}

function Update () {

}