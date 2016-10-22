#pragma strict
//this script is for the BonusEnemy's trigger

/**
* Public Class BonusEnemyTrigger
*
* This script is attached to the Trigger component of the BonusEnemy prefab of the scene "pacman".
* It detects the trigger collision
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* boolean value for showing a dialog in another script
* @access public
*/
var showDialog : boolean = false;

/**
* sets the showDialog boolean to true when activated by pacman 
*
* @access public
* @param other Collider object of Collision
*/
function OnTriggerEnter(other : Collider) {
	if (other.gameObject.name == "pacman") {
		showDialog = true;
	}
}