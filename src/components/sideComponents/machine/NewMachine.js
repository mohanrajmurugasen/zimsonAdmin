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
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useSelector } from "react-redux";
import MachineTable from "./MachineTable";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { CSVLink } from "react-csv";

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

export default function NewMachine() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [sites, setsites] = useState([]);
  const [sitesId, setsitesId] = useState("");
  const [machine, setmachine] = useState("");
  const [machineType] = useState([
    { type: "Multi-Pack", val: "M" },
    { type: "Primary-Pack", val: "P" },
  ]);
  const [vals, setvals] = useState(true);

  const technology = useSelector(
    (state) => state.addTechnology.technology.machine
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

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authaxios
        .get("Sites")
        .then((res) => {
          if (isMounted) setsites(res.data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setname("");
    setmachine("");
  };

  const submit = async () => {
    await authaxios
      .post("/Machines", {
        machineName: name,
        siteId: sitesId,
        machineType: machine,
      })
      .then((res) => {
        setOpen(false);
        setname("");
        setmachine("");
        setvals(!vals);
      })
      .catch((err) => alert("Already exist"));
  };

  const [search, setsearch] = useState("");
  const searchs = (e) => {
    setsearch(e.target.value);
  };
  return (
    <div>
      <div className="top">
        <div>
          <h3>Machine</h3>
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
            <Typography color="textPrimary">Machine</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            <h5>Machine List</h5>
          </div>
          <div className="filter">
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Filter Machine Name"
                inputProps={{ "aria-label": "Filter Machine Name" }}
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
                filename={"Machine.csv"}
                style={{ color: "white", textDecoration: "none" }}
              >
                CSV
              </CSVLink>
            </Button>
          </div>
        </div>
        <MachineTable search={search} setvals={setvals} vals={vals} />
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
              <h2 id="transition-modal-title">Add Machine</h2>
              <div className="middles">
                <p>Machine Name</p>
                <input
                  type={"text"}
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter Machine Name"
                  className="mb-4 input"
                />
                <p>Site</p>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={sites}
                  getOptionLabel={(options) => options.siteName}
                  onChange={(event, newValue) => {
                    setsitesId(newValue.id);
                  }}
                  sx={{ width: "100%", marginBottom: "25px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Choose site" />
                  )}
                />
                <p>Machine Type</p>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={machineType}
                  getOptionLabel={(options) => options.type}
                  onChange={(event, newValue) => {
                    setmachine(newValue.val);
                  }}
                  sx={{ width: "100%", marginBottom: "25px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Choose MachineType" />
                  )}
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
                      name !== "" && machine !== "" && sitesId !== ""
                        ? "#0f5953"
                        : "rgb(15 89 83 / 72%)3",
                    color:
                      name !== "" && machine !== "" && sitesId !== ""
                        ? "white"
                        : "#adb5bd",
                  }}
                  variant="contained"
                  disabled={
                    name !== "" && machine !== "" && sitesId !== ""
                      ? false
                      : true
                  }
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
