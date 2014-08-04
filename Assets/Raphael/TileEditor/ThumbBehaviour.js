#pragma strict

var phantom:Transform;
var text:GUIText;
var title:String;
var price:int;
var active:boolean=false;
var skin:GUISkin;
var textset:boolean=false;

function Start () 
{
	text=GameObject.FindGameObjectWithTag("Text").guiText;
}

function OnMouseDown () 
{
	drag=true;
}

function OnMouseUp () 
{
	drag=false;
}

function OnMouseEnter () 
{
	guiTexture.color=Color.white;
}

function OnMouseExit () 
{
	guiTexture.color=Color.gray;
}

function Update()
{
	var contains:boolean=guiTexture.GetScreenRect().Contains (Input.mousePosition);
	if (drag&&!contains&&(GameObject.FindGameObjectWithTag("Manager").GetComponent(LevelBehaviour) as LevelBehaviour).canAddGold(-1*price))
	{
		var temp:Transform=Instantiate(phantom);
		(temp.GetComponent(PhantomBehaviour) as PhantomBehaviour).price=price;
		drag=false;
	}
	if(contains)
	{
		text.text=title+" - "+price+" gold";
	}
	else
	{
		if(text.text==title) text.text="";
	}
}

var drag:boolean=false;