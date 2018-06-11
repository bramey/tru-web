/* global bootbox: false, console: false, S: false */

$(document).ready(function () {
  var jShowModal = $('#showModal');
  $('td.poster').on('click', function () {
    var image = $(this).attr('src');
    $('.img-responsive').attr("src", image);
    jShowModal.modal('show');
  });
});