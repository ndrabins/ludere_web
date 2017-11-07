import { createMuiTheme } from 'material-ui/styles';
// import colors from './constants/colors';

import lightBlue from 'material-ui/colors/lightBlue';
import orange from 'material-ui/colors/orange';
// import cyan from 'material-ui/colors/cyan';
import red from 'material-ui/colors/red';

//https://material-ui-next.com/customization/themes/
export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      ...lightBlue,
    }, // Purple and green play nicely together.
    secondary: {
      ...orange,
    },
    error: red,
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});
