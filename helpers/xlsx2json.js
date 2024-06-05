function setOjs(){
    localStorage.setItem('ojs', JSON.stringify(oJS));
}

function getOjs() {
    var storedData = localStorage.getItem('ojs');
    
    return storedData ? JSON.parse(storedData) : null;
}

function filePicked(oEvent) {
  var oFile = oEvent.files[0];
  var reader = new FileReader();
  var oJS = null;
  var targetSheetName = "簡雯樺";

  reader.onload = function(e) {
    var data = e.target.result;
    var cfb = XLSX.read(data, {type: 'binary'});
    
    if (cfb.SheetNames.includes(targetSheetName)) {
        oJS = XLSX.utils.sheet_to_json(cfb.Sheets[targetSheetName]);
        console.log("converted data - ", oJS);
        localStorage.setItem('ojs', JSON.stringify(oJS));
    } else {
        Swal.fire({
            title: "表名錯誤，請聯絡開發者!",
            icon: "error"
        });
    }

};

  reader.readAsBinaryString(oFile);
}
