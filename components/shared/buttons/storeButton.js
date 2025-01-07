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

    Swal.fire({
      title: "後續追蹤事項",
      text: `
        達成率${result["達成%"]},差異金額${result[diffKey]},
        ${getAccSellText(store.id)}`,
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
