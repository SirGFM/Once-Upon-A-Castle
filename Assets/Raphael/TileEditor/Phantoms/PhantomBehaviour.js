#pragma strict
var empty:boolean=false;
var price:int;
function Start () 
{
	temp=this.collider2D;
}

function Update () 
{
	if(Input.GetMouseButtonUp(0))
	{
		temp.renderer.material.color=Color.white;
		if(!empty)
		{
			if(temp!=this.collider2D&&(temp.gameObject.tag=="EmptyRoom"))
			{
				(GameObject.FindGameObjectWithTag("Manager").GetComponent(LevelBehaviour) as LevelBehaviour).addGold(-1*price);
				Instantiate(room,temp.transform.position,temp.transform.rotation);
				Destroy(temp.gameObject);
			}
		}
		else
		{
			if(temp!=this.collider2D&&(temp.gameObject.tag=="Stairs"||
										temp.gameObject.tag=="DinnerRoom"||
										temp.gameObject.tag=="NurseryRoom"||
										temp.gameObject.tag=="SafeRoom"||
										temp.gameObject.tag=="WeaponsRoom"))
			{
				(GameObject.FindGameObjectWithTag("Manager").GetComponent(LevelBehaviour) as LevelBehaviour).addGold(-1*price);
				Instantiate(room,temp.transform.position,temp.transform.rotation);
				Destroy(temp.gameObject);
			}
		}
		Destroy(this.gameObject);
	}
}

var room:Transform;
var temp:Collider2D;
function OnTriggerStay2D(other: Collider2D)
{
	if(other==null)
	{
		other.renderer.material.color=Color.white;
		temp=this.collider2D;
	}
	if(other!=temp)
	{
		temp.renderer.material.color=Color.white;
		temp=other;
		if(other.tag!="EmptyRoom")
		{
			other.renderer.material.color=Color.red;
		}
		else
		{
			other.renderer.material.color=Color.green;
		};
	}
}