$.fn.csv2arr = function (callback) {
    if (typeof FileReader == "undefined") {
        alert("Browser is too old,please use Chrome or Firefox");
        return false;
    }
    if (!$(this)[0].files[0]) {
        alert("Please select a file");
        return false;
    }
    var allowedExtensions = ["csv"];
    var fileName = $(this)[0].files[0].name;
    var fileExtension = fileName.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        alert("Invalid file type. Please select a CSV file.");
        return false;
    }
    var fReader = new FileReader();
    fReader.readAsDataURL($(this)[0].files[0]);
    $fileDOM = $(this);
    fReader.onload = function (evt) {
        var data = evt.target.result;
        var encoding = checkEncoding(data);

        Papa.parse($($fileDOM)[0].files[0], {
            encoding: encoding,
            complete: function (results) {
                var res = results.data;
                if (res[res.length - 1] == "") {
                    res.pop();
                }
                callback && callback(res);
            },
        });
    };
    fReader.onerror = function (evt) {
        alert("The file has changed,please select again");
    };

    function checkEncoding(base64Str) {
        var str = atob(base64Str.split(";base64,")[1]);
        var encoding = jschardet.detect(str);
        encoding = encoding.encoding;

        if (encoding == "windows-1252") {
            encoding = "ANSI";
        }
        return encoding;
    }
};
