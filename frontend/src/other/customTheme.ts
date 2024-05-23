import { createTheme, PaletteColor, SimplePaletteColorOptions, ThemeProvider } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    c_orange: PaletteColor,
    c_gray: PaletteColor;
  }

  interface PaletteOptions {
    c_orange?: SimplePaletteColorOptions,
    c_gray?: SimplePaletteColorOptions;
  }
}
const flags = {
    c_orange: true, c_gray: true
};
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    c_orange: true, c_gray: true;
  }
}
declare module "@mui/material/Box" {
  interface BoxPropsColorOverrides {
    c_orange: true, c_gray: true;
  }
}


const customTheme = createTheme({
  palette: {
    mode: "dark",
    c_orange: {
      main: "#D93900"
    },
    c_gray: {
      main: "#555555"
    }
  },
  components: {
    
  }
});

export default customTheme;