import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png';
import { BaseTVProps } from "../../types/interfaces";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { TVContext } from "../../contexts/tvContext";
import { AuthContext } from "../../contexts/authContext";

const styles = {
  card: { maxWidth: 345, borderRadius: 10, outline: 5, outlineColor: "white" },
  cardHeader: {minHeight: 60},
  media: { height: 500, borderRadius: 8},
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface TVCardProps {
  tv: BaseTVProps;
  action: (m: BaseTVProps) => React.ReactNode;
}

const TVCard: React.FC<TVCardProps> = ({ tv, action }) => {

  const { tvFavouriteIDs } = useContext(TVContext);
  const { token } = useContext(AuthContext) || {};
  
  let isFavourite: Boolean = false;
  if (token) isFavourite = tvFavouriteIDs?.find((id) => id === tv.id) ? true : false;

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p" align="right">
            {tv.name}&nbsp;
          </Typography>
        }
        sx={styles.cardHeader}
      />
      <CardMedia
        sx={styles.media}
        image={
          tv.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tv.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container >
        <Grid item xs={6} style={{ display:'flex', justifyContent:'center' }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              &nbsp;{tv.vote_average}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ display:'flex', justifyContent:'center' }}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              &nbsp;{tv.first_air_date}&nbsp;&nbsp;&nbsp;
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing sx={{ marginTop: -2}} style={{justifyContent: 'center'}}>
        {/* Displays the add to favourites button only if logged in */}
        {token ? (action(tv)) : null}
        <Link to={`/tv/${tv.id}`}>
          <Button variant="contained" size="medium" color="error" style={{justifyContent: 'center'}}>
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export default TVCard;