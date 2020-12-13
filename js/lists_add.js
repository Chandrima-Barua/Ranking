    $(document).ready(function () {
        $("#list_button").on('click' , function (e) {
            image = $('.custom-file-input').val();
            lists_text = $('.text').val();

// $('.main').show();


            $('#myForm').ajaxForm({
                url: 'ajax/lists.php',
                data: "here",
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    var objects_data = JSON.parse(data);
                    object_array = Object.values(objects_data);
                    console.log(object_array);
                    window.history.pushState("Details", "Title", "content_with_image.php?lists_pointer=" + object_array[0] );
                    $('.content_main').hide();
               string =  "<div class='cons'><div class='underlineholder' style='display: block;'><div class='underline'></div></div><img src='uploads/" + object_array[3] +"' style='height: 300px; border: none' class='content' alt='No Image'/><div class='wrapper'><div id='itemtitletext'><p id='scrollingitemtitle' class='hidingitemtitle'><b id='scrollingitemtitle'>Content No : # </b>" + object_array[0] + "</p></div><div class='all-items'><div id='con'><p class='mainc'>" + object_array[1] + "</p></div></div><div class='bs'><button type='button' name='disagree' id='disagree'>Disagree??</button></div>"

$('.main').append(string);

                }
            });
        });
    });






