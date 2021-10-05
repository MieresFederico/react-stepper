import { Card, CardContent, Container, Grid } from "@mui/material";
import React, { ReactNode } from "react";
import { Header } from "../Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Container maxWidth="md">
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </Container>
      </Grid>
    </Grid>
  );
};
