#pragma strict

/**
* Public Class fight
*
* This script is attached to the Enemy prefabs of the scene "pacman".
* It controls their collision behavior.
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
* Reference to EnemyAI Class
* @access private
*/
private var enemyaiscript : EnemyAI;

/**
* Reference to ItemBehavior Class
* @access private
*/
var itemscript : ItemBehavior;

/**
* effect sound when target eats the enemy (us)
* @access public
*/
var eatGhost : AudioClip;

/**
* effect sound when pacman is being eaten
* @access public
*/
var eatenSound : AudioClip;

/**
* Get references to the needed scripts.
*
* @access public
*/
function Start () {
	pacmanscript = GameObject.Find("pacman").GetComponent(PacManBehavior);
	enemyaiscript = GameObject.Find("Enemies").GetComponent(EnemyAI);
	itemscript = GameObject.Find("Items").GetComponent(ItemBehavior);
}

/**
* Detects the on trigger collision and decides whether to reset pacman or to destroy us
*
* @access public
* @param other Collider object of Collision
*/
function OnTriggerEnter(other : Collider) {
	if (other.gameObject.name == "pacman") {
		if (pacmanscript.isInSuperMode() == false) {
			pacmanscript.resetPlayer();	
			AudioSource.PlayClipAtPoint(eatenSound, gameObject.transform.position);
		} else {
			itemscript.setPoints(1); //player gets a bonus point
			
			Destroy(gameObject); 
			AudioSource.PlayClipAtPoint(eatGhost, gameObject.transform.position);
		}		
	}
	
	//when spawned on a wall destroy itself and respawn
	if (other.gameObject.name == "wallBrickExposedShort" && gameObject.transform.position.y > 1.8) {
		var prefab : GameObject = this.transform.parent.gameObject; //saves the parent of the script owner
		
		var behaviorscript : EnemyBehavior = prefab.GetComponent("EnemyBehavior");
		behaviorscript.ClearWaypoints();
		
		Destroy(prefab);
		enemyaiscript.Spawn();
	}	
}