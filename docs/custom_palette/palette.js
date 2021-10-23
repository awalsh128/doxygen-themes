
const urlParams = new URLSearchParams(window.location.search);
const palette = urlParams.get('palette');
$('#palette').attr('href', 'palette_' + palette + '.css');  
