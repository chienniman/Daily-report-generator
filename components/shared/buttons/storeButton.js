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

    function formatDifference(diff) {
      return diff.startsWith("--") ? diff.replace("--", "少") : "多" + diff;
    }

    result["差異金額\r\n(目標-達成)"] = formatDifference((result["差異金額\r\n(目標-達成)"]));
    Swal.fire({
      title: "後續追蹤事項",
      text: `
        達成率${result["達成%"]},差異金額${result["差異金額\r\n(目標-達成)"]},
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
