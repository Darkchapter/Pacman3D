#pragma strict

/**
* Public Class move
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
* normal walking speed
* @access public
*/
var SpeedWalk : float = 6.0;

/**
* Fast walking speed of super mode
* @access public
*/
var FastSpeedWalk : float = 8.0;

/**
* gravity intensity
* @access public
*/
var gravity : float = 20.0;

/**
* Vector specifying the concrete move direction 
* @access private
*/
private var moveDirection : Vector3 = Vector3(0,0,0);

/**
* reference to target object
* @access public
*/
var target : Transform;

/**
* Reference to camera1 Class
* @access private
*/
private var camerascript : camera1;

/**
* Reference to PacManBehavior Class
* @access private
*/
private var pacmanscript : PacManBehavior;

/**
* turning speed
* @access private
*/
private var SpeedTurn : int = 2;

/**
* Load the needed scripts, set target by finding it
*
* @access public
*/
function Start () {
	camerascript = GameObject.Find("Main Camera").GetComponent(camera1);
	target = camerascript.target.transform;

	pacmanscript = GameObject.Find("pacman").GetComponent(PacManBehavior);

}

/**
* Movement controlling for the character
*
* @access public
*/
function Update () {
	var controller : CharacterController = GetComponent(CharacterController);

    if (controller.isGrounded) {
	
		//turning
		if (Input.GetAxis("Vertical") < 0) {
			transform.eulerAngles.y += -Input.GetAxis("Horizontal") * SpeedTurn; //turns the figure when walking backwards
		} else {
			transform.eulerAngles.y += Input.GetAxis("Horizontal") * SpeedTurn; //turns the figure when walking forward
		}
		
		moveDirection = Vector3(0, 0, Input.GetAxis("Vertical"));
		
		moveDirection = transform.TransformDirection(moveDirection);
		
		if (pacmanscript.isInSuperMode() == true) {
			moveDirection *= FastSpeedWalk;
		} else {
			moveDirection *= SpeedWalk;
		}
        
        if (Input.GetButton ("Jump")) {
			animation.Play("Pac_bounce"); //play jump animation
        }
    }
	
    // Apply gravity
    moveDirection.y -= gravity * Time.deltaTime;
    
    // Move the controller
    controller.Move(moveDirection * Time.deltaTime);
}