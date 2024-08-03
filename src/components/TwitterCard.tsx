import { useState } from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import { TwitterCardProps } from "../interface/TwitterCardProps";

function TwitterCard({ name, userName, initialIsFollowing } : TwitterCardProps ) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const text = isFollowing ? 'Siguiendo' : 'Seguir';
  const color = isFollowing ? 'success' : 'primary';

  function cambiarEstado(){
    setIsFollowing(!isFollowing)
  }

  return (
    <Card sx={{ display: "flex", maxWidth: 500, p: 2 }} elevation={0}>
        <Box sx={{ margin: "auto" }}>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </Box>
        <Box>
          <Typography sx={{ display: 'inline' }} gutterBottom variant="h5" component="div">
          { name }
          </Typography>
          <Typography color="text.secondary" variant="body2">
            @{ userName }
          </Typography>
        </Box>
        <Box sx={{ margin: "auto" }}>
          <Button sx={{ borderRadius: 5 }} variant="contained" color={color} onClick={cambiarEstado}>
            { text }
          </Button>
        </Box>
    </Card>
  );
}

export default TwitterCard;
