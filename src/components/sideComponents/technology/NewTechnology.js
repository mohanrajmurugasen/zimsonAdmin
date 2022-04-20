import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../../../assets/css/category.css";
import authaxios from "../../interceptors/authaxios";
import TechnologyTable from "./TechnologyTable";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    maxWidth: 400,
    boxShadow: "none",
    border: "1px solid #0f59538a",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function NewTechnology() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [vals, setvals] = useState(true);

  const technology = useSelector(
    (state) => state.addTechnology.technology.technology
  );

  const [csvData, setcsv] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && technology !== null) {
      setcsv(technology);
    }

    return () => {
      isMounted = false;
    };
  }, [technology]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setname("");
  };

  const submit = async () => {
    await authaxios
      .post("/Technologys", {
        technologyName: name,
      })
      .then((res) => {
        setOpen(false);
        setname("");
        setvals(!vals);
      })
      .catch((err) => console.error(err.message));
  };

  const [search, setsearch] = useState("");
  const searchs = (e) => {
    setsearch(e.target.value);
  };
  return (
    <div>
      <div className="top">
        <div>
          <h3>Technology</h3>
        </div>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              href="/getting-started/installation/"
              onClick={handleClick}
            >
              KolAppService
            </Link>
            <Typography color="textPrimary">Technology</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            <h5>Technology List</h5>
          </div>
          <div className="filter">
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Filter Technology Name"
                inputProps={{ "aria-label": "Filter Technology Name" }}
                value={search}
                onChange={(e) => searchs(e)}
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                style={{ color: "#0f5953" }}
                className={classes.iconButton}
                aria-label="directions"
              >
                <FilterListIcon />
              </IconButton>
            </Paper>
          </div>
          <div>
            <Button
              onClick={handleOpen}
              style={{ backgroundColor: "#0f5953" }}
              variant="contained"
              color="primary"
            >
              <AddIcon className="me-2" />
              Add
            </Button>
          </div>
          <div>
            <Button
              style={{ backgroundColor: "#0f5953" }}
              variant="contained"
              color="primary"
            >
              <LocalPrintshopIcon className="me-2" />
              <CSVLink
                data={csvData}
                filename={"Technology.csv"}
                style={{ color: "white", textDecoration: "none" }}
              >
                CSV
              </CSVLink>
            </Button>
          </div>
        </div>
        <TechnologyTable search={search} vals={vals} setvals={setvals} />
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade style={{ width: "40%" }} in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Add Technology</h2>
              <div className="middle">
                <p>Technology Name</p>
                <input
                  type={"text"}
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter Technology Name"
                />
              </div>
              <div className="deletess">
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  onClick={submit}
                  style={{
                    backgroundColor:
                      name !== "" ? "#0f5953" : "rgb(15 89 83 / 72%)3",
                    color: name !== "" ? "white" : "#adb5bd",
                  }}
                  variant="contained"
                  disabled={name !== "" ? false : true}
                >
                  Add
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
