$( document ).ready( function() {
  if( window.matchMedia("(pointer: coarse)").matches ) {
    $(document.body).addClass('touch');
  }
});
