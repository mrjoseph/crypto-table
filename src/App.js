import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import SimpleSelect from "./components/currencySelect";
import { api, parseData } from "./utils/utils";
import TableBodyComponent from "./components/tableBody";
import TableHeader from "./components/tableHeader";
import { useSelect } from "./hooks/useSelect";

const useStyles = makeStyles({
  odd: {
    backgroundColor: "#f6f8fa",
  },
  even: {
    backgroundColor: "#ffffff",
  },
  container: {
    maxWidth: 650,
    margin: "0 auto",
    marginTop: "30px",
  },
  tableHeader: {
    fontWeight: 700,
  },
});

const App = () => {
  const baseUrl = `https://min-api.cryptocompare.com/data/pricemultifull?`;
  const fsyms = ["BTC,ETH,LTC,XRP,BCH,BNB,DOT,BSV,EOS,DAI,AR"];
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const {
    handleSortByPrice,
    handleSortByOpenDay,
    handleSortByChange,
    sortByPrice,
    sortByOpenDay,
    sortByOpenChange,
  } = useSelect(data, setData);

  const [currency, setCurrency] = useState("USD");

  const alternateClass = (index) => (index % 2 ? classes.odd : classes.even);

  const fetchData = useCallback(
    async (cur) => {
      try {
        const response = await api(baseUrl, fsyms, cur);
        return setData(parseData(response, cur));
      } catch (e) {
        setError("Something went wrong");
      }
    },
    [baseUrl, fsyms]
  );

  const handleChange = (cur) => {
    setCurrency(cur);
    fetchData(cur);
  };

  useEffect(() => {
    if (!data) fetchData(currency);
  }, [data, currency, fetchData]);
  if (data && data.RAW) {
    return (
      <TableContainer component={Paper} className={classes.container}>
        <SimpleSelect handleChange={handleChange} currency={currency} />
        <Table className={classes.table} aria-label="simple table">
          <TableHeader
            tsyms={currency}
            sortByPrice={sortByPrice}
            sortByOpenDay={sortByOpenDay}
            sortByOpenChange={sortByOpenChange}
            handleSortByPrice={handleSortByPrice}
            handleSortByOpenDay={handleSortByOpenDay}
            handleSortByChange={handleSortByChange}
          ></TableHeader>
          <TableBodyComponent
            RAW={data.RAW}
            DISPLAY={data.DISPLAY}
            alternateClass={alternateClass}
          ></TableBodyComponent>
        </Table>
      </TableContainer>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return null;
};

export default App;
