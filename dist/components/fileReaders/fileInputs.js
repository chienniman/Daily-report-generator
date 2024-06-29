(()=>{function d(t,e){let i={...t,...e};return Object.keys(i).map(a=>`${a}: ${i[a]};`).join(" ")}function o({id:t,text:e,styles:i}){let a=d([],i);return`
          <div class="file-input">
              <input type="file" name="${t}" id="${t}" class="file-input-input">
              <label class="file-input-label" for="${t}" style="${a}">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" class="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                    </svg>
                  <span>${e}</span>
              </label>
          </div>
      `}function u(t){for(var e=[],i=22;i<=36;i++){for(var a={},s=2;s<=7;s++){var n=XLSX.utils.encode_cell({r:i,c:s}),l=t[n];a[XLSX.utils.encode_col(s)]=l?l.v:null}e.push(a)}return e}function r(t,e){sessionStorage.setItem(t,JSON.stringify(e))}$(document).ready(function(){function t(){$("#uploadedFiles").append(`
      <div id="monthStocksFileNameDisplay"></div>
      <div id="todaySellsFileNameDisplay"></div>
      <div id="dailyKpiFileNameDisplay"></div>
    `),$(".top-row").append(o({id:"monthStocks",text:"\u5EAB\u5B58",styles:{background:"#02723b"}}),o({id:"todaySells",text:"\u65E5\u92B7",styles:{background:"#02723b"}}),o({id:"dailyKpi",text:"\u7E3E\u6548",styles:{background:"#02723b"}}))}t(),$("#monthStocks").on("change",function(){var e=$(this).val().split("\\").pop();$("#monthStocksFileNameDisplay").text("\u9032\u92B7\u5B58 : "+e)}),$("#todaySells").on("change",function(){var e=$(this).val().split("\\").pop();$("#todaySellsFileNameDisplay").text("\u55AE\u65E5\u92B7\u8CA8 : "+e)}),$("#dailyKpi").on("change",function(){var e=$(this).val().split("\\").pop();$("#dailyKpiFileNameDisplay").text("\u6BCF\u65E5\u696D\u7E3E : "+e);var i=this.files[0],a=new FileReader;new Promise((s,n)=>{a.onload=function(l){try{var f=l.target.result,c=XLSX.read(f,{type:"binary"}),p=u(c.Sheets.\u7E3D\u8868);console.log(p),r("summaryData",p);var v=XLSX.utils.sheet_to_json(c.Sheets.\u7C21\u96EF\u6A3A);r("ojs",v),s()}catch(m){n(m)}},a.onerror=function(l){n(l)},a.readAsBinaryString(i)}).then(()=>{console.log("\u7E3E\u6548\u7E3D\u8868\u6210\u529F\u4E0A\u50B3")}).catch(s=>{console.error("\u7E3E\u6548\u7E3D\u8868\u4E0A\u50B3\u5931\u6557",s)})})});})();
