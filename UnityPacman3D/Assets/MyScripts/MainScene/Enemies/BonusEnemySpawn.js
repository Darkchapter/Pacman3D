#pragma strict

/**
* Public Class BonusEnemySpawn
*
* This script is attached to the Bonus Trigger - it spawns the bonus enemy.
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* reference to the bonus enemy set in the inspector
* @access public
*/
var BonusEnemy : Transform;

/**
* boolean value, which is set to false when the trigger was activated once
* @access public
*/
var BonusQuantity : boolean = true;

/**
* Spawns an Bonus Enemy when entered for the first time
*
* @access public
* @param other Collider object of Collision
*/
function OnTriggerEnter(other : Collider) {
	if (other.gameObject.name == "pacman") {
		if (BonusQuantity == true) {
			Instantiate(BonusEnemy, Vector3(transform.position.x - 5, transform.position.y, transform.position.z), Quaternion.identity);	//spawns a BonusEnemy when entering the trigger
			BonusQuantity = false;
		}
	}
}