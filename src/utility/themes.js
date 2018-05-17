import { createMuiTheme } from "@material-ui/core/styles";
// import colors from './constants/colors';

import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";
// import cyan from '@material-ui/core/colors/cyan';
import red from "@material-ui/core/colors/red";

//https://@material-ui/core-next.com/customization/themes/
export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      ...lightBlue
    }, // Purple and green play nicely together.
    secondary: {
      ...orange
    },
    error: red
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 7
      }
    }
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark" // Switching the dark mode on is a single property value change.
  }
});
