import { useState, lazy, Suspense } from "react";
import {
  Box,
  Button,
  TextField,
  Switch,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import squirtleImage from "./assets/squirtle.png";
import PokemonList from "./components/PokemonList";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#B71C1C" }, // Rojo Pokédex
    secondary: { main: "#FBC02D" }, // Amarillo dorado
    background: { default: "#E0E0E0" }, // Gris metálico
    text: { primary: "#212121", secondary: "#B71C1C" },
  },
  typography: {
    fontFamily: "Aero, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#B71C1C" },
    secondary: { main: "#FBC02D" },
    background: { default: "#000000" }, // Azul oscuro digital
    text: { primary: "#FFFFFF", secondary: "#FBC02D" },
  },
  typography: {
    fontFamily: "Aero, sans-serif",
  },
});

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  background: theme.palette.background.default,
}));

const Layout = styled(Box)({
  display: "flex",
  width: "100vw",
  height: "100vh",
});

const PokemonListContainer = styled(Box)({
  flex: 3, // Ocupa el 75% del espacio
  display: "flex",// Ocupa la mayor parte del espacio
  overflowY: "auto",
  flexDirection: "column"
});


const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: "15px",
  width: "90%",
  maxWidth: "300px",
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  borderRadius: "15px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));



const PokemonHistory = lazy(() => import("pokemonHistory/PokemonHistory"));

const PokedexApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleIngresar = () => {
    if (!name.trim()) {
      setError(true);
    } else {
      setError(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Layout>
          <PokemonListContainer>
            <PokemonList name={name} darkMode={darkMode} setDarkMode={setDarkMode} />
          </PokemonListContainer>
          
            <Suspense fallback={<Typography>Cargando Historial...</Typography>}>
              <PokemonHistory />
            </Suspense>
          
        </Layout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Typography variant="h5" fontWeight="bold" color="primary">
          Pokédex Ingreso
        </Typography>

        <Card
          sx={{
            overflow: "hidden",
            margin: 0,
            background: "#E0E0E0",
            boxShadow: "unset",
          }}
        >
          <CardMedia component="img" image={squirtleImage} alt="Squirtle" />
        </Card>

        <Box display="flex" alignItems="center" gap={1} marginBottom={2}>
          <Typography variant="body1" color="textPrimary">
            Modo Oscuro
          </Typography>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>

        <TextField
          label="Ingrese su nombre"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            maxWidth: "300px",
            marginTop: "10px",
            backgroundColor: darkMode ? "#333" : "#FFF",
            borderRadius: "10px",
          }}
          InputProps={{
            style: { color: darkMode ? "#fff" : "#000" },
          }}
          error={error}
          helperText={error ? "Por favor, ingrese su nombre" : ""}
        />

        <StyledButton onClick={handleIngresar}>Ingresar</StyledButton>
      </Container>
    </ThemeProvider>
  );
};

export default PokedexApp;
