#pragma strict

/**
* Public Class camera1
*
* This script is attached to the main camera of the scene "pacman".
* It controls its behavior.
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Reference to GameObject to follow set in the inspector
* @access public
*/
var target : GameObject;

/**
* viewing distance
* @access private
*/
private var distance = 10.0;

/**
* moving speed x
* @access private
*/
private var xSpeed = 250.0;

/**
* moving speed y
* @access private
*/
private var ySpeed = 120.0;

/**
* min distance y
* @access private
*/
private var yMinLimit = 0;

/**
*  max distance y
* @access private
*/
private var yMaxLimit = 30;

/**
* zoom rate
* @access private
*/
private var zoomRate = 20;

/**
* inital angle value x
* @access private
*/
private var x = 0.0;

/**
* inital angle value y
* @access private
*/
private var y = 0.0;


/**
* set angles to inital values
*
* @access public
*/
function Start () {	
	var angles = transform.eulerAngles;
	
	x = angles.y;
	y = angles.x;
}

/**
* follow the target in a specified manner
*
* @access public
*/
function Update () {
	if (target) {
		x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
		y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
		
		var test = 0;
		test = y;

		distance += -(Input.GetAxis("Mouse ScrollWheel") * Time.deltaTime) * zoomRate * Mathf.Abs(distance);
		
		if (distance < 2.5) {
			distance = 2.5;
		}
		
		if (distance > 20) {
			distance = 20;
		}

		y = ClampAngle(y, yMinLimit, yMaxLimit);

		var rotation = Quaternion.Euler(y, x, 0);
		var position = rotation * Vector3(0.0, 2.0, -distance) + target.transform.position;

		transform.rotation = rotation;
		transform.position = position;
	}
}

/**
* Changes direction of angle if necesary
*
* @access public
* @static
* @param angle DESCRIPTION HERE
* @param min DESCRIPTION HERE
* @param max DESCRIPTION HERE
* @return float DESCRIPTION HERE
*/
static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360) {
		angle += 360;
	}
	
	if (angle > 360) {
		angle -= 360;
	}
	
	return Mathf.Clamp (angle, min, max);
}