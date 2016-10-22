#pragma strict

/**
* Public Class WonGame
*
* This script is attached to the Main Camera of the scene "gamewon".
* It shows the end GUI, the final score, plays music and provides the Restart Button.
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
* the won texture
* @access public
*/
var won : Texture;

/**
* name of the scene pacman, which can be loaded in the following
* @access public
*/
var LevelName = "pacman";

/**
* backgroundmusic - the Clip is attaeched in the inspector
* @access public
*/
var winSound : AudioClip;

/**
* style defintions for the GUI
* @access public
*/
var style : GUIStyle;

/**
* Reference to ExitCollider Class
* @access private
*/
private var exitScript : ExitCollider;

/**
* plays the background sound and calls the exit script
*
* @access public
*/
function Start () {
	style.normal.textColor = Color.white;
	style.fontSize = 20; //textsize
	exitScript = GameObject.Find("Exit").GetComponent(ExitCollider);
	AudioSource.PlayClipAtPoint(winSound, gameObject.transform.position);
}

/**
* draws the background, the final score, game won texture and the restart button
*
* @access public
*/
function OnGUI() {
	GUI.DrawTexture(Rect(280,30,400,540), options, ScaleMode.ScaleToFit, true);
	GUI.DrawTexture(Rect(280,30,400,540), won, ScaleMode.ScaleToFit, true);
	
	GUI.Label(Rect(424,180,100,50), "Your score: " + exitScript.FinalPoints, style);

	if (GUI.Button(Rect(415,400,150,30),"Restart Game")) { //when restart button is clicked, the exit gameObject will be deleted and the level is reloaded
		var Exit : GameObject = GameObject.Find("Exit"); //finds the gameObject Exit
		Destroy(Exit);
		Application.LoadLevel(LevelName);		
	}
}