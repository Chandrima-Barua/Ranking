<?php
$img = imagecreatefromjpeg('images/raw/0fbfca8c132a43e3fce75c787404cafd97f02cfb61b5e2827d6a051a6cf23bec.jpg');
//$imgcrop = imagecrop($img, ['x' => 0, 'y' => 0, 'width' => 655, 'height' => 455]);
//if ($imgcrop !== FALSE) {
//    imagepng($imgcrop, 'img-cropped.jpg');
//    imagedestroy($imgcrop);
//    echo "Image cropped successfully";
//}
//imagedestroy($img);


function croppedimage($image, $imagex1, $imagey1, $imagex2, $imagey2)
{
    $actualx1 = $imagex1;
    $actualy1 = $imagey1;
    $actualx2 = $imagex2;
    $actualy2 = $imagey2;

    $dimensionwidth = $actualx2 - $actualx1;
    $dimensionheight = $actualy2 - $actualy1;

    $croppedimage = imagecreatetruecolor($dimensionwidth, $dimensionheight);
    imagecopy($croppedimage, $image, 0, 0, $actualx1, $actualy1, $dimensionwidth, $dimensionheight);

    return $croppedimage;
}

$croppedimage = croppedimage($img, 0, 0, 385, 291);

echo imagepng($croppedimage, 'img-cropped.jpg');
?>