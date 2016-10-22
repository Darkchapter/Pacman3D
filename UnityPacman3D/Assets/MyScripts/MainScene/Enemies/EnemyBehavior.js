#pragma strict

/**
* Public Class EnemyBehavior
*
* This script is attached to the Enemy prefabs of the scene "pacman".
* It controls their behavior.
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

import System.Collections.Generic; //for using generic lists

/**
* Reference to camera1 Class
* @access public
*/
var camerascript : camera1;

/**
* speed of the rotation movement
* @access private
*/
private var speedRotation : float = 2;

/**
* reference to a target
* @access public
*/
var target : Transform;

/**
* speed of movement
* @access private
*/
private var movingSpeed : float = 200;

/**
* minimal distance to the target (pacman)
* @access private
*/
private var minDist : float = 1;

/**
* boolean which is set to true when following target
* @access private
*/
private var isFollowing : boolean = false;

/**
* last known position of the target
* @access private
*/
private var lastVisiblePos : Vector3 = Vector3.zero;

/**
* list of waypoints which are dynamically spawned
* @access private
*/
var waypoints : List.<Transform> = new List.<Transform>();

/**
* index position for waypoints list
* @access private
*/
private var currentWaypoint : int = 0;

/**
* boolean which is set to true when not following the target, otherwise false
* @access private
*/
private var waypointModus : boolean = true;

/**
* direction controller for the waypoint modus
* @access private
*/
private var stepMode : String = "forward";

/**
* length of the raycast
* @access private
*/
private var rayDist : float = 10;


/**
* Gets reference to camera1 script, gets the target and calls the method setDynamicWaypoints
*
* @access public
*/
function Start () {
	camerascript = GameObject.Find("Main Camera").GetComponent(camera1);
	target = camerascript.target.transform; //sets target of the enemy --> pacman
	setDynamicWaypoints();
}

/**
* Calls the method FindPacman. If target is found, the enemy follow it, otherwise it initializes waypoint mode
*
* @access public
*/
function Update () {
	FindPacman();
	
	if (!waypointModus) {
		if (lastVisiblePos != Vector3.zero) {
			RotateTo(lastVisiblePos);
			Walk(lastVisiblePos);
			
			if (!isFollowing) {				
				waypointModus = true;				
			}
		}
	} else {
		if (waypoints.Count == 0) {
			setDynamicWaypoints();
		}
		
		RotateTo(waypoints[currentWaypoint].position);
		WaypointWalk();
	}
}

/**
* Rotate the enemy to a specified position
*
* @access public
* @param targetPosition Vector3 position for rotating
*/
function RotateTo (targetPosition : Vector3) { //rotates not so fast as transform.LookAt but with a time delay which makes it much more realistic . rotates the enemy towars pacman
	var destRotation : Quaternion;
	var relativePos : Vector3;
	var tap : Vector3; //temporary target position
	var trp : Vector3; //temporary own position
		
	tap = targetPosition;
	trp = transform.position;
	
	tap.y = 0;
	trp.y = 0;

	relativePos = tap - trp; //now there is no rotation around y axis anymore, which would otherwise look weird, because the different Objects have different y layers
	
	destRotation = Quaternion.LookRotation(relativePos); //calculate the destination values of the rotation, it needs a relative Position value, which we have to calculate above
	transform.rotation = Quaternion.Slerp(transform.rotation, destRotation, speedRotation * Time.deltaTime); //variables are: start rotation are the actual rotation values, destination rotation values, speed of rotation	
}

/**
* Move the enemy to a specified position
*
* @access public
* @param targetPosition Vector3 position for moving
*/
function Walk(targetPosition : Vector3) {
	var velocity : Vector3;
	var moveDirection : Vector3 = transform.TransformDirection(Vector3.forward);
	var delta : Vector3 = targetPosition - transform.position;
	
	//move as long as the min distance is not reached
	if(delta.magnitude > minDist) { //magnitude returns the vector's length
		velocity = moveDirection.normalized * movingSpeed * Time.deltaTime;
	} else { //otherwise stop
		velocity = Vector3(0,0,0);
	}
	rigidbody.velocity = velocity;
}

/**
* Let the enemy walk between its associated waypoints
*
* @access public
*/
function WaypointWalk() {
	var targetPosition : Vector3 = waypoints[currentWaypoint].position;

	var velocity : Vector3;
	var moveDirection : Vector3 = transform.TransformDirection(Vector3.forward);
	var delta : Vector3 = targetPosition - transform.position;
	
	velocity = moveDirection.normalized * movingSpeed * Time.deltaTime;
	
	if(delta.magnitude > 1) { //magnitude returns the vector's length
	} else { // go to next waypoint
		if (currentWaypoint == (waypoints.Count - 1)) { //when last waypoint is reached, change stepmode to backward
			stepMode = "backward";
			currentWaypoint--;
		} else if (currentWaypoint > 0 && currentWaypoint < (waypoints.Count - 1)) { //walking between first and last waypoint
			if (stepMode == "forward") {
				currentWaypoint++;
			} else {			
				currentWaypoint--;
			}
		} else if (currentWaypoint == 0) { //when the first waypoint is reached, change the stepmode to forward
			stepMode = "forward";
			currentWaypoint++;
		}
	}
	rigidbody.velocity = velocity;
}

/**
* Clear all associated waypoints of one enemy
*
* @access public
*/
function ClearWaypoints() {
	for (var waypoint : Transform in waypoints) {
		Destroy(waypoint.gameObject);		
	}
	waypoints.Clear();
	currentWaypoint = 0;
}

/**
* Set two waypoints, one at current position and the other at a specified distance
*
* @access public
*/
function setDynamicWaypoints() {
	var firstCube : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	firstCube.name = "wp" + (waypoints.Count+1);	
	Destroy(firstCube.collider); //destroying the collider, because it conflicts with ai	
	firstCube.renderer.enabled = false; //making it invisible
	firstCube.transform.position = transform.position;
	
	waypoints.Add(firstCube.transform); //add to the associated list of waypoints for this enemy
	
	var secondCube : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cube);
	secondCube.name = "wp" + (waypoints.Count + 1);
	Destroy(secondCube.collider); //destroying the collider, because it conflicts with ai	
	secondCube.renderer.enabled = false; //making it invisible
	var pos2 : Vector3 = transform.TransformPoint(Vector3.forward * (-4));
	secondCube.transform.position = pos2;
	
	waypoints.Add(secondCube.transform); //add to the associated list of waypoints for this enemy
}

/**
* Finds pacman based on raycast
*
* @access public
*/
function FindPacman() {
	var hit : RaycastHit;
	var ray : Ray = new Ray();
	
	ray.origin = transform.position;
	ray.direction = target.position - transform.position;
	
	isFollowing = false;
	
	if (Physics.Raycast(ray, hit, rayDist)) {
		if (hit.collider.gameObject.transform == target) {				
			isFollowing = true; //important for decision whether we are in waypoint mode or have to follow the target
			lastVisiblePos = target.position; //saves the current pacman position
			waypointModus = false; //we are not on waypoint mode
			ClearWaypoints(); //let's destroy our known waypoints to follow the pacman
		}
	}
}