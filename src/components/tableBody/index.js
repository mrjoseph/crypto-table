import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const TableBodyComponent = ({ RAW, DISPLAY, alternateClass }) => (
  <TableBody>
    {RAW.map(({ COINNAME, PRICE, PERCENTAGECHANGE }, index) => (
      <TableRow key={PRICE} className={alternateClass(index)}>
        <TableCell component="th" scope="row">
          {COINNAME}
        </TableCell>
        <TableCell align="right">
          {DISPLAY.find((el) => el.COINNAME === COINNAME).PRICE}
        </TableCell>

        <TableCell align="right">
          {DISPLAY.find((el) => el.COINNAME === COINNAME).OPENDAY}
        </TableCell>
        <TableCell align="right">
          {` ${PERCENTAGECHANGE}% (${
            DISPLAY.find((el) => el.COINNAME === COINNAME).CHANGEDAY
          })`}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default TableBodyComponent;
