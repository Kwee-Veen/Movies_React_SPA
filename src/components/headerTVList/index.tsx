import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MenuOptions } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";
import { TVContext } from "../../contexts/tvContext";
import { PagesContext } from "../../contexts/pagesContext";
import { Unstable_NumberInput as NumberInput } from '@mui/base';

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
    },
};

interface HeaderProps {
    title: string;
    increment?: Function;
    decrement?: Function;
    showGenreSearch: boolean;
}

const TVHeader: React.FC<HeaderProps> = (headerProps) => {
    const navigate = useNavigate();
    const genres: MenuOptions[] = useContext(TVContext).tvGenres;
    const title = headerProps.title;
    let increment: Function | null = null;
    if (headerProps.increment !== undefined) increment = headerProps.increment
    let decrement: Function | null = null;
    if (headerProps.decrement !== undefined) decrement = headerProps.decrement
    const showGenreSearch = headerProps.showGenreSearch;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const open = Boolean(anchorEl);
    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    // TODO 3b: Optional - also pass in a third parameter, whether it's discover or trending or upcoming (for tv only) 
    // TODO 5: UI, have it not displace the page title as jankily
    // FIX 1: Display the name of the genre on the tvByGenrePage somewhere. Maybe add another element to 'state' on line 85
    
    const { setTVByGenrePageCount } = useContext(PagesContext);

    const handleGenreClick = (
      index: number,
      path: string
    ) => {
      setSelectedIndex(index);
      setAnchorEl(null);

      setTVByGenrePageCount(1);
      navigate(`/tv/genre/${path}`, { state:{genreId: path, voteAverage: voteAverage}} );
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const [voteAverage, setVoteAverage] = React.useState<number | undefined>(undefined);


    return (
        <Paper component="div" sx={styles.root}>
            {decrement &&
              <IconButton
                  aria-label="go back" onClick={() => { decrement(); }}
              >
                  <ArrowBackIcon color="primary" fontSize="large" />
              </IconButton>
            }

            <Typography variant="h4" component="h3">
                {title}
            </Typography>

            {showGenreSearch &&  <span>
                <List
                  component="nav"
                >
                  <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="Search by Genre"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{ bgcolor: 'lavender', borderRadius: 2, maxHeight: 55, }}
                  >
                    <ListItemText
                      primary="Genre Search"
                      secondary={genres[selectedIndex].label}
                    />
                  </ListItemButton>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                  }}
                >
                  {genres.map((genre, index) => (
                    <MenuItem
                      key={genre.label}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={() => handleGenreClick(index, genre.path)}
                    >
                      {genre.label}
                    </MenuItem>
                  ))}
                </Menu>
              </span>}

              <NumberInput
                aria-label="Demo number input"
                placeholder="Minimum Vote"
                min={0}
                max={10}
                step={0.5}
                onChange={(event, val) => setVoteAverage(val)}
              />

              Vote Average: {voteAverage}

              {/* {showGenreSearch &&  <span>
                <List
                  component="nav"
                >
                  <ListItemButton
                    id="lock-button"
                    aria-haspopup="listbox"
                    aria-controls="lock-menu"
                    aria-label="Search by Average Vote"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickListItem}
                    sx={{ bgcolor: 'lavender', borderRadius: 2, maxHeight: 55, }}
                  >
                    <ListItemText
                      primary="Genre Search"
                      secondary={genres[selectedIndex].label}
                    />
                  </ListItemButton>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                  }}
                >
                  {genres.map((genre, index) => (
                    <MenuItem
                      key={genre.label}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(index, genre.path)}
                    >
                      {genre.label}
                    </MenuItem>
                  ))}
                </Menu>
              </span>} */}

            {increment &&
                <IconButton
                  aria-label="go forward"  onClick={() => { increment(); }}
              >
                  <ArrowForwardIcon color="primary" fontSize="large"/>
              </IconButton>
            }
        </Paper>
    );
};

export default TVHeader;