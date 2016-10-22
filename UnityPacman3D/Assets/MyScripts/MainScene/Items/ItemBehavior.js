#pragma strict

/**
* Public Class ItemBehavior
*
* This script is attached to the "Item" gameObject of the scene "pacman".
* It initialices normal and super items
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Item prefab which is set in the inspector
* @access public
*/
var Item : Transform;

/**
* SuperItem prefab which is set in the inspector
* @access public
*/
var ItemSuper : Transform;

/**
* Points counter
* @access private
*/
private var Points : int = 0;

/**
* Initial value for items to spawn
* @access private
*/
private var initSpawned : int = 0;

/**
* Initial value for super items to spawn
* @access private
*/
private var initSpawnedSuper : int = 0;

/**
* Reference to GameConfig Class
* @access private
*/
private var configscript : GameConfig;

/**
* Load the config script, set initial values for different item types and spawn them
*
* @access public
*/
function Start () {	
	configscript = GameObject.Find("Main Camera").GetComponent(GameConfig);
	yield(configscript);
	yield WaitForSeconds (1);
	
	initSpawned = int.Parse(configscript.getQuantityNormalItems());
	initSpawnedSuper = int.Parse(configscript.getQuantitySuperItems());	
	
	//runs method "Spawn"
	Spawn();
	
	//runs method "SpawnSuper"
	SpawnSuper();
}

/**
* return current Points
*
* @access public
* @return Points Integer value of current points
*/
function getPoints() {
	return Points;
}

/**
* modify current Point value
*
* @access public
* @param _Points Integer value of points modificator
*/
function setPoints(_Points : int) {
	Points += _Points;
}

/**
* Spawn normal items
*
* @access public
*/
function Spawn() {	
	var itemCounter : int = GameObject.FindGameObjectsWithTag("item").Length; //counts all spawned items
	
	var counter : int = 1;
	
	if (itemCounter > 0) {
		counter = itemCounter;
	}
	
	for (var i : int = counter; i <= initSpawned; i++) {
		var newItem = Instantiate(Item, Vector3(Random.Range(-20.0, 20.0),1, Random.Range(-20.0,20.0)), Quaternion.identity); //initiate item prefab and set it to a random position on the map
		newItem.transform.parent = this.transform; //assign the spawned into the "Items" container
	}
}

/**
* spawn super items
*
* @access public
*/
function SpawnSuper() {
	var itemCounter : int = GameObject.FindGameObjectsWithTag("superitem").Length; //counts all spawned super items
	
	var counter : int = 1;
	
	if (itemCounter > 0) {
		counter = itemCounter;
	}
	
	for (var i : int = counter; i <= initSpawnedSuper; i++) {	
		var newItem = Instantiate(ItemSuper, Vector3(Random.Range(-20.0, 20.0),1, Random.Range(-20.0,20.0)), Quaternion.identity); //initiate super item prefab and set it to a random position on the map
		newItem.transform.parent = this.transform; //assign the spawned into the "Items" container
	}
}