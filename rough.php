<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb2312"/>
    <title>imgAreaSelect jQuery plugin - Examples</title>
    <link rel="stylesheet" href="css/imgareaselect-animated.css">
    <link rel="stylesheet" href="css/imgareaselect-default.css">
    <link rel="stylesheet" href="css/imgareaselect-deprecated.css">
    <script src="js/jquery.js"></script>
    <script src="js/jquery.imgareaselect.js"></script>
    <script src="js/jquery.imgareaselect.pack.js"></script>
</head>

<body>
<div>
    <script type="text/javascript">
        $(function () {


            $(".chandrima").click(function (e) {
                console.log($('input#x1').val())
                console.log($('input#y1').val())
                console.log($('input#x2').val())
                console.log($('input#y2').val())
                console.log($('input#w').val())
                console.log($('input#h').val())
                preview();
            })

            function preview() {
                var imageuploadpopupphotowidth = $('#duck').width();
                var imageuploadpopupphotoheight = $('#duck').height();
                console.log("The actual image width " + imageuploadpopupphotowidth);
                console.log("The actual image width " + imageuploadpopupphotoheight);
                console.log("The selected width" + $('input#w').val());
                console.log("The selected height" + $('input#h').val());
                console.log("The fixed width" + $(".fff").width());
                console.log("The fixed height" + $(".fff").height());

//                var scaleX = $(".fff").width() / ( $('input#x2').val() - $('input#x1').val());
//                var scaleY = $(".fff").height() / ($('input#y2').val() - $('input#y1').val());
//                var scaleX = $(".fff").width() /  $('input#w').val();
//                var scaleY = $(".fff").height() / $('input#h').val();
                console.log(( $('input#x2').val() - $('input#x1').val()))
                console.log($(".fff").width() - $('input#w').val())
                console.log($(".fff").height() - $('input#h').val())

                actialar = $('input#w').val() / $('input#h').val();
                displayar = $(".fff").width() / $(".fff").height();
                console.log("the actual aspect Ratio" + actialar)
                console.log("the actual displayed aspect Ratio" + displayar)

                if (actialar > displayar) {
                    console.log("This is greater")
                    var scaleX = $(".fff").width() / $('input#w').val();
//                    var scaleY = $(".fff").height() / $('input#h').val();
                    $('#preview').css({

                        width: Math.round(scaleX * $('input#w').val()),
                        height: Math.round(scaleX * $('input#h').val()),
                    });
                }
                else {
                    var scaleY = $(".fff").height() / $('input#h').val();
                    $('#preview').css({
                        width: Math.round(scaleY * $('input#w').val()),
                        height: Math.round(scaleY * $('input#h').val()),
                        marginLeft: -Math.round(($(".fff").width() - $('input#w').val()) / 2),
                        marginTop: -Math.round(($(".fff").height() - $('input#h').val()) / 2),
                    });
                }

//                if ($('input#h').val() > $(".fff").height()) {
//                    //when the selected width is greater than the selected height
//
//                }
//                if ($('input#w').val() > $(".fff").height()) {
//                    //when the selected height is greater than the selected width
//
//                }

//                console.log("The scaled width" + Math.round(scaleX * imageuploadpopupphotowidth))
//                console.log("The scaled height" + Math.round(scaleY * imageuploadpopupphotoheight))
                $('#preview').css({
                    'display': 'block'
                });
            }


            minsize = Math.min($('#duck').width(), $('#duck').height());
            ias = $('#duck').imgAreaSelect({
                onInit: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                    $('input#x1').val(selection.x1);
                    $('input#y1').val(selection.y1);
                    $('input#x2').val(selection.x2);
                    $('input#y2').val(selection.y2);
                    $('input#w').val(selection.width);
                    $('input#h').val(selection.height);
                    $("#preview").attr('src', img.src)

                },
                instance: true,
                handles: true,
                persistent: true,
                onSelectEnd: function (img, selection) {
                    document.iasselectionx1 = selection.x1;
                    document.iasselectiony1 = selection.y1;
                    document.iasselectionx2 = selection.x2;
                    document.iasselectiony2 = selection.y2;
                    console.log(selection.x1);
                    console.log(selection.y1);
                    console.log(selection.x2);
                    console.log(selection.y2);
                    console.log('width: ' + selection.width + '; height: ' + selection.height);
                    $('input#x1').val(selection.x1);
                    $('input#y1').val(selection.y1);
                    $('input#x2').val(selection.x2);
                    $('input#y2').val(selection.y2);
                    $('input#w').val(selection.width);
                    $('input#h').val(selection.height);
//                    preview(img, selection);
                    console.log(img.src)
                    $("#preview").attr('src', img.src)

                }
            });
            ias.setSelection(0, 0, minsize, minsize, true);
            ias.setOptions({show: true});
            ias.getSelection();
            console.log(ias.getSelection())

            console.log($('#duck').width())

        });


    </script>

</div>
<input type="button" value="Submit" class="chandrima">
<p style="text-align: center;">
    <img id="duck"
         src="images/contributionimages/contributionfe9316e7478192a42c9ea00eeb6eb62e790142de2072afa8f8c34d967d3ebf40.jpg"
         alt="Why did the duck cross the road?" title="Why did the duck cross the road?">
</p>
<input type="hidden" id="x1" name="x1"/>
<input type="hidden" id="y1" name="y1"/>
<input type="hidden" id="x2" name="x2"/>
<input type="hidden" id="y2" name="y2"/>
<input type="hidden" id="w" name="w"/>
<input type="hidden" id="h" name="h"/>
<p><img id="imagePreview" style="display:none;"/></p>
<div>
    <p class="fff" style="overflow: hidden; height: 356px; width: 515px; margin-left:200px"><img id="preview" src=""
                                                                                                 style="display: none"/>
    </p>
</div>
</body>
</html>
