#pragma strict

/**
* Public Class PacManBehavior
*
* This script is attached to pacman of the scene "pacman".
* It controls the player movement with the character controller
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* live counter
* @access private
*/
private var lives : int = 3;

/**
* boolean value indicating whether in super mode or not
* @access private
*/
private var inSuperMode = false;

/**
* Saves the start position for reset purpose
* @access private
*/
private var startPosition : Vector3;

/**
* Reference to gameStatus Class
* @access private
*/
private var gamestatusscript : gameStatus;

/**
* Reference to GameConfig Class
* @access private
*/
private var configscript : GameConfig;

/**
* Seconds for the super mode duration
* @access private
*/
var superModeTime:int = 7;

/**
* Time counter
* @access private
*/
private var currentTime = 0;

/**
* GUI style
* @access public
*/
var style : GUIStyle;

/**
* effect sound for jumping - the Clip is attaeched in the inspector
* @access public
*/
var bounce : AudioClip;

/**
* Get needed scripts, set initial lives from config, set GUI styles and save start position of pacman.
*
* @access public
*/
function Start () {
	configscript = GameObject.Find("Main Camera").GetComponent(GameConfig);
	
	yield(configscript);
	yield WaitForSeconds (1);
	
	gamestatusscript = GameObject.Find("Main Camera").GetComponent(gameStatus);

	lives = int.Parse(configscript.getLives());
	
	startPosition = transform.position;
	
	style.normal.textColor = Color.white;
	style.fontSize = 17; //textsize
}

/**
* Display remaining super mode time
*
* @access public
*/
function OnGUI() {
	if (inSuperMode == true) {
		GUI.Label(Rect(714,12,100,50), "Supermode: " + currentTime, style);
	}
}

/**
* Count down Super Mode time
*
* @access public
*/
function TimerTick() {
	while (currentTime > 0) {
		yield WaitForSeconds(1);

		currentTime--;
	}
	deactivateSuperMode();	
}

/**
* Activate super mode when super item is collected and initiates count down timer
*
* @access public
*/
function activateSuperMode() {
	currentTime += superModeTime;
	if(inSuperMode == false) {
		inSuperMode = true;
		TimerTick();
	}
}

/**
* Deactivate super mode when count down has finished
*
* @access public
*/
function deactivateSuperMode() {
	inSuperMode = false;
	currentTime = superModeTime; //sets the time back, so it can start from the beginning
}

/**
* Returns current status of super mode (true/false)
*
* @access public
* @return inSuperMode Boolean value of SuperMode status
*/
function isInSuperMode() {
	return inSuperMode;
}

/**
* Returns current lives.
*
* @access public
* @return lives Integer value of current lives
*/
function getLives() {
	return lives;
}

/**
* Resets player to saved start position when lives remaining, otherwise load lost scene
*
* @access public
*/
function resetPlayer() {
	if (lives > 0) {
		lives = lives - 1;
		transform.position = startPosition;
	} else {
		gamestatusscript.gameLost();
	}
}

/**
* Play bounce sound for the animation event
*
* @access public
*/
function bounceSound() {
	AudioSource.PlayClipAtPoint(bounce, gameObject.transform.position);
}