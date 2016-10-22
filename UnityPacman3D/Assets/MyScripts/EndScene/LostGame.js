#pragma strict

/**
* Public Class LostGame
*
* This script is attached to the Main Camera of the scene "gameover".
* It shows the end GUI, plays music and provides the Restart Button.
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* a background texture
* @access public
*/
var options : Texture;

/**
* a texture which displays the gameover message
* @access public
*/
var lost : Texture;

/**
* name of the scene pacman, which can be loaded in the following
* @access public
*/
var LevelName = "pacman";

/**
* backgroundmusic - the Clip is attaeched in the inspector
* @access public
*/
var loseSound : AudioClip;

/**
* plays the background sound
*
* @access public
*/
function Start () {
	AudioSource.PlayClipAtPoint(loseSound, gameObject.transform.position);
}

/**
* draws the background and gameover texture and the restart button
*
* @access public
*/
function OnGUI() {
	GUI.DrawTexture(Rect(280,30,400,540), options, ScaleMode.ScaleToFit, true);
	GUI.DrawTexture(Rect(280,30,400,540), lost, ScaleMode.ScaleToFit, true);
	
	if (GUI.Button(Rect(415,400,150,30),"Restart Game")) {
		var Exit : GameObject = GameObject.Find("Exit"); //finds the gameObject Exit
		Destroy(Exit);
		Application.LoadLevel(LevelName); //loads the level when clicked
	}
}