$.fn.csv2arr = function (callback) {
    if (typeof FileReader == "undefined") {
        Swal.fire({
            title: "瀏覽器不支援!",
            icon: "error"
        });
        return false;
    }
    if (!$(this)[0].files[0]) {
        Swal.fire({
            title: "必須選擇檔案!",
            icon: "error"
        });
        return false;
    }
    var allowedExtensions = ["csv"];
    var fileName = $(this)[0].files[0].name;
    var fileExtension = fileName.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        Swal.fire({
            title: "不支援的檔案類型，必須是 CSV 檔!",
            icon: "error"
        });
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
        Swal.fire({
            title: "無法預期的錯誤，請重新嘗試!",
            icon: "error"
        });
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
