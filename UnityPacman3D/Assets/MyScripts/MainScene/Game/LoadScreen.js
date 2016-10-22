#pragma strict

/**
* Public Class LoadScreen
*
* This script is attached to the LoadScreen gameObject of the scene "pacman".
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* loading texture which is set in the inspector
* @access public
*/
var loading : Texture;

/**
* boolean value which indicates if loading is completed
* @access private
*/
private var loadingComplete : boolean = false;

/**
* GUI style 
* @access public
*/
var style : GUIStyle;

/**
* Defines GUI styles and signals that loading is completed (important for other scripts)
*
* @access public
*/
function Start () {
	style.normal.textColor = Color.white;
	style.fontSize = 20; //textsize

	yield WaitForSeconds (1);
	
	loadingComplete = true;
}

/**
* Shows loading texture and level info
*
* @access public
*/
function OnGUI() {	
	if (loadingComplete == false) {
		GUI.DrawTexture(Rect(387,200,200,200), loading, ScaleMode.ScaleToFit, true);
	}
	
	if (loadingComplete == false) {
		GUI.Label(Rect(12,60,100,50), "Level 1\n\nDifficulty: easy", style);
	}
}