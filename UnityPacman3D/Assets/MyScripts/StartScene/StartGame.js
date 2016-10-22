#pragma strict

/**
* Public Class StartGame
*
* This script is attached to the main camera of the scene "start".
* It displays the intro screen.
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Defines which scene to load (pacman)
* @access public
*/
public var LevelName ="pacman";

/**
* welcome texture
* @access public
*/
var welcome : Texture;

/**
* options texture
* @access public
*/
var options : Texture;

/**
* backgroundmusic - the Clip is attaeched in the inspector
* @access public
*/
var intro : AudioClip;

/**
* GUI styles
* @access public
*/
var style : GUIStyle;

/**
* Starts the background music, sets GUI styles.
*
* @access public
*/
function Start() {
	AudioSource.PlayClipAtPoint(intro, gameObject.transform.position);
	style.normal.textColor = Color.white; //setzt Textfarbe auf schwarz
	style.fontSize = 20; //setzt textgröße auf 20
}

/**
* Draws the welcome screen and the button to start the game.
*
* @access public
*/
function OnGUI() {
	GUI.DrawTexture(Rect(280,30,400,540), options, ScaleMode.ScaleToFit, true);
	
	GUI.Label(Rect(320,180,400,540), "Welcome to Pacman 3D!\n\nHelp Pacman to reach the maze's exit.\nTry to collect as much items as\npossible and defeat the enemies.\n\nBut most importantly:\nhave fun! ", style);
	
	if (GUI.Button(Rect(410,400,150,30),"Play Game")) {
		var Exit : GameObject = GameObject.Find("Exit"); //finds the gameObject Exit
		Destroy(Exit);
		Application.LoadLevel(LevelName);
	}
}