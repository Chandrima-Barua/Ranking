<?php
function flopImage($imagePath) {
    $imagick = new \Imagick(realpath($imagePath));
//    $imagick->flopImage();
    $imagick->flipImage();
    header("Content-Type: image/jpg");
    echo $imagick->getImageBlob();
}

flopImage('images/logos/gettyimages_logo.png')

?>