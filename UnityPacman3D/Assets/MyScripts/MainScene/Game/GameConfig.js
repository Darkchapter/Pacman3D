#pragma strict
 
/**
* Public Class GameConfig
*
* This script is attached to the main camera of the scene "pacman".
* Loads the external Data config file and provides its contents 
*
* @package Pacman 3D
* @author Sarah Haefele
* @version 1.0
* @access public
*/

/**
* Associative container for loaded data
* @access private
*/
private var configData = {};

/**
* load config file from specified location and put its contents into defined container
*
* @access public
*/
function Start () {	
	var filename:String = "ExternalData/config.txt";
	var iniData:String = "";
	var prefix:String = "";

	if (!Application.isWebPlayer) {
		prefix = "file://"; //needed when in local mode
	}

	var pathname : String = prefix + Application.dataPath + "/../" + filename;
	var www : WWW = new WWW(pathname);
	yield(www); // Wait for www - loading of config file to be completed
	iniData = www.text;
	
	var config_entries = iniData.Split("\n"[0]); //split data rows at the end of a line
	
	for (var line in config_entries) {
		var config_entry = line.Split("="[0]); //split data rows at = delimiter
		configData[config_entry[0]] = config_entry[1]; //store the left part of the entry as keyvalue and the right part as data value
	}
}

/**
* Return config data entry with key lives
*
* @access public
* @return string Number of Player Lives
*/
function getLives() {
	return configData["Lives"];
}

/**
* Return config data entry with key NormalItems
*
* @access public
* @return string Number of normal Items
*/
function getQuantityNormalItems() {
	return configData["NormalItems"];
}

/**
* Return config data entry with key SuperItems
*
* @access public
* @return string Number of super Items
*/
function getQuantitySuperItems() {
	return configData["SuperItems"];
}

/**
* Return config data entry with key NormalEnemies
*
* @access public
* @return string Number of normal Enemies
*/
function getQuantityNormalEnemies() {
	return configData["NormalEnemies"];
}