import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#34445c",
      },
      secondary: {
        main: '#eb1b44',
      },
    },
});

export default function Theme(props: any) {
    return (
      <ThemeProvider theme={theme}>
           {props.children}
      </ThemeProvider>
    );
  }