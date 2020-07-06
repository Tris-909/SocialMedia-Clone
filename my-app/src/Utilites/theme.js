export default {
    palette: {
      primary: {
        light: '#33c9dc',
        main: '#00bcd4',
        dark: '#008394',
        navbarColor: '#33312a',
        contrastText: '#fff'
      },
      secondary: {
        ligh: "#ff6333",
        main: "#f51d4c",
        dark: "#b22a00",
        contrastText: '#fff'  
      }
    },
    typography: {
      useNextVariants: true
    },
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: '#33312a'
        }
      },
      containedPrimary	: {
          backgroundColor: '#33312a'
      }
    }
}