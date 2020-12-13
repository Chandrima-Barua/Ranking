<style>

    .custom-file-upload {
        border: 1px solid #ccc;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
    }
</style>

<!--<label for="sortpicture" class="custom-file-upload">-->
<!--    image-->
<!--</label>-->
<!--<input type="text" name="text" id="name"/>-->
<!--<input id="sortpicture" type="file" name="file"/>-->
<!--<div id="show" style="display: none;"><img style="height: 100px; width: 100px; margin: 10px;" src="#" id="img"/></div>-->
<!--<button id="upload">Save</button>-->

<form id="data" method="post" enctype="multipart/form-data">
    <textarea>sddssdsadsa</textarea>
    <input type="text" name="first" value="Bob" />
    <input type="text" name="middle" value="James" />
    <input type="text" name="last" value="Smith" />
    <input name="image" type="file"/>

    <button>Submit</button>
</form>



<script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous">
</script>
<script src="libgif.js"></script>

<script>



$("form#data").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var text = 'ddd';
    formData.append('text', text);

    $.ajax({
        url: 'upload.php',
        type: 'POST',
        data: formData,
        success: function (data) {
            console.log(data);
        },
        cache: false,
        contentType: false,
        processData: false
    });
});
</script>