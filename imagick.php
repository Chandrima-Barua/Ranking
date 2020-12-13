<?php
error_reporting(E_ALL);
//$url =
//    'https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-6-1.png';
//
//$img = 'filecontents/logo.png';
//
//// Function to write image into file
////file_put_contents($img, file_get_contents($url));
//
////echo file_get_contents($url);
//echo "File downloaded!";
//$content = file_get_contents($url);
///* Create an empty canvas */
//$image = new Imagick();
////$image->writeImage($content);
//$image->setImageFileName("imagecopy.jpg");
//$image->writeImage($content);
////$canvas = new Imagick();
////
/////* Canvas needs to be large enough to hold the both images */
////$width = $image->getImageWidth() + 40;
////$height = ($image->getImageHeight() * 2) + 30;
////$canvas->newImage($width, $height, new ImagickPixel("black"));
////$canvas->setImageFormat("jpg");
////
/////* Composite the original image and the reflection on the canvas */
////$canvas->compositeImage($image, imagick::COMPOSITE_OVER, 20, 10);
////$canvas->compositeImage($reflection, imagick::COMPOSITE_OVER, 20, $im->getImageHeight() + 10);
//
///* Output the image*/
//
//header("Content-Type: image/" . $image->getImageFormat());
//echo $image;


//var_dump($content);


$image_url = 'https://media.geeksforgeeks.org/wp-content/uploads/geeksforgeeks-6-1.png';
$image_code = file_get_contents($image_url);

$img = new Imagick();
$img -> readImageBlob($image_code);
$img->setImageFormat("jpg");
//$img->setResolution(300, 300);
//$d = $img->getImageGeometry();
//$img->cropImage($d['width'],($d['height']-120), 0,0);
//$img->setImageFormat('jpeg');
//$img->setImageCompression(imagick::COMPRESSION_JPEG);
//$img->setCompressionQuality(100);
//$img->writeImages('filecontents/logo.jpg', true);
//$img->clear();


$img->writeImage('C:\xampp\htdocs\rank\rankmylist\filecontents'.'\greek.jpg');
header("Content-Type: greek.jpg");
echo($img);
?>