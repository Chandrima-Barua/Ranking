<?php
$im = ('images/contributionimages/contribution0b789ef93faf717965763cd137c67dc65c7879ffff90c1cb9f46dcb2dfa9e297.jpg');
echo $im;
$size = min(imagesx($im), imagesy($im));
$im2 = imagecrop('images/contributionimages/contribution0b789ef93faf717965763cd137c67dc65c7879ffff90c1cb9f46dcb2dfa9e297.jpg', ['x' => 0, 'y' => 0, 'width' => $size, 'height' => $size]);
if ($im2 !== FALSE) {
    imagepng($im2, 'example-cropped.png');
    imagedestroy($im2);
}
imagedestroy($im);
?>