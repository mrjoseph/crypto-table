export const calculateIncrease = (openingPrice, currentPrice) => {
  const increase = currentPrice - openingPrice;
  return ((increase / openingPrice) * 100).toFixed(3);
};
export const calculateDecrease = (openingPrice, currentPrice) => {
  const decrease = openingPrice - currentPrice;
  return ((decrease / openingPrice) * 100).toFixed(3);
};

export const valueChange = (currentPrice, openingPrice) => {
  return currentPrice >= openingPrice
    ? `${calculateIncrease(openingPrice, currentPrice)}`
    : `-${calculateDecrease(openingPrice, currentPrice)}`;
};

export const sortBy = (arr, dir, sortDataBy) => {
  const { DISPLAY, RAW } = arr;
  if (dir) {
    return {
      DISPLAY,
      RAW: RAW.sort(
        (a, b) => parseFloat(a[sortDataBy]) - parseFloat(b[sortDataBy])
      ),
    };
  }
  return {
    DISPLAY,
    RAW: RAW.sort(
      (a, b) => parseFloat(b[sortDataBy]) - parseFloat(a[sortDataBy])
    ),
  };
};

export const api = async (baseUrl, fsyms, tsyms) => {
  const url = `${baseUrl}fsyms=${fsyms.join()}&tsyms=${tsyms}`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const parseData = (data, currency) => {
  const RAW = Object.keys(data.RAW).map((coin) => ({
    COINNAME: coin,
    ...data.RAW[coin][currency],
  }));
  const DISPLAY = Object.keys(data.DISPLAY).map((coin) => ({
    COINNAME: coin,
    ...data.DISPLAY[coin][currency],
  }));
  const updatedRAW = RAW.map(({ PRICE, OPENDAY, ...rest }) => ({
    PRICE,
    OPENDAY,
    PERCENTAGECHANGE: valueChange(PRICE, OPENDAY),
    ...rest,
  }));
  const result = sortBy({ RAW: updatedRAW, DISPLAY }, true, "PERCENTAGECHANGE");
  return result;
};
