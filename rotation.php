
<form method="post" action="upload.php" enctype="multipart/form-data">
    <input type="file" name="file" id="file" />
    <input type="hidden" name="rotation" id="rotation" value="0"/>
    <input type="submit" name="submit" value="Upload"/>
</form>

<div class="img-preview" style="display: none;">
    <button id="rright">Right</button>
    <button id="rleft">Left</button>
    <div id="imgPreview"></div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
    function filePreview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgPreview + img').remove();
                $('#imgPreview').after('<img src="'+e.target.result+'" class="pic-view" width="450" height="300"/>');
            };
            reader.readAsDataURL(input.files[0]);
            $('.img-preview').show();
        }else{
            $('#imgPreview + img').remove();
            $('.img-preview').hide();
        }
    }



    $("#file").change(function (){
        // Image preview
        filePreview(this);
    });
    $(function() {
        var rotation = 0;
        $("#rleft").click(function() {
            console.log(rotation)
            rotation = (rotation -90) % 360;
            console.log(rotation)
            $(".pic-view").css({'transform': 'rotate('+rotation+'deg)'});

            if(rotation != 0){
                $(".pic-view").css({'width': '300px', 'height': '300px'});
            }else{
                $(".pic-view").css({'width': '300px', 'height': '300px'});
            }
            $('#rotation').val(rotation);
        });

        $("#rright").click(function() {
            rotation = (rotation + 90) % 360;
            $(".pic-view").css({'transform': 'rotate('+rotation+'deg)'});

            if(rotation != 0){
                $(".pic-view").css({'width': '300px', 'height': '300px'});
            }else{
                $(".pic-view").css({'width': '300px', 'height': '300px'});
            }
            $('#rotation').val(rotation);
        });
    });
</script>













