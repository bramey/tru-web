/* global bootbox: false, console: false, S: false */
/*
$(document).ready(function(){
  $('img.truPhoto').on('click',function(){
    console.log('click registered')
    $('#showImg').empty();
    var image = $(this).attr('src');
    console.log(image)
    var jPhotoModal = $('#photoModal');
    jPhotoModal.modal('show',function(){
      $('#showImg').append('img.img-responsive(src=image)')
    });
  });
});
*/

$(document).ready(function () {
  var jPhotoModal = $('#photoModal');
  $('img.truPhoto').on('click', function () {
    var image = $(this).attr('src');
    $('.img-responsive').attr("src", image);
    jPhotoModal.modal('show');
  });
});