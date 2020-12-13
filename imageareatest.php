<link rel="stylesheet" href="css/imgareaselect-animated.css">
<link rel="stylesheet" href="css/imgareaselect-default.css">
<link rel="stylesheet" href="css/imgareaselect-deprecated.css">
<script src="js/jquery.js"></script>
<script src="js/jquery.imgareaselect.js"></script>
<script src="js/jquery.imgareaselect.pack.js"></script>
<script>
    // Check coordinates
    function checkCoords(){
        if(parseInt($('#w').val())) return true;
        alert('Please select a crop region then press upload.');
        return false;
    }

    // Set image coordinates
    function updateCoords(im,obj){
        var img = document.getElementById("imagePreview");
        var orgHeight = img.naturalHeight;
        var orgWidth = img.naturalWidth;

        var porcX = orgWidth/im.width;
        var porcY = orgHeight/im.height;

        $('input#x').val(Math.round(obj.x1 * porcX));
        $('input#y').val(Math.round(obj.y1 * porcY));
        $('input#w').val(Math.round(obj.width * porcX));
        $('input#h').val(Math.round(obj.height * porcY));
    }

    $(document).ready(function(){
        // Prepare instant image preview
        var p = $("#imagePreview");
        $("#fileInput").change(function(){
            //fadeOut or hide preview
            p.fadeOut();

            //prepare HTML5 FileReader
            var oFReader = new FileReader();
            oFReader.readAsDataURL(document.getElementById("fileInput").files[0]);

            oFReader.onload = function(oFREvent){
                p.attr('src', oFREvent.target.result).fadeIn();
            };
        });
        var minsize = Math.min($('#imagePreview').width(), $('#imagePreview').height());
        select = $('#imagePreview').imgAreaSelect({
            handles: true,
            onSelectEnd: updateCoords
        });
        select.setSelection(0, 0, minsize, minsize, true);
        select.setOptions({show: true});

    });
</script>

<form method="post" action="imageareatest.php" enctype="multipart/form-data" onsubmit="return checkCoords();">
    <p>Image: <input name="image" id="fileInput" size="30" type="file" /></p>
    <input type="hidden" id="x" name="x" />
    <input type="hidden" id="y" name="y" />
    <input type="hidden" id="w" name="w" />
    <input type="hidden" id="h" name="h" />
    <input name="upload" type="submit" value="UPLOAD" />
</form>
<p><img id="imagePreview" style="display:none;"/></p>

<?php
$error = '';

// If the upload form is submitted
if(isset($_POST["upload"])){
    // Get the file information
    $fileName   = basename($_FILES["image"]["name"]);
    $fileTmp    = $_FILES["image"]["tmp_name"];
    $fileType   = $_FILES["image"]["type"];
    $fileSize   = $_FILES["image"]["size"];
    $fileExt    = substr($fileName, strrpos($fileName, ".") + 1);

    // Specify the images upload path
    $largeImageLoc = 'images/'.$fileName;
    $thumbImageLoc = 'images/'.$fileName;

    // Check and validate file extension
    if((!empty($_FILES["image"])) && ($_FILES["image"]["error"] == 0)){
        if($fileExt != "jpg" && $fileExt != "jpeg" && $fileExt != "png" && $fileExt != "gif"){
            $error = "Sorry, only JPG, JPEG, PNG, and GIF files are allowed.";
        }
    }else{
        $error = "Select an image file to upload.";
    }

    // If everything is ok, try to upload file
    if(empty($error) && !empty($fileName)){
        if(move_uploaded_file($fileTmp, $largeImageLoc)){
            // File permission
            chmod($largeImageLoc, 0777);

            // Get dimensions of the original image
            list($width_org, $height_org) = getimagesize($largeImageLoc);

            // Get image coordinates
            $x = (int) $_POST['x'];
            $y = (int) $_POST['y'];
            $width = (int) $_POST['w'];
            $height = (int) $_POST['h'];

            // Define the size of the cropped image
            $width_new = $width;
            $height_new = $height;

            // Create new true color image
            $newImage = imagecreatetruecolor($width_new, $height_new);

            // Create new image from file
            switch($fileType) {
                case "image/gif":
                    $source = imagecreatefromgif($largeImageLoc);
                    break;
                case "image/pjpeg":
                case "image/jpeg":
                case "image/jpg":
                    $source = imagecreatefromjpeg($largeImageLoc);
                    break;
                case "image/png":
                case "image/x-png":
                    $source = imagecreatefrompng($largeImageLoc);
                    break;
            }

            // Copy and resize part of the image
            imagecopyresampled($newImage, $source, 0, 0, $x, $y, $width_new, $height_new, $width, $height);

            // Output image to file
            switch($fileType) {
                case "image/gif":
                    imagegif($newImage, $thumbImageLoc);
                    break;
                case "image/pjpeg":
                case "image/jpeg":
                case "image/jpg":
                    imagejpeg($newImage, $thumbImageLoc, 90);
                    break;
                case "image/png":
                case "image/x-png":
                    imagepng($newImage, $thumbImageLoc);
                    break;
            }

            // Destroy image
            imagedestroy($newImage);

            // Display cropped image
            echo 'CROPPED IMAGE:<br/><img src="'.$thumbImageLoc.'"/>';
        }else{
            $error = "Sorry, there was an error uploading your file.";
        }
    }
}

// Display error
echo $error;
?>