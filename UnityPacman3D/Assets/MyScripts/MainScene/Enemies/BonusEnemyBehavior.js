#pragma strict

/**
* Public Class BonusEnemyBehavior
*
* This script is attached to the BonusEnemy prefab of the scene "pacman".
* It controls its behavior.
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* reference to a target
* @access public
*/
var target : GameObject;

/**
* Reference to PacManBehavior Class
* @access private
*/
private var pacmanscript : PacManBehavior;

/**
* Reference to BonusEnemyTrigger Class
* @access private
*/
private var triggerscript : BonusEnemyTrigger;

/**
* Reference to ItemBehavior Class
* @access private
*/
private var itemscript : ItemBehavior;

/**
* effect sound for eat target - the Clip is attaeched in the inspector
* @access public
*/
var eatenSound : AudioClip;

/**
* effect sound for being eaten - the Clip is attaeched in the inspector
* @access public
*/
var eatGhost : AudioClip;

/**
* Get references to different scripts and set the target (pacman)
*
* @access public
*/
function Start () {
	pacmanscript = GameObject.Find("pacman").GetComponent(PacManBehavior); //finds pacmanscript for resetPlayer method
	triggerscript = GameObject.Find("Trigger").GetComponent(BonusEnemyTrigger);
	itemscript = GameObject.Find("Items").GetComponent(ItemBehavior);
	target = pacmanscript.gameObject;
	transform.LookAt(target.transform); //looks at target, which is pacman
}

/**
* draw a dialog area when trigger was entered
*
* @access public
*/
function OnGUI() {
	if (triggerscript.showDialog == true) {
		GUILayout.BeginArea(Rect(700,50,200,200)); //starts a GUI area in which the folliwing buttons and rects are located
		
		GUILayout.Label("Hello, my dear friend.");
		GUILayout.Label("Please let me eat you!");
		
		if (GUILayout.Button("Ok")) { //target is being eaten (reset)
			pacmanscript.resetPlayer();
			AudioSource.PlayClipAtPoint(eatenSound, gameObject.transform.position);
			triggerscript.showDialog = false;
			
		}
		
		if (GUILayout.Button("No, not today.")) { //BonusEnemy is being destroyed and player gets a point by calling the itemscript
			Destroy(gameObject);
			AudioSource.PlayClipAtPoint(eatGhost, gameObject.transform.position);
			itemscript.setPoints(1);
			triggerscript.showDialog = false;
		}
		
		GUILayout.EndArea();
	}
}