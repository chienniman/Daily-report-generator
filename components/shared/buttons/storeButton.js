import { setData, getData } from "../../../utils/dataProcessing.js";

const visitedAreas = [];

function storeButton(area, store) {
  function getAccSellText(id) {
    return getData(id);
  }

  function handleClick(area, store) {
    $(`.${store.name}`).addClass("clicked-btn");

    if (!visitedAreas.includes(area)) {
      visitedAreas.push(area);
      setData("visitedAreas", visitedAreas);
    }

    const dailyKpiArray = getData("dailyKpiArray");

    if (!dailyKpiArray) {
      Swal.fire({ title: "請先上傳當月績效總表", icon: "error" });

      return;
    }

    const result = dailyKpiArray.find((e) => e.店號 === store.id.toString());

    if (!result) {
      Swal.fire({
        title: "無店家資料",
        icon: "error",
      });

      return;
    }

    const diffKey = Object.keys(result).find((key) => key.startsWith("差異金額"));
    function formatDifference(diff) {
      return diff.startsWith("--") ? diff.replace("--", "少") : "多" + diff;
    }

    try {
      if (diffKey) {
        result[diffKey] = formatDifference(result[diffKey]);
      } else {
        console.warn("未找到以 '差異金額' 開頭的 key");
      }
    } catch (error) {
      console.error("格式化差異金額錯誤:", error);
      if (diffKey) {
        result[diffKey] = result[diffKey] || "unknown";
      }
    }

    const accSellData = getAccSellText(store.id);
    let total = 0;
    if (Array.isArray(accSellData)) {
      accSellData.forEach(item => {
        const match = typeof item === 'string' ? item.match(/([\d.]+)$/) : null;
        const val = match ? match[1] : null;
        if (val && val !== 'N/A' && !isNaN(Number(val))) {
          total += Number(val);
        }
      });
    }
    const today = new Date();
    const days = today.getDate();
    const avg = days > 0 ? Math.floor(total / days) : 0;

    Swal.fire({
      title: "後續追蹤事項",
      text: `達成率${result["達成%"]},差異金額${result[diffKey]},日均銷${avg}, ${Array.isArray(accSellData) ? accSellData.filter(item => typeof item === 'string' ? !item.endsWith('N/A') : true).join(", ") : ""}`,
      icon: "success",
    });
  }

  return $("<button>")
    .addClass(store.name)
    .text(store.name)
    .css("cursor", "pointer")
    .on("click", () => handleClick(area, store));
}

export { storeButton };
