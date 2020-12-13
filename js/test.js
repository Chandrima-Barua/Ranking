


function display_new_image(imagesrc, ieorientation) {
    alert("hell")

    if (!window.atob) window.atob = base64.decode;
    if (!($.browser.msie && $.browser.version < 10)) {
        var b64 = imagesrc;
        var bin = atob(b64.split(',')[1]);
        var binaryFile = new EXIF.BinaryFile(bin, 0, bin.length);
        var exif = EXIF.findEXIFinJPEG(binaryFile);

        if (exif.Orientation == '6') {
            orientclass = "ninetydeg";
        } else if (exif.Orientation == '8') {
            orientclass = "twoseventydeg";
        } else if (exif.Orientation == '3') {
            orientclass = "oneeightydeg";
        }
        else if (exif.Orientation == '2') {
            orientclass = "flipzerodeg";
        }
        else if (exif.Orientation == '4') {
            orientclass = "fliponeeightydeg";
        }
        else if (exif.Orientation == '5') {

            orientclass = "flipninetydeg";
        }
        else if (exif.Orientation == '7') {
            orientclass = "fliptwoseventydeg";
        }
        else {
            orientclass = "zerodeg";
        }


    }
    else {

        if (ieorientation == '6') {
            var orientclass = "ninetydeg";
        } else if (ieorientation == '8') {
            var orientclass = "twoseventydeg";
        } else if (ieorientation == '3') {
            var orientclass = "oneeightydeg";
        } else {
            var orientclass = "zerodeg";
        }
    }
    // console.log(orientclass);
    uploadedimg = new Image();
    console.log("new image");
    console.log(uploadedimg);
    uploadedimg.onload = function () {

        var maxdisplaywidth = $("#listimageuploadpopuptitle").width();
        console.log("max width" + maxdisplaywidth);
        var maxdisplayheight = 400;

        if ($.browser.msie && $.browser.version < 9) {


            console.log($.browser.version)
            console.log($.browser.msie)

            // $(".imageuploadpopupphotocontainer").html("<img draggable='false' id='createlistimageuploadpopupphoto' class='createlistimageuploadpopupphoto' + orientclass + '"  src='" + this.src + "' />")
            // OutputImageForDevice('<img draggable="false" id="createlistimageuploadpopupphoto" class="createlistimageuploadpopupphoto ' + orientclass + '" src="' + this.src + '" />', "createlistimageuploadpopupphotocontainer");
            $(".imageuploadpopupphotocontainer").html("<img draggable='false' id='imageuploadpopupphoto' src='" + this.src + "' class='imageuploadpopupphoto " + orientclass + "' />");

            if (ieorientation == 6 || ieorientation == 8) {
                var naturalwidth = $('.imageuploadpopupphoto').height();
                var naturalheight =  $('.imageuploadpopupphoto').width();
            } else {
                var naturalwidth =  $('.imageuploadpopupphoto').width();
                var naturalheight =  $('.imageuploadpopupphoto').height();
            }
        }
        else {

            console.log("not  browser version")
            var naturalwidth = this.width;
            var naturalheight = this.height;
        }
        var finalimagewidth = naturalwidth;
        var finalimageheight = naturalheight;
        console.log(orientclass);
        if (orientclass === 'zerodeg' || orientclass === 'flipzerodeg' || orientclass === 'oneeightydeg' || orientclass === 'fliponeeightydeg') {
        // if (orientclass === 'zerodeg' || orientclass === 'oneeightydeg') {

            var currentnaturalwidth = naturalwidth;
            var currentnaturalheight = naturalheight;

            var availableaspectratio = maxdisplaywidth/maxdisplayheight;
            var imageaspectratio = currentnaturalwidth/currentnaturalheight;
            if(imageaspectratio<availableaspectratio){
                var scaleforimage = maxdisplayheight/currentnaturalheight;
            }
            else{
                var scaleforimage = maxdisplaywidth / currentnaturalwidth;
            }
            var finalimagewidth = Math.floor(currentnaturalwidth*scaleforimage);
            var finalimageheight = Math.floor(currentnaturalheight*scaleforimage);
            $(".imageuploadpopupphotocontainer").html("<img draggable='false' id='imageuploadpopupphoto' src='" + this.src + "' class='imageuploadpopupphoto " + orientclass + "' />");



        }



        // if (orientclass === 'ninetydeg' || orientclass === 'twoseventydeg') {
else{
            var currentnaturalwidth = naturalheight;
            var currentnaturalheight = naturalwidth;

            var availableaspectratio = maxdisplaywidth/maxdisplayheight;
            var imageaspectratio = currentnaturalwidth/currentnaturalheight;
            if(imageaspectratio<availableaspectratio){
                var scaleforimage = maxdisplayheight/currentnaturalheight;
            }
            else{
                var scaleforimage = maxdisplaywidth / currentnaturalwidth;
            }
            var finalimagewidth = Math.floor(currentnaturalheight*scaleforimage);
            var finalimageheight = Math.floor(currentnaturalwidth*scaleforimage);
            $(".imageuploadpopupphotocontainer").html("<img draggable='false' id='imageuploadpopupphoto' src='" + this.src + "' class='imageuploadpopupphoto " + orientclass + "' />");

        }

        // adjustmargins();

        var minsize = Math.min($('.imageuploadpopupphoto').width(), $('.imageuploadpopupphoto').height());


                $('.imageuploadpopupphoto').imgAreaSelect({remove: true});

                var ias = $('.imageuploadpopupphoto').imgAreaSelect({
                    onInit: function (img, selection) {
                        document.iasselectionx1 = selection.x1;
                        document.iasselectiony1 = selection.y1;
                        document.iasselectionx2 = selection.x2;
                        document.iasselectiony2 = selection.y2;
                    },
                    instance: true,
                    minWidth: 40, minHeight: 40,
                    // handles: true, aspectRatio: '1:1',
                    handles: true,
                    movable: true, resizable: true,
                    persistent: true,
                    parent: $('.listimageareaselectcontainer'),
                    onSelectEnd: function (img, selection) {
                        document.iasselectionx1 = selection.x1;
                        document.iasselectiony1 = selection.y1;
                        document.iasselectionx2 = selection.x2;
                        document.iasselectiony2 = selection.y2;
                    }
                });
                ias.setSelection(0, 0, minsize, minsize, true);
                ias.setOptions({show: true});




    };
    uploadedimg.src = imagesrc;
}
f = files[0];
/* Output file information */
function ParseFile(file) {
    /* Display an image */
    if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();

        reader.onload = function (e) {
            display_new_image(e.target.result, 1);
        };
        reader.readAsDataURL(file);
    }
}
ParseFile(file)


$('img.imageuploadpopupphoto').load(function() {
    if($(this).attr('src') !== 'images/fallbackimages/itemimage.png') {
        // $(this).css({'height': 'auto', 'width': '100%'});
        console.log($(this).attr('src'))
        $(this).css('transform','scaleX(-1)rotate(90deg)') ;

    }
});




























