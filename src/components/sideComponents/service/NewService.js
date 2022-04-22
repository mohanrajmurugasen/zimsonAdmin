import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../../../assets/css/category.css";
import authaxios from "../../interceptors/authaxios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { serviceProduct } from "../../../redux/actions/action";
import { Col, Row } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { CSVLink } from "react-csv";
import ServiceTable from "./ServiceTable";

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
    border: "1px solid black",
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

export default function NewService() {
  const classes = useStyles();
  const [location, setlocation] = useState([]);
  const [quality, setquality] = useState([]);
  const [value, setvalue] = useState("");
  const [vals, setvals] = useState(true);

  const technology = useSelector(
    (state) => state.addTechnology.technology.service
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

  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    authaxios
      .get("location")
      .then((res) => {
        if (isMounted) {
          setlocation(res.data);
        }
      })
      .catch((err) => console.error(err.message));
    authaxios
      .get("quality")
      .then((res) => {
        if (isMounted) {
          setquality(res.data);
        }
      })
      .catch((err) => console.error(err.message));
    return () => {
      isMounted = false;
    };
  }, []);

  const [search, setsearch] = useState("");
  const searchs = (e) => {
    setsearch(e.target.value);
  };

  return (
    <div>
      <div className="top">
        <div>
          <h3>Service</h3>
        </div>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="inherit"
              href="/getting-started/installation/"
              onClick={handleClick}
            >
              ZimsonService
            </Link>
            <Typography color="textPrimary">Service</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            <h5>Service List</h5>
          </div>
          <div className="filter">
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Filter Location"
                inputProps={{ "aria-label": "Filter Technology Name" }}
                value={search}
                onChange={(e) => searchs(e)}
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                style={{ color: "black" }}
                className={classes.iconButton}
                aria-label="directions"
              >
                <FilterListIcon />
              </IconButton>
            </Paper>
          </div>
          <div>
            <Button
              style={{ backgroundColor: "black" }}
              variant="contained"
              color="primary"
            >
              <LocalPrintshopIcon className="me-2" />
              <CSVLink
                data={csvData}
                filename={"Service.csv"}
                style={{ color: "white", textDecoration: "none" }}
              >
                Download CSV
              </CSVLink>
            </Button>
          </div>
        </div>
        <div>
          <Row>
            <Col lg={4} md={4} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={location}
                getOptionLabel={(options) => options.name}
                onChange={(event, newValue) => {
                  dispatch(
                    serviceProduct({
                      type: "location",
                      val: newValue.name,
                    })
                  );
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Location" />
                )}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <TextField
                id="outlined-basic"
                label="Enter Receipt No."
                variant="outlined"
                sx={{ width: "100%", marginBottom: "10px" }}
                value={value}
                onChange={(e) => {
                  setvalue(e.target.value);
                  dispatch(
                    serviceProduct({
                      type: "receipt",
                      val: e.target.value,
                    })
                  );
                }}
              />
            </Col>
            <Col lg={4} md={4} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={quality}
                getOptionLabel={(options) => options.val}
                onChange={(event, newValue) => {
                  dispatch(
                    serviceProduct({
                      type: "quality",
                      val: newValue.val,
                    })
                  );
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Quality" />
                )}
              />
            </Col>
          </Row>
        </div>
        <ServiceTable search={search} setvals={setvals} vals={vals} />
      </div>
    </div>
  );
}
