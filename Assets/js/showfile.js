var input = document.getElementById('file"');
var infoArea = document.getElementById('file-upload-filename');
input.addEventListener('change', showFileName);

function showFileName(event){
 var input = event.SrcElement;
 var filename = input.files[0].name;
 infoArea.textContent = 'File name:' + filename;
}