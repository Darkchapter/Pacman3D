#pragma strict

/**
* Public Class ClothAttachment
*
* This script is attached to the head of the enemy prefab of the scene "pacman".
* It controls the cloth's behavior
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* reference to the interactive cloth
* @access public
*/
var cloth : InteractiveCloth;

/**
* Attaches the cloth, which is set in the inspector, to the prefab collider
*
* @access public
*/
function Start () {
	if (cloth) {
		cloth.AttachToCollider(transform.collider, false, false);
	}
}