import { useState, lazy, Suspense } from "react";
import { ThemeProvider, CssBaseline, CircularProgress, Box } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import PokemonList from "./pages/PokemonList";
import Navbar from "./components/Navbar"; // Nuevo componente Navbar
import { AnimatePresence, motion } from "framer-motion";

// Cargar microfrontends de forma asíncrona
const PokemonHistory = lazy(() => import("pokemonHistory/PokemonHistory"));
const PokemonDetail = lazy(() => import("pokemonDetail/PokemonDetail"));

// Componente para rutas protegidas
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Login />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/pokemon-list" element={<PrivateRoute><PokemonList /></PrivateRoute>} />
              <Route 
                path="/pokemon/:id" 
                element={
                  <PrivateRoute>
                    <Suspense fallback={<Loading />}>
                      <PokemonDetail />
                    </Suspense>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/history" 
                element={
                  <Suspense fallback={<Loading />}>
                    <PokemonHistory />
                  </Suspense>
                } 
              />
            </Routes>
          </AnimatePresence>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

// Nuevo componente de carga
const Loading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
    <CircularProgress />
  </Box>
);

// Nueva pantalla de bienvenida animada
const Home = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h1>Bienvenido a la Pokédex</h1>
  </motion.div>
);

export default App;
