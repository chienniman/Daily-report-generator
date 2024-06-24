import { groupedStores, productMap } from "/dataSets/pxMarts.js";

function generateFilter(PTDPNO, PRDTCODE) {
  const storeIds = Array.from(groupedStores.values()).flatMap((storeMap) =>
    Array.from(storeMap.keys())
  );
  const productIds = Array.from(productMap.keys());

  return storeIds.includes(PTDPNO) && productIds.includes(PRDTCODE);
}

function getfilteredData(array) {
  return array.filter((item) => {
    return generateFilter(Number(item[3]), item[5]);
  });
}

export { getfilteredData };
