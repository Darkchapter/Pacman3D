#pragma strict

/**
* Public Class gameStatus
*
* This script is attached to the main camera of the scene "pacman".
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Load scene for game status "won"
*
* @access public
*/
function gameWon() {
	Application.LoadLevel("gamewon"); 
}

/**
* Load scene for game status "gameover"
*
* @access public
*/
function gameLost() {
	Application.LoadLevel("gameover"); 
}