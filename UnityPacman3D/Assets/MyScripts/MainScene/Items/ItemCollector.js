#pragma strict

/**
* Public Class ItemCollector
*
* This script is attached to the itemprefabs of the scene "pacman".
* It controls the collision behavior
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Reference to PacManBehavior Class
* @access private
*/
private var pacmanscript : PacManBehavior;

/**
* effect sound when eaten - the Clip is attaeched in the inspector
* @access public
*/
var eatItem : AudioClip;

/**
* Get reference of the needed script.
*
* @access public
*/
function Start () {
	pacmanscript = GameObject.Find("pacman").GetComponent(PacManBehavior);
}

/**
* Differentiate between collider objects.
* When collide with pacman, destroy itself and give the player a point.
* When collide with a wall respawn.
* For Super Items initiate the super mode
*
* @access public
* @param other Collider object of Collision
*/
function OnTriggerEnter (other : Collider) {
	if (other.gameObject.name == "pacman" || other.gameObject.name == "wallBrickExposedShort") {
		Destroy(gameObject);			
		
		if (this.gameObject.name == "superitempre(Clone)" && other.gameObject.name != "pacman") {
			SendMessageUpwards("SpawnSuper"); //spawn new super item
		}
		if (this.gameObject.name == "itempre(Clone)" && other.gameObject.name != "pacman") {		
			SendMessageUpwards("Spawn"); //spawn new item
		}
		
		if (other.gameObject.name == "pacman") {	
			SendMessageUpwards("setPoints", 1); //give player a point
			AudioSource.PlayClipAtPoint(eatItem, gameObject.transform.position);
			
			if (this.gameObject.tag == "superitem") {
				pacmanscript.activateSuperMode();
			}
		}
	}				
}