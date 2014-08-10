#pragma strict

var phantom:Transform;
var text:GUIText;
var title:String;
var price:int;
var active:boolean=false;
var skin:GUISkin;
var textset:boolean=false;

private var castleHnd:SceneHandler;

function Start () 
{
	text=GameObject.FindGameObjectWithTag("Text").guiText;
	castleHnd = GameObject.FindGameObjectWithTag("CastleHandler").GetComponent(SceneHandler) as SceneHandler;
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
		//var temp:Transform=Instantiate(phantom);
		var temp:Transform = castleHnd.getPhantom(phantom);
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