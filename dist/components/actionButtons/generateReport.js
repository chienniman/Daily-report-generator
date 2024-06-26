(() => {
  // dataSets/pxMarts.js
  var groupedStores = /* @__PURE__ */ new Map([
    [
      "\u5927\u7532\u5340",
      /* @__PURE__ */ new Map([
        [83800, "\u8C50\u539F\u6210\u529F"],
        [89e3, "\u8C50\u539F\u5927\u8C50"],
        [90800, "\u795E\u5CA1\u4E94\u6B0A"],
        [754900, "\u53F0\u4E2D\u8C50\u540E"],
        [91400, "\u540E\u91CC"],
        [87100, "\u540E\u91CC\u6587\u660E"],
        [93400, "\u5927\u7532\u5FA9\u8208"],
        [99700, "\u5927\u7532\u7D93\u570B"],
        [750500, "\u5927\u7532\u6C11\u751F"],
        [94900, "\u5927\u7532\u5149\u660E"],
        [98e3, "\u5927\u7532\u7532\u540E"],
        [9e4, "\u5916\u57D4\u516D\u5206"]
      ])
    ],
    [
      "\u5317\u4E2D\u5340",
      /* @__PURE__ */ new Map([
        [84700, "\u53F0\u4E2D\u535A\u9928"],
        [88e3, "\u53F0\u4E2D\u6771\u5149"],
        [87300, "\u53F0\u4E2D\u65B0\u6C11"],
        [80300, "\u53F0\u4E2D\u5D07\u5FB7"],
        [97800, "\u53F0\u4E2D\u9032\u5316"],
        [83500, "\u53F0\u4E2D\u6C11\u6B0A"],
        [83300, "\u53F0\u4E2D\u6C38\u8208"],
        [81800, "\u53F0\u4E2D\u4E8C\u4E2D"],
        [84300, "\u53F0\u4E2D\u5B78\u58EB"],
        [88600, "\u53F0\u4E2D\u535A\u4E8C"],
        [754600, "\u53F0\u4E2D\u5065\u884C"],
        [96e3, "\u53F0\u4E2D\u660E\u65B0"]
      ])
    ],
    [
      "\u5317\u5C6F\u5340",
      /* @__PURE__ */ new Map([
        [97600, "\u53F0\u4E2D\u677E\u7AF9"],
        [88300, "\u53F0\u4E2D\u8ECD\u592A"],
        [82200, "\u5317\u5C6F"],
        [89200, "\u53F0\u4E2D\u5927\u5751"],
        [81200, "\u8ECD\u529F"],
        [752600, "\u53F0\u4E2D\u592A\u539F"],
        [88200, "\u53F0\u4E2D\u677E\u4E94"],
        [97900, "\u53F0\u4E2D\u5357\u8208"],
        [85200, "\u53F0\u4E2D\u5317\u5C6F\u4E8C"],
        [80700, "\u53F0\u4E2D\u6771\u5C71"],
        [99100, "\u53F0\u4E2D\u6566\u5BCC"]
      ])
    ],
    [
      "\u5317\u897F\u5340",
      /* @__PURE__ */ new Map([
        [34e4, "\u53F0\u4E2D\u6885\u5DDD\u6771"],
        [85e3, "\u65C5\u9806"],
        [80800, "\u53F0\u4E2D\u965C\u897F"],
        [88900, "\u53F0\u4E2D\u56DB\u5E73"],
        [95200, "\u53F0\u4E2D\u5927\u9D6C"],
        [754800, "\u53F0\u4E2D\u6C34\u6E73"],
        [81500, "\u5929\u6D25"],
        [82e3, "\u5927\u9023"],
        [99e3, "\u53F0\u4E2D\u5D07\u5FB7\u516B"],
        [98700, "\u53F0\u4E2D\u5C71\u897F"],
        [98600, "\u53F0\u4E2D\u6566\u5316"],
        [98200, "\u53F0\u4E2D\u6CB3\u5317\u6771"],
        [86100, "\u53F0\u4E2D\u540E\u5E84"]
      ])
    ],
    [
      "\u897F\u5C6F\u5340",
      /* @__PURE__ */ new Map([
        [86200, "\u9022\u7532"],
        [752700, "\u53F0\u4E2D\u897F\u5C6F"],
        [81700, "\u4E2D\u5DE5"],
        [99200, "\u53F0\u4E2D\u5BF6\u6176"],
        [96400, "\u53F0\u4E2D\u798F\u79D1"],
        [87900, "\u53F0\u4E2D\u9752\u6D77"]
      ])
    ],
    [
      "\u6C99\u9E7F\u5340",
      /* @__PURE__ */ new Map([
        [91800, "\u6C99\u9E7F"],
        [97300, "\u6C99\u9E7F\u5317\u52E2\u6771"],
        [87e3, "\u6C99\u9E7F\u5C4F\u897F"],
        [95e3, "\u6C99\u9E7F\u4E2D\u5C71"],
        [99400, "\u6E05\u6C34\u65B0\u8208"],
        [93300, "\u6E05\u6C34\u4E2D\u8208"],
        [88500, "\u6E05\u6C34\u4E94\u6B0A"],
        [96700, "\u6E05\u6C34\u4E2D\u5C71"],
        [85400, "\u6E05\u6C34\u9C32\u5CF0"]
      ])
    ],
    [
      "\u5357\u4E2D\u5340",
      /* @__PURE__ */ new Map([
        [86500, "\u53F0\u4E2D\u6797\u68EE"],
        [97100, "\u53F0\u4E2D\u5FE0\u5B5D"],
        [83700, "\u53F0\u4E2D\u5357\u9580"],
        [80400, "\u53F0\u4E2D\u5FA9\u8208"],
        [96900, "\u53F0\u4E2D\u5FE0\u660E\u5357"],
        [89700, "\u53F0\u4E2D\u5DE5\u5B78"],
        [89800, "\u53F0\u4E2D\u5EFA\u570B\u5357"],
        [83400, "\u53F0\u4E2D\u6A02\u7FA4"],
        [83200, "\u53F0\u4E2D\u5B78\u5E9C"],
        [82400, "\u5927\u667A"],
        [755e3, "\u53F0\u4E2D\u4E09\u6C11"],
        [754500, "\u53F0\u4E2D\u4EC1\u548C"]
      ])
    ],
    [
      "\u5357\u897F\u5340",
      /* @__PURE__ */ new Map([
        [89900, "\u53F0\u4E2D\u5927\u660C"],
        [95800, "\u53F0\u4E2D\u5FE0\u7FA9"],
        [95700, "\u53F0\u4E2D\u5E02\u653F"],
        [81600, "\u7CBE\u8AA0"],
        [82500, "\u6587\u5FC3"],
        [83600, "\u53F0\u4E2D\u5411\u4E0A"],
        [82100, "\u5FE0\u660E"],
        [82700, "\u53F0\u4E2D\u6587\u83EF"],
        [84400, "\u53F0\u4E2D\u5927\u9032"],
        [95500, "\u53F0\u4E2D\u6C38\u6625\u6771"],
        // 美村綠
        [755200, "\u53F0\u4E2D\u7F8E\u6751"],
        [85600, "\u53F0\u4E2D\u5927\u5FE0"]
      ])
    ],
    [
      "\u96C5\u6F6D\u5340",
      /* @__PURE__ */ new Map([
        [93900, "\u5927\u96C5\u96C5\u74B0"],
        [92900, "\u5927\u96C5\u5B78\u5E9C"],
        [94600, "\u5927\u96C5\u6C11\u751F"],
        [88100, "\u795E\u5CA1\u4E2D\u6B63"],
        [92700, "\u795E\u5CA1\u4E2D\u5C71"],
        [90200, "\u795E\u5CA1\u660C\u5E73"],
        [96300, "\u6F6D\u5B50\u5F97\u5929"],
        [93800, "\u6F6D\u5B50\u6F6D\u967D"],
        [97400, "\u6F6D\u5B50\u4E2D\u5C71"],
        [98500, "\u6F6D\u5B50\u798F\u6F6D"],
        [92800, "\u6F6D\u5B50"],
        [96600, "\u6F6D\u5B50\u6F6D\u8C50"],
        [85500, "\u6F6D\u5B50\u8C50\u8208"]
      ])
    ],
    [
      "\u8C50\u539F\u5340",
      /* @__PURE__ */ new Map([
        [94800, "\u6771\u52E2\u8C50\u52E2"],
        [91200, "\u6771\u52E2\u6771\u862D"],
        [84100, "\u65B0\u793E\u4E2D\u548C"],
        [93100, "\u8C50\u539F\u7530\u5FC3"],
        [89400, "\u8C50\u539F\u5411\u967D"],
        [84500, "\u8C50\u539F\u8C50\u6771"],
        [96500, "\u8C50\u539F\u5317\u967D"],
        [89300, "\u8C50\u539F\u5927\u9806"],
        [86300, "\u8C50\u539F\u5FE0\u5B5D"],
        // 台中石岡
        [87600, "\u77F3\u5CA1\u8C50\u52E2"]
      ])
    ],
    [
      "\u5927\u91CC\u5340",
      /* @__PURE__ */ new Map([
        [95600, "\u5927\u91CC\u723D\u6587"],
        [91700, "\u5927\u91CC"],
        [99600, "\u5927\u91CC\u65B0\u8208"],
        [94300, "\u5857\u57CE\u91D1\u5FB7"],
        [87500, "\u5927\u91CC\u65B0\u82B3"],
        [92400, "\u9727\u5CF0\u6C11\u751F"]
      ])
    ],
    [
      "\u592A\u5E73\u5340",
      /* @__PURE__ */ new Map([
        [91100, "\u592A\u5E73\u6A39\u5FB7"],
        [90300, "\u592A\u5E73\u5B9C\u660C"],
        [86900, "\u592A\u5E73\u6A39\u5B5D"],
        [82600, "\u5341\u7532"]
      ])
    ],
    [
      "\u9F8D\u4E95\u5340",
      /* @__PURE__ */ new Map([
        [86600, "\u5927\u809A\u69AE\u83EF"],
        [86800, "\u9F8D\u4E95\u6C99\u7530"],
        [88800, "\u68A7\u68F2\u6587\u660C"],
        [85900, "\u68A7\u68F2\u6587\u5316"]
      ])
    ],
    [
      "\u5357\u5C6F\u5340",
      /* @__PURE__ */ new Map([
        [94200, "\u70CF\u65E5\u9577\u6625"],
        [93700, "\u70CF\u65E5\u4E2D\u5C71"],
        [340100, "\u70CF\u65E5\u74B0\u6CB3"],
        [89600, "\u53F0\u4E2D\u8C50\u6A02"],
        // "台中向上三厝"
        [86700, "\u53F0\u4E2D\u4E09\u539D"],
        [80500, "\u53F0\u4E2D\u9ECE\u660E"],
        [753e3, "\u53F0\u4E2D\u4E09\u548C"],
        [96200, "\u53F0\u4E2D\u6953\u6A39"],
        [84800, "\u53F0\u4E2D\u5DBA\u6771"],
        [97e3, "\u53F0\u4E2D\u60E0\u6587"],
        [82300, "\u53F0\u4E2D\u842C\u548C"]
      ])
    ],
    [
      "\u5F70\u5316\u5340",
      /* @__PURE__ */ new Map([
        [111100, "\u5F70\u5B89"],
        [111200, "\u4E09\u6C11"],
        [111300, "\u9577\u8208"],
        [111400, "\u5F70\u5316\u81EA\u5F37\u5357"],
        [115900, "\u5F70\u5316\u9032\u5FB7"],
        [116300, "\u5F70\u5316\u5F70\u9E7F"],
        [118700, "\u5F70\u5316\u5EF6\u5E73"],
        [118800, "\u5F70\u5316\u4E2D\u8208"],
        [119100, "\u5F70\u5316\u5F70\u5357"],
        [119200, "\u5F70\u5316\u91D1\u99AC"],
        [119400, "\u5F70\u5316\u4E2D\u6B63"]
      ])
    ]
  ]);
  var productMap = /* @__PURE__ */ new Map([
    ["61010960", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u80A5\u7682 / \uFF12\uFF10\uFF10\uFF47\uFF0A\uFF13\u584A"],
    ["61010830", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u80A5\u7682\uFF0D\u6AB8\u6AAC\u6E05\u9999 / \uFF11\uFF15\uFF10\uFF47\uFF0A\uFF13\u5165"],
    [
      "61011024",
      "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u80A5\u7682\uFF0D\u6AB8\u6AAC\uFF11\uFF15\uFF10 / \uFF47\uFF0A\uFF16\u8D08\u98DF\u5668\u6D17\u6ECC\u6DB2\u9AD4\uFF12\uFF15\uFF10\uFF4D\uFF4C"
    ],
    ["61010953", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u6DB2\u9AD4\u88DC\u5145\u5305\uFF0D\u8F15\u67D4\u578B / \uFF11\uFF16\uFF10\uFF10\uFF47"],
    ["71210073", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u98DF\u5668\u6D17\u6ECC\u6DB2\u9AD4 / \uFF11\uFF10\uFF10\uFF10\uFF4D\uFF4C"],
    ["61050066", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u98DF\u5668\u6D17\u6ECC\u6DB2\u4F53 / \uFF0D\u901F\u6DE8\uFF06\u6E05\u65B0\uFF18\uFF10\uFF10\uFF4D\uFF4C"],
    ["61010929", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u7682\u529B\u6DE8\u6D17\u8863\u6DB2\u9AD4\u7682 / \uFF11\uFF16\uFF10\uFF10\uFF47"],
    [
      "61010942",
      "\u83EF\u5F37\u3000\u5357\u50D1\u8461\u8404\u67DA\u7C7D\u6297\u83CC\u6D17\u8863\u6DB2\u9AD4 / \u7682\uFF0D\u7DAD\u4ED6\u547D\uFF25\u8B77\u7E96\u914D\u65B9\uFF11\uFF14\uFF10\uFF10\uFF47"
    ],
    ["61010950", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u6D17\u8863\u7528\u6DB2\u9AD4\u8F15\u67D4\u7CFB / \u5217\u88DC\u5145\u5305\uFF0D\u512A\u96C5\u82B1\u9999\uFF11\uFF16\uFF10\uFF10\uFF47"],
    ["61010951", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u6D17\u8863\u7528\u6DB2\u9AD4\u88DC\u5145\u5305\uFF0D / \u8F15\u67D4\u7CFB\u5217\u8212\u7DE9\u8349\u9999\uFF11\uFF16\uFF10\uFF10\uFF47"],
    ["61010952", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u80A5\u7682\u6DB2\u4F53\u88DC\u5145\u5305\uFF0D / \u6297\u83CC\u8F15\u67D4\u578B\uFF11\uFF15\uFF10\uFF10\uFF47"],
    ["61010992", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\uFF33\uFF50\uFF4F\uFF52\uFF54\uFF53\u6297\u83CC / \u9664\u81ED\u6D17\u8863\u6DB2\u9AD4\u7682\u88DC\u5145\u5305\uFF18\uFF10\uFF10\uFF47"],
    [
      "61010995",
      "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u8461\u8404\u67DA\u7C7D\u9632\u9709\u6D17\u8863 / \u6DB2\u9AD4\u7682\u88DC\u5145\u5305\uFF0D\u5BA4\u5167\u667E\uFF11\uFF12\uFF10\uFF10\uFF47"
    ],
    ["61010991", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\uFF33\uFF50\uFF4F\uFF52\uFF54\uFF53\u6297\u83CC / \u9664\u81ED\u6D17\u8863\u6DB2\u9AD4\u7682\u74F6\u88DD\uFF11\uFF10\uFF10\uFF10\uFF47"],
    ["61010994", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u8461\u8404\u67DA\u7C7D\u6297\u83CC\u9632\u9709 / \u6D17\u8863\u6DB2\u9AD4\u7682\uFF0D\u5BA4\u5167\u667E\uFF12\uFF4B\uFF47"],
    ["71140132", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u6DB2\u9AD4\uFF0D\u8F15\u67D4\u578B / \uFF12\uFE52\uFF14\uFF4B\uFF47"],
    ["71018500", "\u83EF\u5F37\u3000\u5357\u50D1\u6C34\u6676\u80A5\u7682\u6DB2\u4F53\uFF0D\u6297\u83CC\u8F15 / \u67D4\u578B\uFF12\uFF0E\uFF12\uFF4B\uFF47"],
    ["71018608", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u6D17\u8863\u7528\u6DB2\u9AD4\u8F15\u67D4\u7CFB / \u5217\uFF0D\u512A\u96C5\u82B1\u9999\uFF12\uFF0E\uFF14\uFF4B\uFF47"],
    ["71110016", "\u83EF\u5F37\u3000\u6C34\u6676\u80A5\u7682\u6D17\u8863\u7528\u7C89\u4F53 / \uFF11\uFF0E\uFF17\uFF19\uFF4B\uFF47"]
  ]);

  // components/shared/table/row/headerRow.js
  function headerRow(productMap2) {
    let headerRow2 = "<tr class='gray'><th>\u8655</th><th>\u5340</th><th>\u5E97\u540D</th>";
    Array.from(productMap2.values()).forEach((product) => {
      headerRow2 += `<th colspan="2">${product}</th>`;
    });
    return headerRow2 + "</tr>";
  }

  // utils/dataProcessing.js
  function setData(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  function getData(key) {
    var storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  // components/shared/buttons/storeButton.js
  var visitedAreas = [];
  function storeButton(area, store) {
    function handleClick(area2, store2) {
      $(`.${store2.name}`).prop("disabled", true);
      if (!visitedAreas.includes(area2)) {
        visitedAreas.push(area2);
        setData("visitedAreas", visitedAreas);
      }
      const dailyKpiArray = getData("ojs");
      if (!dailyKpiArray) {
        Swal.fire({ title: "\u8ACB\u5148\u4E0A\u50B3\u7576\u6708\u7E3E\u6548\u7E3D\u8868", icon: "error" });
        return;
      }
      const result = dailyKpiArray.find((e) => e.\u5E97\u865F === store2.id.toString());
      if (!result) {
        Swal.fire({
          title: "\u7121\u5E97\u5BB6\u8CC7\u6599",
          icon: "error"
        });
        return;
      }
      function formatDifference(diff) {
        return diff.startsWith("--") ? diff.replace("--", "\u5C11") : "\u591A" + diff;
      }
      result["\u5DEE\u7570\u91D1\u984D"] = formatDifference(result["\u5DEE\u7570\u91D1\u984D"]);
      Swal.fire({
        title: "\u5F8C\u7E8C\u8FFD\u8E64\u4E8B\u9805",
        text: `\u9054\u6210\u7387${result["\u9054\u6210%"]}\uFF0C\u5DEE\u7570\u91D1\u984D${result["\u5DEE\u7570\u91D1\u984D"]}`,
        icon: "success"
      });
    }
    return $("<button>").addClass(store.name).text(store.name).css("cursor", "pointer").on("click", () => handleClick(area, store));
  }

  // components/shared/table/cell/qtyCell.js
  function qtyCell(id, qty) {
    return $(`<td id='${id}'>`).html(
      `<div class="split-td"><div class="darkred-text">${qty}</div></div>`
    );
  }

  // components/shared/table/row/storeRow.js
  function storeRow(area, store, monthStocksData, todaySellsData) {
    function getStockQty(monthStocksData2, store2, product) {
      const stockQtys = monthStocksData2?.[store2.id]?.stockQtys || [];
      const foundItem = stockQtys.find((item) => item.hasOwnProperty(product));
      return foundItem ? foundItem[product] : "N/A";
    }
    function getSellQty(todaySellsData2, store2, product) {
      return todaySellsData2?.[store2.id]?.sellQtys?.find(
        (item) => item[product] !== void 0
      )?.[product] || "0";
    }
    const storeRow2 = $("<tr>").addClass("table-row").append(
      $("<td>").text(" "),
      $("<td>").text(area),
      $("<td>").append(storeButton(area, store))
    );
    Array.from(productMap.values()).forEach((product) => {
      storeRow2.append(
        qtyCell("stock", getStockQty(monthStocksData, store, product)),
        qtyCell("sell", getSellQty(todaySellsData, store, product))
      );
    });
    return storeRow2;
  }

  // components/shared/table/row/subHeaderRow.js
  function subHeaderRow(productMap2) {
    let subHeaderRow2 = "<tr class='white'><th></th><th></th><th></th>";
    Array.from(productMap2.values()).forEach(() => {
      subHeaderRow2 += `
              <th id="stock">
                  <div class='darkred-text'>
                      \u5EAB\u5B58
                  </div>
              </th>
              <th id="sell">
                  <div class='darkred-text'>
                      \u65E5\u92B7
                  </div>
              </th>
          `;
    });
    return subHeaderRow2 + "</tr>";
  }

  // helpers/appendRows.js
  function appendHeaderRows(productMap2) {
    $("#resultTable").append(headerRow(productMap2));
    $("#resultTable").append(subHeaderRow(productMap2));
  }
  function appendTableRows(table, monthStocksData, todaySellsData) {
    groupedStores.forEach((stores, area) => {
      stores.forEach((storeName, storeId) => {
        table.append(
          storeRow(
            area,
            { id: storeId, name: storeName },
            monthStocksData,
            todaySellsData
          )
        );
      });
    });
  }

  // helpers/dataHandler.js
  function arrayToNestedJson(array, type) {
    return array.reduce((json, e) => {
      const PTDPNO = Number(e[3]);
      const key = type === "monthStocks" ? "stockQtys" : "sellQtys";
      const value = Number(e[type === "monthStocks" ? 12 : 8]);
      const dynamicKey = e[7];
      if (!json[PTDPNO]) {
        json[PTDPNO] = {
          PTDPNA: e[4],
          stockQtys: [],
          sellQtys: []
        };
      }
      json[PTDPNO][key].push({ [dynamicKey]: value });
      return json;
    }, {});
  }

  // utils/filterData.js
  function generateFilter(PTDPNO, PRDTCODE) {
    const storeIds = Array.from(groupedStores.values()).flatMap(
      (storeMap) => Array.from(storeMap.keys())
    );
    const productIds = Array.from(productMap.keys());
    return storeIds.includes(PTDPNO) && productIds.includes(PRDTCODE);
  }
  function getfilteredData(array) {
    return array.filter((item) => {
      return generateFilter(Number(item[3]), item[5]);
    });
  }

  // utils/checkers/checkFileType.js
  function isCSV(file) {
    return file && file.name.split(".").pop().toLowerCase() === "csv";
  }

  // utils/checkers/checkCsvInput.js
  function checkCsvInput(file) {
    if (typeof FileReader === "undefined") {
      Swal.fire({ title: "\u700F\u89BD\u5668\u4E0D\u652F\u63F4!", icon: "error" });
      return false;
    }
    if (!file) {
      Swal.fire({ title: "\u5FC5\u9808\u9078\u64C7\u6A94\u6848!", icon: "error" });
      return false;
    }
    if (!isCSV(file)) {
      Swal.fire({ title: "\u4E0D\u652F\u63F4\u7684\u6A94\u6848\u985E\u578B\uFF0C\u5FC5\u9808\u662F CSV \u6A94!", icon: "error" });
      return false;
    }
  }

  // utils/fileProcessing.js
  $.fn.csv2arr = function(callback) {
    const file = $(this)[0].files[0];
    checkCsvInput(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(evt) {
      const data = evt.target.result;
      const encoding = jschardet.detect(atob(data.split(";base64,")[1])).encoding;
      Papa.parse(file, {
        encoding: encoding === "windows-1252" ? "ANSI" : encoding,
        complete: (results) => {
          const res = results.data;
          if (res[res.length - 1] === "") res.pop();
          callback && callback(res);
        }
      });
    };
    reader.onerror = function() {
      Swal.fire({ title: "\u7121\u6CD5\u9810\u671F\u7684\u932F\u8AA4\uFF0C\u8ACB\u91CD\u65B0\u5617\u8A66!", icon: "error" });
    };
  };
  async function processCSV(inputName) {
    return new Promise((resolve) => {
      $(`input[name=${inputName}]`).csv2arr((array) => {
        const json = arrayToNestedJson(getfilteredData(array), inputName);
        $(`input[name=${inputName}]`).val("");
        resolve(json);
      });
    });
  }

  // utils/report.js
  async function createReport() {
    try {
      const monthStocksData = await processCSV("monthStocks");
      const todaySellsData = await processCSV("todaySells");
      appendHeaderRows(productMap);
      appendTableRows($("#resultTable"), monthStocksData, todaySellsData);
    } catch (error) {
      console.error("\u5831\u8868\u751F\u6210\u932F\u8AA4", error);
    }
  }

  // utils/validation.js
  function validateInputs() {
    const monthStocks = $("#monthStocks").val();
    const todaySells = $("#todaySells").val();
    if (!monthStocks || !todaySells) {
      Swal.fire({
        title: "\u5FC5\u9808\u540C\u6642\u4E0A\u50B3\u55AE\u6708\u9032\u92B7\u5B58\u8DDF\u7576\u65E5\u92B7\u552E!",
        icon: "error"
      });
      return false;
    }
    if (!isCSV($("#monthStocks")[0].files[0]) || !isCSV($("#todaySells")[0].files[0])) {
      Swal.fire({ title: "\u8F38\u5165\u5FC5\u9808\u662F CSV \u6A94!", icon: "error" });
      return false;
    }
    return true;
  }

  // helpers/mergeStyleString.js
  function mergeStyleString(fixedStyles, styles) {
    const mergedStyles = { ...fixedStyles, ...styles };
    return Object.keys(mergedStyles).map((key) => `${key}: ${mergedStyles[key]};`).join(" ");
  }

  // components/shared/buttons/button.js
  function button({ id, text, styles }) {
    const fixedStyles = {
      "max-width": "80px",
      cursor: "pointer"
    };
    return `<button id="${id}" class="button" style="${mergeStyleString(
      fixedStyles,
      styles
    )}">${text}</button>`;
  }

  // components/actionButtons/generateReport.js
  $(document).ready(function() {
    $(".top-row").append(
      button({
        id: "generateReport",
        text: "\u751F\u6210"
      })
    );
    function showHiddenBtn() {
      $("#dailySummary,#exportToExcel,#reset").show();
    }
    $("#generateReport").on("click", async function() {
      if (!validateInputs()) return;
      Pace.restart();
      await createReport();
      Pace.stop();
      showHiddenBtn();
    });
  });
})();
