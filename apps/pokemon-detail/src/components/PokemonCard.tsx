import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";

interface PokemonCardProps {
  name: string;
  image: string;
}

const PokemonCard = ({ name, image }: PokemonCardProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, textAlign: "center", boxShadow: 5, borderRadius: 3 }}>
        <CardMedia component="img" height="200" image={image} alt={name} />
        <CardContent>
          <Typography variant="h5">{name.toUpperCase()}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PokemonCard;
