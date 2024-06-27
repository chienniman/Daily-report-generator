(() => {
  // components/app.js
  $(document).ready(function() {
    function createBaseElement() {
      $("body").append(`
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>
            <div class="content">
                <h1>\u5168\u806F\u5831\u8868\u751F\u6210\u5668</h1>
            </div>
            <div id="uploadedFiles"></div>
            <div class="top-row"></div>
            <table id="resultTable" border="1"></table>
            <div id="pptTableContainer"></div>
        `);
    }
    createBaseElement();
  });
})();
