#pragma strict

/**
 * Prefab to the first floor, instantiated on awake
 */
var firstFloorPrefab:GameObject;
/**
 * Prefab for basic castle floor
 */
var castle:Transform;
/**
 * Object' hitbox; height is managed by code
 */
private var hb:BoxCollider2D;
/**
 * Property that correctly handles this object's hitbox
 */
private var _numFloors:int;
/**
 * Flag that signs whether a phantom is being dragged or not
 */
private var _isDraggingPhantom:boolean;
/**
 * Prefab to be generated if was dragging, released the mouse and is on a valid position
 */
private var curTarget:Transform;
/**
 * Price for the current structure
 */
private var curPrice:int;
/**
 * Array containing every floor and its rooms
 */
private var _floors:Array;
/**
 * Previous room the mouse was over
 */
private var _prevRoom:int;
/**
 * Previous floor the mouse was over
 */
private var _prevFloor:int;
/**
 * Current room the mouse is over
 */
private var _curRoom:int;
/**
 * Current floor the mouse is over
 */
private var _curFloor:int;
private var _manager:LevelBehaviour;
private var _clicked:boolean = false;

/**
 * Run as soon as the object was instantiated
 */
function Awake() {
	var rb:Rigidbody2D;
	var obj:GameObject;
	// Get the level behaviour
	_manager = GameObject.FindGameObjectWithTag("Manager").GetComponent(LevelBehaviour) as LevelBehaviour;
	// Try to get the rigid body and, if can't find one, create one
	rb = GetComponent(Rigidbody2D) as Rigidbody2D;
	if (!rb) {
		rb = gameObject.AddComponent("Rigidbody2D") as Rigidbody2D;
	}
	// Try to get the box collider and, if can't find one, create one
	hb = GetComponent(BoxCollider2D) as BoxCollider2D;
	if (!hb) {
		hb = gameObject.AddComponent("BoxCollider2D") as BoxCollider2D;
	}
	// Make object's gravity zero
	rb.gravityScale = 0.0f;
	// Set hitbox's width
	hb.size.x = 7.0f;
	// Set hitbox's position and height
	numFloors = 1;
	// Make it a trigger only
	hb.isTrigger = true;
	_isDraggingPhantom = false;
	// Create first floor
	obj = GameObject.Instantiate(firstFloorPrefab) as GameObject;
	// Add it, and its children, to the list
	_floors = new Array(40);
	// This is a really lazy/ugly way to get the children... but it works
	_floors[0] = getRoomArr(obj.transform);
}

/**
 * To be run every frame
 */
function Update() {
	// Store previous room and floor (in case it's needed to change the color of the previous one
	_prevRoom = _curRoom;
	_prevFloor = _curFloor;
	// Get the new room/floor
	_curRoom = Mathf.Floor(Camera.main.ScreenToWorldPoint(Input.mousePosition).x + 2.0f);
	_curFloor = Camera.main.ScreenToWorldPoint(Input.mousePosition).y / 1.5f;
	
	if (_isDraggingPhantom) {
		if (_curRoom != _prevRoom || _curFloor != _prevFloor) {
			var room:Transform;
			// Clear the previous room color
			room = getRoom(_prevFloor, _prevRoom);
			if (room)
				room.renderer.material.color = Color.white;
			// Change the current room to red or green
			room = getRoom(_curFloor, _curRoom);
			if (room)
				if (room.tag == "EmptyRoom" && curTarget.tag != "EmptyRoom")
					room.renderer.material.color = Color.green;
				else if (room.tag != "EmptyRoom" && curTarget.tag == "EmptyRoom")
					room.renderer.material.color = Color.red;
		}
	}
	else {
		checkMouseOver();
	}
}

private var stayBhv:RoomBehaviour = null;
private function checkMouseOver() {
	var room:Transform;
	var changedRoom:boolean;
	// If changed room, exit the previous one
	changedRoom = _curRoom != _prevRoom || _curFloor != _prevFloor;
	if (changedRoom && stayBhv) {
		stayBhv.OnMouseExit();
	}
	// Get the current room, and check if requires mouse over
	room = getRoom(_curFloor, _curRoom);
	if (!room || room.tag != "DinnerRoom") {
		stayBhv = null;
		return;
	}
	// If it's a valid and new room, get its RoomBehaviour
	if (changedRoom || !stayBhv) {
		stayBhv = room.GetComponent(RoomBehaviour) as RoomBehaviour;
		if (!stayBhv)
			return;
	}
	// Call its onMouseOver
	stayBhv.OnMouseOver();
}

function OnMouseDown() {
	Debug.Log("OnMouseDown");
	_clicked = true;
	yield WaitForSeconds(0.3);
	_clicked = false;
}

function OnMouseUp () {
	var room:Transform;
	
	// Either way, the current room will be needed, so already check for it
	room = getRoom(_curFloor, _curRoom);
	if (!room)
		return;
	
	// Check if was dragging a phantom
	if (_isDraggingPhantom) {
		_isDraggingPhantom = false;
		// Check if dragging anything but an EmptyRoom over an EmptyRoom
		if (room.tag == "EmptyRoom" && curTarget.tag != "EmptyRoom") {
			var newRoom:Transform;
			_manager.addGold(-1*curPrice);
			newRoom = GameObject.Instantiate(curTarget);
			newRoom.position = room.position;
			(_floors[_curFloor] as Array)[_curRoom] = newRoom;
			GameObject.Destroy(room.gameObject);
		}
		else if (room.tag != "EmptyRoom" && curTarget.tag == "EmptyRoom") {
			// TODO add gold when an empty room is put
		}
		else
			room.renderer.material.color = Color.white;
	}
	else if (_clicked && room.tag != "EmptyRoom") {
		// Check room on this position and call it's action
		(room.GetComponent(RoomBehaviour) as RoomBehaviour).OnMouseDown();
	}
	
	curTarget = null;
}

/**
 * @return How many floors there are curently
 */
function get numFloors():int {
	return _numFloors;
}

/**
 * Set the current number of floors and the hitbox height
 */
function set numFloors(value:int) {
	_numFloors = value;
	// Set the attributes
	hb.size.y = value*1.5f;
	hb.center.y = value*0.75f;
}

function getPhantom(phantom:Transform):Transform {
	var curPhantom:Transform;
	var phantomBhv:PhantomBehaviour;
	
	_isDraggingPhantom = true;
	curPhantom = GameObject.Instantiate(phantom);
	phantomBhv = curPhantom.GetComponent(PhantomBehaviour) as PhantomBehaviour;
	
	curTarget = phantomBhv.room;
	curPrice = phantomBhv.price;
	
	return curPhantom;
}

function getCastle(v3:Vector3, q:Quaternion):Transform {
	var tmp:Transform = GameObject.Instantiate(castle, v3, q);
	for (var c:Object in tmp) {
		var child:Transform = c as Transform;
		if (!child)
			continue;
		if (child.name == "Empty Floor 0") {
			_floors[numFloors] = getRoomArr(child);
		}
		else if (child.name == "Empty Floor 1") {
			_floors[numFloors+1] = getRoomArr(child);
		}
	}
	return tmp;
}

private function getRoom(floor:int, room:int) {
	var obj:Transform = null;
	var arr:Array = null;
	// Get the requested floor
	if (floor >= 0 && floor < _floors.Count)
		arr = _floors[floor] as Array;
	// Get the requested room
	if (arr && room >= 0 && room < 4)
		obj = arr[room] as Transform;
	// Return the object, if it was found
	return obj;
}

private function getRoomArr(parent:Transform):Array {
	var arr:Array = new Array(4);
	for (var c:Object in parent) {
		var child:Transform = c as Transform;
		if (!child)
			continue;
		if (child.name == "Empty Room 0") {
			arr[0] = child;
		}
		else if (child.name == "Empty Room 1") {
			arr[1] = child;
		}
		else if (child.name == "Empty Room 2") {
			arr[2] = child;
		}
		else if (child.name == "Empty Room 3") {
			arr[3] = child;
		}
	}
	return arr;
}
