import React from "react";
// import Navbar from "./Login";
import SNavbar from "./Navbar";
import { Box, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [botStatus, setBotStatus] = useState("stopped");

  const startBot = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/start-bot");
      console.log(response.data);
      setBotStatus("running");
    } catch (error) {
      console.error("Error starting bot:", error);
    }
  };

  const stopBot = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/stop-bot");
      console.log(response.data);
      setBotStatus("stopped");
    } catch (error) {
      console.error("Error stopping bot:", error);
    }
  };

  return (
    <div>
      <SNavbar />

      <Box component="main" sx={{ p: 2 }}>
        {/* <Toolbar /> */}

        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque suscipit tempora, sint quae quis quia qui at placeat earum aut tempore omnis adipisci voluptas? At, commodi minima. Quisquam, optio ducimus?





          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi eius omnis dolore mollitia fuga. Tenetur reprehenderit dolorum doloremque consectetur alias, consequatur ipsa dolor, dolorem molestias iure possimus ut modi iste.



          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, pariatur. Voluptates perferendis porro accusamus omnis, rem soluta, consequuntur animi ex, aliquid aut quae quibusdam earum iure! Quae aut voluptatibus assumenda.




          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa minima voluptatibus, quae fugit cupiditate sit dolores hic molestias nobis iusto. Consequatur nesciunt voluptatum ducimus nisi tenetur veniam consectetur maiores! Eaque.
        </h2>
      </Box>
    </div>
  );
};

export default Homepage;
