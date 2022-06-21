import { PaletteMode } from "@mui/material";
import { amber, deepOrange, green, grey, lightGreen } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: lightGreen,
            divider: lightGreen,
            text: {
              primary: lightGreen,
              secondary: lightGreen,
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
          }),
    },
  });