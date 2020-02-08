highlight_row()
function highlight_row(){
    var table = document.getElementById('dataTable');
    var cells = table.getElementsByTagName('td')

    for (var i = 0; i < cells.length; i++){
        var cell = cells[i];
        cell.onclick = function(){
            var rowId = this.parentNode.rowIndex;
            var rowNotSelected = table.getElementsByTagName('tr')
            for(var row =0 ; row < rowNotSelected; row++){
                rowNotSelected[row].style.backgroundColor = "";
               rowNotSelected[row].classList.remove('selected')
            }

            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "yellow";
            rowSelected.className += "selected";
            msg = 'The ID of patient is : ' + rowSelected.cells[0].innerHTML;
            msg += '\nThe cell value is :' + this.innerHTML
            alert(msg)
        }
    }
}