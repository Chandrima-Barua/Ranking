<?php
class Rectangle
{
    // Declare  properties
    public $length = 0;
    public $width = 0;

    // Method to get the perimeter
    public function getPerimeter(){
//        print_r($this) ;
        return (2 * ($this->length + $this->width));
    }

    // Method to get the area
    public function getArea(){
        return ($this->length * $this->width);
    }
}






$obj = new Rectangle;
//print_r($obj);
//print_r($obj->length);
//print_r($obj->width);

// Get the object properties values
//echo $obj->length; // 0utput: 0
//echo $obj->width; // 0utput: 0

// Set object properties values
$obj->length = 30;
$obj->width = 20;

// Read the object properties values again to show the change
//echo $obj->length; // 0utput: 30
//echo $obj->width; // 0utput: 20


// Call the object methods
echo $obj->getPerimeter(); // 0utput: 100
//echo $obj->getArea();
?>