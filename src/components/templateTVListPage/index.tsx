import React from "react";
import TVHeader from "../headerTVList";
import Grid from "@mui/material/Grid";
import { TVListPageTemplateProps } from "../../types/interfaces";
import TVList from "../tvList";

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  }
};

const TVListPageTemplate: React.FC<TVListPageTemplateProps> = ({ tv, name, action, increment, decrement, showSearch }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <TVHeader title={name} increment={increment} decrement={decrement} showSearch={showSearch}/>
      </Grid>
      <Grid item container spacing={5}>
        <TVList action={action} tv={tv}></TVList>
      </Grid>
    </Grid>
  );
}
export default TVListPageTemplate;