import React from "react";
import { Container, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import RightHeader from "./RIghtHeader";
import "./Header.scss";

import Logo from "../../assets/png/instaclone.png";

export default function Header() {
  return (
    <div className="header">
      <Container>
        <Grid>
          <Grid.Column width={3} className="header__logo">
            <Link></Link>
            <Image src={Logo} alt="Instaclone" />
          </Grid.Column>
          <Grid.Column width={10}>
            <p>Buscador</p>
          </Grid.Column>
          <Grid.Column width={3}>
            <RightHeader />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
