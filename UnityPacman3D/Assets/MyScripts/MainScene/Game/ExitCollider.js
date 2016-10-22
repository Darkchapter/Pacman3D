#pragma strict

/**
* Public Class ExitCollider
*
* This script is attached to the Exit gameObject of the scene "pacman".
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Reference to gameStatus Class
* @access private
*/
private var gamestatusscript : gameStatus;

/**
* Reference to ItemBehavior Class
* @access private
*/
private var itemscript : ItemBehavior;

/**
* number of final points
* @access private
*/
var FinalPoints : int;

/**
* let the parent object with all its childen survive when scene is changed
*
* @access public
*/
function Awake () {
	DontDestroyOnLoad (this);
}

/**
* Gets the needed script references.
*
* @access public
*/
function Start () {
	gamestatusscript = GameObject.Find("Main Camera").GetComponent(gameStatus);
	itemscript = GameObject.Find("Items").GetComponent(ItemBehavior);
}

/**
* When triggered by pacman, get final points and initiate the load of the game won scene
*
* @access public
* @param other Collider object of Collision
*/
function OnTriggerEnter(other : Collider) {
	if (other.gameObject.name == "pacman") {
		FinalPoints = itemscript.getPoints();
		
		gamestatusscript.gameWon();
	}
}