#pragma strict

var castle:Transform;
var curHeight:float;

var slime:Transform;
var redslime:Transform;
var blueslime:Transform;
var octorok:Transform;
var mage:Transform;
var boss:Transform;
var skeleton:Transform;

var gold:int;
var goldText:GUIText;

var castle1:Sprite;
var castle2:Sprite;
var castle3:Sprite;

var movecoef:float;

function Start () 
{	
	
	movecoef=Screen.height*1f/400;
	
	goldText.text=""+gold;
	curHeight=3;
	
	//instancia o andar 1: 1.5
	Instantiate(castle,Vector3(0,1.5,0),Quaternion(0,0,0,1));
	//instancia os monstros do andar 1
	var temp:Transform;
	temp=Instantiate(slime);temp.position.y+=1.5;temp.position.x=Random.Range(-2.0,2.0);
	temp=Instantiate(slime);temp.position.y+=3;temp.position.x=Random.Range(-2.0,2.0);
	temp=Instantiate(slime);temp.position.y+=3;temp.position.x=Random.Range(-2.0,2.0);
	//instancia o andar 2: 4.5
	Instantiate(castle,Vector3(0,curHeight+1.5,0),Quaternion(0,0,0,1));
}

function Update () {
	cameraMovement();
	if(!GameObject.FindGameObjectWithTag("enemy")) addFloor();
}

function addGold(i:int):boolean
{
	if(gold+i<0)return false;
	gold+=i;
	goldText.text=""+gold;
	return true;
}

function canAddGold(i:int):boolean
{
	if(gold+i<0)return false;
	else return true;
}

var floor:int=0;
function addEnemies()
{
	var temp:Transform;
	switch(floor)
	{
		case 1:
			temp=Instantiate(blueslime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);;
			temp=Instantiate(blueslime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);;
			temp=Instantiate(slime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 2:
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(octorok);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 3:
			temp=Instantiate(redslime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(blueslime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(octorok);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(octorok);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 4:
			temp=Instantiate(slime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 5:
			temp=Instantiate(mage);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(octorok);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(octorok);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(blueslime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(blueslime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 6:
			temp=Instantiate(redslime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(redslime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(redslime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(skeleton);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(mage);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(mage);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(skeleton);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 7:
			temp=Instantiate(boss);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(slime);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(redslime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(redslime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(skeleton);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(skeleton);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 8:
			temp=Instantiate(skeleton);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(skeleton);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(skeleton);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			break;
		case 9:
			temp=Instantiate(boss);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(boss);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			temp=Instantiate(boss);temp.position.y+=curHeight+1.5;temp.position.x=Random.Range(-2.0,2.0);
			var i:int;
			for(i=0;i<40;i++) {temp=Instantiate(slime);temp.position.y+=curHeight+3;temp.position.x=Random.Range(-2.0,2.0);}
			break;
		case 10:
			Application.LoadLevel("menu");
	}
}

function addFloor()
{
	floor++;
	addEnemies();
	var tmp:Transform;
	tmp = Instantiate(castle,Vector3(0,curHeight+1.5+3,0),Quaternion(0,0,0,1)) as Transform;
	/*
	var rnd:float = Random.Range(0.0f, 1.0f);
	if (rnd < 0.33f)
		(tmp.GetComponent(SpriteRenderer) as SpriteRenderer).sprite = castle1;
	else if (rnd < 0.66f)
		(tmp.GetComponent(SpriteRenderer) as SpriteRenderer).sprite = castle2;
	else
		(tmp.GetComponent(SpriteRenderer) as SpriteRenderer).sprite = castle3;
	*/
	curHeight+=3;
}

var cameraSpeed:float=1;
var lastpoint:float;
function cameraMovement()
{	
	if(Input.GetMouseButtonDown(0)) lastpoint=Camera.main.ScreenToWorldPoint(Input.mousePosition).y;
	var dy:float=0;
	if(Input.GetMouseButton(0)&&Camera.main.ScreenToWorldPoint(Input.mousePosition).x>2)
	{
		var point:float=Camera.main.ScreenToWorldPoint(Input.mousePosition).y;
		Debug.Log("LP:"+lastpoint+" P:"+point);
		dy=(point-lastpoint)*movecoef;
		lastpoint=point;
	}
	var y:float=Camera.main.transform.position.y+Input.GetAxis("Vertical")*Time.deltaTime*cameraSpeed + Input.GetAxis("Mouse ScrollWheel") + dy;
	if(y>1.5&&y<curHeight)Camera.main.transform.position.y=y;
}