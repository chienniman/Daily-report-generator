function processData(worksheet) {
    var dataArray = [];
    for (var row = 22; row <= 36; row++) { 
      var rowObject = {};
      for (var col = 2; col <= 7; col++) {
        var cellAddress = XLSX.utils.encode_cell({r: row, c: col});
        var cell = worksheet[cellAddress];
        rowObject[XLSX.utils.encode_col(col)] = cell ? cell.v : null;
      }
      dataArray.push(rowObject);
    }

    return dataArray;
}

function setData(key,value){
    sessionStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
    var storedData = sessionStorage.getItem(key);

    return storedData ? JSON.parse(storedData) : null;
}

function filePicked(oEvent) {
    return new Promise((resolve, reject) => {
      var oFile = oEvent.files[0];
      var reader = new FileReader();
  
      reader.onload = function(e) {
        try {
          var data = e.target.result;
          var cfb = XLSX.read(data, {type: 'binary'});
        
          // summary   
          var summaryData = processData(cfb.Sheets["總表"]);
          setData('summaryData', summaryData);
  
          // user
          var oJS = XLSX.utils.sheet_to_json(cfb.Sheets["簡雯樺"]);
          setData('ojs', oJS);
  
          resolve();  
        } catch (error) {
          reject(error);
        }
      };
  
      reader.onerror = function(e) {
        reject(e);
      };
  
      reader.readAsBinaryString(oFile);
    });
  }
  
