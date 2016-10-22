#pragma strict

/**
* Public Class topMenuGUI
*
* This script is attached to the main camera of the scene "pacman".
* Generates a menu bar at the top with several elements
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Saves toggle state
* @access private
*/
private var toggleState : boolean = false;

/**
* Reference to PacmanBehavior Class
* @access private
*/
private var pacmanscript : PacManBehavior;

/**
* Reference to GameConfig Class
* @access private
*/
private var configscript : GameConfig;

/**
* Reference to ItemBehavior Class
* @access private
*/
private var itemscript : ItemBehavior;

/**
* Initializes GUIstyle
* @access private
*/
var style : GUIStyle;

/**
* heart texture for lives representation
* @access public
*/
var heart : Texture;

/**
* min distance to left window border
* @access private
*/
private var iconPosXDefault : int = 3;

/**
* X-position for the icon
* @access private
*/
private var iconPosX : int;

/**
* distance between icons
* @access private
*/
private var iconDist : int = 44;

/**
* distance for the text
* @access private
*/
private var textDist: int = 94;

/**
* X-position for the text
* @access private
*/
private var textPosX: int = 0;

/**
* stores config value for lives
* @access private
*/
private var initLives : int = 0;

/**
* Saves a toggle state
* @access private
*/
private var toggleState1 : boolean = false;

/**
* Saves a toggle state
* @access private
*/
private var toggleState2 : boolean = false;

/**
* Saves a toggle state
* @access private
*/
private var toggleState3 : boolean = false;

/**
* questionmark texture set in the inspector
* @access public
*/
var questionmark : Texture;

/**
* Option button texture set in the inspector
* @access public
*/
var optionsButton : Texture;

/**
* options texture set in the inspector
* @access public
*/
var options : Texture;

/**
* name of the mainscene
* @access public
*/
var LevelName ="pacman";

/**
* Load the needed scripts and waits for the config values, set GUI style and initial lives from config
*
* @access public
*/
function Start () {
	configscript = GameObject.Find("Main Camera").GetComponent(GameConfig);
	yield(configscript);
	yield WaitForSeconds (1);
	
	pacmanscript = GameObject.Find("pacman").GetComponent(PacManBehavior);
	itemscript = GameObject.Find("Items").GetComponent(ItemBehavior);

	
	style.normal.textColor = Color.white;
	style.fontSize = 20; //textsize
	
	initLives = int.Parse(configscript.getLives()); //config value is string default, but int needed
}

/**
* Draw lives (heart texture), display score and two menu buttons with submenus
*
* @access public
*/
function OnGUI() {
	var lives : int = pacmanscript.getLives();
	var Exit : GameObject = GameObject.Find("Exit"); //finds the gameObject Exit
	
	iconPosX = iconPosXDefault;
	
	for (var i:int = 0; i < lives; i++) {
		GUI.DrawTexture(Rect(iconPosX,3,40,40), heart, ScaleMode.ScaleToFit, true);
		iconPosX = iconPosX + iconDist;			
	}	

	GUI.Label(Rect(iconPosXDefault + (initLives*iconDist) + textDist,12,100,50), "Score: " + itemscript.getPoints(), style);
	iconPosX = iconPosXDefault;
	
	if (toggleState1 != true) { //draws the helpbutton if the toggleState isn't true
		if (GUI.Button(Rect(928,0,46,46), questionmark)) {
			toggleState1 = true;
		}
	}
	
	if (toggleState1 == true) { //if the questionmark button is clicked, togglestate is true and the following will appear
		GUI.DrawTexture(Rect(574,-30,400,540), options, ScaleMode.ScaleToFit, true);
		GUI.Label(Rect(610,80,400,540), "How to play:\n\nReach the end of the maze without\nlosing all of your hearts.\nCollect items to gain points.\nThere are also special items, which let\nyou move faster and eat the enemy.\nCan you find the Bonus Ghost?\n\nW\t\t\t\tforward\nS\t\t\t\t\tbackward\nA\t\t\t\t\tturn left\nD\t\t\t\t\tturn right\nSpace\t\tbounce ", style);
		if (GUI.Button(Rect(900,390,50,30),"Close")) { // if the close button is clicked, togglestate is set to false and the whole will disappear
			toggleState1 = false;
		}
	}
	
	if (toggleState2 != true) { //draws the optionbutton if the toggleState isn't true
		if (GUI.Button(Rect(882,0,46,46), optionsButton)) {
			toggleState2 = true;
		}
	}
	
	if (toggleState2 == true) { //if the questionmark button is clicked, togglestate is true and the following will appear
		if (GUI.Button(Rect(804,46,170,30),"Restart the Game")) { // if this button is clicked, the following scene will be loaded			
			Destroy(Exit);
			Application.LoadLevel(LevelName);
		}
		if (GUI.Button(Rect(804,76,170,30),"Return to Startscreen")) { // if the close button is clicked, togglestate is set to false and the whole will disappear
			Destroy(Exit);
			Application.LoadLevel("start");
		}
		if (GUI.Button(Rect(804,106,170,30),"About")) { // if the close button is clicked, togglestate is set to false and the whole will disappear
			toggleState3 = true;
			
		}
		if (GUI.Button(Rect(804,136,170,30),"Return to Game")) { // if the close button is clicked, togglestate is set to false and the whole will disappear
			toggleState2 = false;
		}
	}
	
	if (toggleState3 == true) { //draws the about menu when toggleState3 is true (set above when button "About" is clicked
		GUI.DrawTexture(Rect(574,-30,400,540), options, ScaleMode.ScaleToFit, true);
		GUI.Label(Rect(610,110,400,540), "About Pacman 3D:\n\nConception and development\nin 'Spieleentwicklung 3D' at\nHochschule Furtwangen University.\n\n\n\n\n\n\n\n(c) 2013 Sarah Häfele ", style);
		if (GUI.Button(Rect(900,390,50,30),"Close")) { // if the close button is clicked, togglestate is set to false and the whole will disappear
			toggleState3 = false;
		}
	}
}