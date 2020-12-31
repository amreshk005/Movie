import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { fetchData } from "../redux/action";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
  media: {
    height: 140,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    border: "1px solid #000",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Movie(props) {
  const classes = useStyles();
  const [query, setQuery] = useState("superman");
  const [page, setPage] = useState(1);

  useEffect(() => {
    props.fetchData({ query: "superman", page: 1 });
  }, []);
  const handleChange = (event, page) => {
    props.fetchData({ query: query, page: page });
  };
  const handleInput = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (event) => {
    if (event.charCode === 13) {
      setPage(1);
      props.fetchData({ query: query, page: 1 });
    }
  };
  console.log(query);
  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={handleInput}
          onKeyPress={handleSubmit}
        />
      </div>
      <Grid container spacing={3}>
        {!props.data ? (
          <div> Loading...</div>
        ) : (
          <>
            {props.data.map((e) => (
              <Grid item xs={6} sm={3} md={3}>
                <Paper className={classes.paper}>
                  <Card style={{ height: "100%" }}>
                    <CardActionArea>
                      <CardMedia className={classes.media} image={e.Poster} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {e.Title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Paper>
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <Pagination defaultPage={page} count={100} shape="rounded" onChange={handleChange} style={{ marginTop: "80px" }} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (payload) => dispatch(fetchData(payload)),
  };
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    data: state.data.Search,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
