import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

export default function TopBar(props) {
  const classes = useStyles();
  const { address, city, setAddress, setCity, placeMarkerSearch } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <form onSubmit={placeMarkerSearch}>
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            className={classes.input_boxes}
            value={address}
            onChange={e => setAddress(e.target.value)}
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="City"
            variant="outlined"
            className={classes.input_boxes}
            value={city}
            onChange={e => setCity(e.target.value)}
            size="small"
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </form>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  input_boxes: {
    margin: theme.spacing(1)
  }
}));
