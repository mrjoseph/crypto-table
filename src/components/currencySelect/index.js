import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SimpleSelect = ({ handleChange, currency }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(currency);
  const handleSelect = (event) => {
    setValue(event.target.value);
    handleChange(event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={(e) => handleSelect(e)}
          inputProps={{ "data-testid": "select-currency" }}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="GBP">GBP</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="CHF">CHF</MenuItem>
          <MenuItem value="AUD">AUD</MenuItem>
          <MenuItem value="JPY">JPY</MenuItem>
          <MenuItem value="CAD">CAD</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default SimpleSelect;
