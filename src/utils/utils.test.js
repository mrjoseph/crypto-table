import { valueChange, api, parseData, sortBy } from "./utils";
import mockReturnValueOnce from "../mockResponse.json";

global.fetch = jest.fn();
describe("valueChange", () => {
  it("should calculate the difference between 340.07, 339.92 and return a object with percentage and price", () => {
    const openingPrice = 11354.4;
    const currentPrice = 11058.7;
    const expected = "-2.604";

    expect(valueChange(currentPrice, openingPrice)).toEqual(expected);
  });
  it("should calculate the difference between 35.62, 36.02 and return a object with percentage and price", () => {
    const currentPrice = 35.62;
    const openingPrice = 36.02;
    const expected = "-1.110";

    expect(valueChange(currentPrice, openingPrice)).toEqual(expected);
  });
  it("should calculate the difference between 10610.98, 106002 and return a object with percentage and price", () => {
    const currentPrice = 10610.98;
    const openingPrice = 10600;
    const expected = "0.104";
    expect(valueChange(currentPrice, openingPrice)).toEqual(expected);
  });
});

describe("api", () => {
  const baseUrl = `https://min-api.cryptocompare.com/data/pricemultifull?`;
  const fsyms = ["BTC", "ETH", "LTC"];
  const tsyms = ["USD", "EUR"];

  describe("for a successful response", () => {
    it("should call the api end point and return a data", async () => {
      const options = {
        method: "GET",
      };

      fetch.mockReturnValueOnce({
        ok: true,
        json: jest.fn(() => mockReturnValueOnce),
        headers: {
          get: () => "application/json;",
        },
      });
      const result = await api(baseUrl, fsyms, tsyms, options);
      expect(result).toEqual(mockReturnValueOnce);
    });
  });
});

describe("parseData", () => {
  it("should extract the correct shape from the response", () => {
    const data = {
      RAW: {
        BTC: {
          USD: {
            PRICE: 11331.8,
            OPENDAY: 40.42,
          },
        },
        ETH: {
          USD: {
            PRICE: 374.37,
            OPENDAY: 40.42,
          },
        },
        LTC: {
          USD: {
            PRICE: 49.37,
            OPENDAY: 40.42,
          },
        },
      },
      DISPLAY: {
        BTC: {
          USD: {
            PRICE: "$ 11,331.8",
          },
        },
        ETH: {
          USD: {
            PRICE: "$ 374.37",
          },
        },
        LTC: {
          USD: {
            PRICE: "$ 49.37",
          },
        },
      },
    };

    const expected = {
      DISPLAY: [
        {
          PRICE: "$ 11,331.8",
          COINNAME: "BTC",
        },
        {
          PRICE: "$ 374.37",
          COINNAME: "ETH",
        },
        {
          PRICE: "$ 49.37",
          COINNAME: "LTC",
        },
      ],
      RAW: [
        {
          COINNAME: "LTC",
          OPENDAY: 40.42,
          PERCENTAGECHANGE: "22.143",
          PRICE: 49.37,
        },
        {
          PRICE: 374.37,
          COINNAME: "ETH",
          PERCENTAGECHANGE: "826.200",
          OPENDAY: 40.42,
        },
        {
          COINNAME: "BTC",
          OPENDAY: 40.42,
          PERCENTAGECHANGE: "27935.131",
          PRICE: 11331.8,
        },
      ],
    };

    expect(parseData(data, "USD")).toEqual(expected);
  });
});

describe("sortBy", () => {
  const arr = {
    RAW: [
      {
        PRICE: 30,
      },
      {
        PRICE: 10,
      },
      {
        PRICE: 20,
      },
    ],
    DISPLAY: [
      {
        PRICE: "$ 10",
      },
      {
        PRICE: "$ 20",
      },
      {
        PRICE: "$ 30",
      },
    ],
  };
  it("should sort the price change in desc order", () => {
    const expected = {
      RAW: [
        {
          PRICE: 10,
        },
        {
          PRICE: 20,
        },
        {
          PRICE: 30,
        },
      ],
      DISPLAY: [
        {
          PRICE: "$ 10",
        },
        {
          PRICE: "$ 20",
        },
        {
          PRICE: "$ 30",
        },
      ],
    };
    expect(sortBy(arr, true, "PRICE")).toEqual(expected);
  });
  it("should sort the price change in asc order", () => {
    const expected = {
      RAW: [
        {
          PRICE: 30,
        },
        {
          PRICE: 20,
        },
        {
          PRICE: 10,
        },
      ],
      DISPLAY: [
        {
          PRICE: "$ 10",
        },
        {
          PRICE: "$ 20",
        },
        {
          PRICE: "$ 30",
        },
      ],
    };
    expect(sortBy(arr, false, "PRICE")).toEqual(expected);
  });
});
