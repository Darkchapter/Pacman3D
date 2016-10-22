#pragma strict

/**
* Public Class EnemyAI
*
* This script is attached to the empty GameObject Enemies (the container for the Enemy prefabs) of the scene "pacman".
* It initializes and instantiates the enemy prefabs in game.
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Variable for the start Position of the enemy prefabs
* @access private
*/
private var startPosition : Vector3;

/**
* variable for the spawn number, which is located in the external Data config, with an initial number
* @access private
*/
private var initSpawned : int = 0;

/**
* variable for the target, which is set in the start method
* @access private
*/
private var target : Transform;

/**
* reference to the enemy prefab
* @access public
*/
var Enemy : Transform;

/**
* Reference to Config Class
* @access private
*/
private var configscript : GameConfig;

/**
* Reference to camera1 Class
* @access private
*/
private var camerascript : camera1;

/**
* loads different scripts, sets the initial spawn value loaded from the config, saves the current position of the spawned prefab, calls the spawn method
*
* @access public
*/
function Start () {	
	configscript = GameObject.Find("Main Camera").GetComponent(GameConfig);
	yield(configscript); //wait for the loading process
	yield WaitForSeconds (1); //pauses for one second to load all data from config

	camerascript = GameObject.Find("Main Camera").GetComponent(camera1);
	target = camerascript.target.transform;		
	
	initSpawned = int.Parse(configscript.getQuantityNormalEnemies());	
	
	startPosition = transform.position;	
	
	Spawn();
}

/**
* Called for the first time, spawns the number of prefabs defined in the config.
* Called after, spawns one prefab for every destroyed by walls prefab until config value (max) is reached.
*
* @access public
*/
function Spawn() {
	var counter : int = 1;
	if (this.transform.childCount > 0) { //get the number of current children which are collected in the "Enemies" container
		counter = this.transform.childCount; 
	}
	
	for (var i : int = counter; i <= initSpawned; i++) {	
		var newEnemy = Instantiate(Enemy, Vector3(Random.Range(-20.0, 20.0),0, Random.Range(-20.0,20.0)), Quaternion.identity); //initiate enemy prefab and set it to a random position on the map
		newEnemy.transform.parent = this.transform; //assign the spawned into the "Enemies" container
	}
}