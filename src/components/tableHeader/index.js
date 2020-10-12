import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const TableHeader = ({
  sortByPrice,
  tsyms,
  sortByOpenDay,
  handleSortByOpenDay,
  sortByOpenChange,
  handleSortByChange,
  handleSortByPrice,
}) => (
  <TableHead>
    <TableRow>
      <TableCell>Coin Name</TableCell>

      <TableCell align="right">
        <TableSortLabel
          active={true}
          direction={sortByPrice ? "asc" : "desc"}
          onClick={() => handleSortByPrice("PRICE")}
          data-testid="sort-by-price"
        >
          Current Price ({tsyms})
        </TableSortLabel>
      </TableCell>
      <TableCell align="right">
        <TableSortLabel
          active={true}
          direction={sortByOpenDay ? "asc" : "desc"}
          onClick={() => handleSortByOpenDay("OPENDAY")}
          data-testid="sort-by-openday"
        >
          Opening price ({tsyms})
        </TableSortLabel>
      </TableCell>
      <TableCell align="right">
        <TableSortLabel
          active={true}
          direction={sortByOpenChange ? "asc" : "desc"}
          onClick={() => handleSortByChange("PERCENTAGECHANGE")}
          data-testid="sort-by-percentage-change"
        >
          price increase
        </TableSortLabel>
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
