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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { masProductLineProduct } from "../../../redux/actions/action";
import { Col, Row } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import LocalPrintshopIcon from "@material-ui/icons/LocalPrintshop";
import { CSVLink } from "react-csv";
import ReportsTable from "./ReportsTable";

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

export default function NewReports() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [CustomerId, setCustomerId] = useState([]);
  const [technologyId, settechnologyId] = useState([]);
  const [brandId, setbrandId] = useState([]);
  const [categoryId, setcategoryId] = useState([]);
  const [productId, setproductId] = useState([]);
  const [vals, setvals] = useState(true);

  const [tech, settech] = useState(null);
  const [pro, setpro] = useState(null);
  const [cus, setcus] = useState(null);
  const [cat, setcat] = useState(null);
  const [bra, setbra] = useState(null);

  const masProductLine = useSelector(
    (state) => state.addMasProductLine.masProductLine
  );

  const technology = useSelector(
    (state) => state.addTechnology.technology.productLine
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
      .get("Customers")
      .then((res) => {
        if (isMounted) {
          setCustomerId(res.data);
        }
      })
      .catch((err) => console.error(err.message));
    authaxios
      .get("Technologys")
      .then((res) => {
        if (isMounted) {
          settechnologyId(res.data);
        }
      })
      .catch((err) => console.error(err.message));
    authaxios
      .get("Brands")
      .then((res) => {
        if (isMounted) {
          setbrandId(res.data);
        }
      })
      .catch((err) => console.error(err.message));
    authaxios
      .get("Categorys")
      .then((res) => {
        if (isMounted) {
          setcategoryId(res.data);
        }
      })
      .catch((err) => console.error(err.message));
    authaxios
      .get("Products")
      .then((res) => {
        if (isMounted) {
          setproductId(res.data);
        }
      })
      .catch((err) => console.error(err.message));
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
  };

  const submit = async () => {
    await authaxios
      .post("/MasProductLines", {
        technologyId: masProductLine.technologyId,
        customerId: masProductLine.customerId,
        brandId: masProductLine.brandId,
        categoryId: masProductLine.categoryId,
        productId: masProductLine.productId,
        declaredWeight:
          name.slice(-1) === "g"
            ? `${name}G`
            : name.slice(-1) === "G"
            ? name
            : `${name}G`,
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
          <h3>Reports</h3>
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
            <Typography color="textPrimary">Reports</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            <h5>Reports List</h5>
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
              style={{
                backgroundColor:
                  cus !== null &&
                  bra !== null &&
                  tech !== null &&
                  cat !== null &&
                  pro !== null
                    ? "#0f5953"
                    : "rgb(15 89 83 / 72%)3",
                color:
                  cus !== null &&
                  bra !== null &&
                  tech !== null &&
                  cat !== null &&
                  pro !== null
                    ? "white"
                    : "#adb5bd",
              }}
              variant="contained"
              disabled={
                cus !== null &&
                bra !== null &&
                tech !== null &&
                cat !== null &&
                pro !== null
                  ? false
                  : true
              }
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
                filename={"ProductLine.csv"}
                style={{ color: "white", textDecoration: "none" }}
              >
                CSV
              </CSVLink>
            </Button>
          </div>
        </div>
        <div>
          <Row>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={technologyId}
                getOptionLabel={(options) => options.technologyName}
                onChange={(event, newValue) => {
                  settech(newValue.id);
                  dispatch(
                    masProductLineProduct({
                      type: "technologyId",
                      val: newValue.id,
                    })
                  );
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Technology" />
                )}
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={CustomerId}
                getOptionLabel={(options) => options.customerName}
                onChange={(event, newValue) => {
                  setcus(newValue.id);
                  dispatch(
                    masProductLineProduct({
                      type: "customerId",
                      val: newValue.id,
                    })
                  );
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Customer" />
                )}
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={brandId}
                getOptionLabel={(options) => options.brandName}
                onChange={(event, newValue) => {
                  setbra(newValue.id);
                  dispatch(
                    masProductLineProduct({
                      type: "brandId",
                      val: newValue.id,
                    })
                  );
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Brand" />
                )}
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categoryId}
                getOptionLabel={(options) => options.categoryName}
                onChange={(event, newValue) => {
                  setcat(newValue.id);
                  dispatch(
                    masProductLineProduct({
                      type: "categoryId",
                      val: newValue.id,
                    })
                  );
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Category" />
                )}
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={productId}
                getOptionLabel={(options) => options.productName}
                onChange={(event, newValue) => {
                  setpro(newValue.id);
                  dispatch(
                    masProductLineProduct({
                      type: "productId",
                      val: newValue.id,
                    })
                  );
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Product" />
                )}
              />
            </Col>
          </Row>
        </div>
        <ReportsTable search={search} setvals={setvals} vals={vals} />
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
              <h2 id="transition-modal-title">Add Declared Weight</h2>
              <div className="middle">
                <p>Declared Weight</p>
                <input
                  type={"text"}
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter Declared Weight"
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
