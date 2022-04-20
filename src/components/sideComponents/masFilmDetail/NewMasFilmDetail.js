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
import {
  masProductLineProduct,
  ProductIdProduct,
} from "../../../redux/actions/action";
import { Col, Row } from "react-bootstrap";
import MasFilmDetailTable from "./MasFilmDetailTable";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import Multiselect from "multiselect-react-dropdown";
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

export default function NewMasFilmDetail() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setname] = useState("");
  const [referenceWeight, setreferenceWeight] = useState("");
  const [underWeightSetting, setunderWeightSetting] = useState("");
  const [shelfLife, setshelfLife] = useState("");
  const [projNoCase, setprojNoCase] = useState("");
  const [packsPerCase, setpacksPerCase] = useState("");
  const [vals, setvals] = useState(true);

  const [dum, setdum] = useState([]);
  let join = dum.join(";");

  const [allergenList, setallergenList] = useState([]);
  const [packTypeId, setpackTypeId] = useState("");
  const packType = [
    { name: "Inner Pack", type: "I" },
    { name: "Multi Pack", type: "M" },
    { name: "Share Bag", type: "S" },
  ];
  const [CustomerId, setCustomerId] = useState([]);
  const [technologyId, settechnologyId] = useState([]);
  const [brandId, setbrandId] = useState([]);
  const [categoryId, setcategoryId] = useState([]);
  const [productId, setproductId] = useState([]);
  const [declareId, setdeclareId] = useState([]);
  const [weights, setweights] = useState(0);

  const [tech, settech] = useState(null);
  const [pro, setpro] = useState(null);
  const [cus, setcus] = useState(null);
  const [cat, setcat] = useState(null);
  const [bra, setbra] = useState(null);
  const [wei, setwei] = useState(null);
  const [flavourCategory, setflavourCategory] = useState([]);
  const [flavourCategoryId, setflavourCategoryId] = useState(0);
  const [flavourCode, setflavourCode] = useState([]);
  const [dumCode, setdumCode] = useState([]);
  let joinCode = dumCode.join(";");

  const [csvData, setcsv] = useState([]);

  const dispatch = useDispatch();
  const masProductLine = useSelector(
    (state) => state.addMasProductLine.masProductLine
  );
  const productIds = useSelector((state) => state.addProductId.productId);

  const technology = useSelector(
    (state) => state.addTechnology.technology.filmDetail
  );

  useEffect(() => {
    authaxios
      .get("FlavourCategorys")
      .then((res) => {
        setflavourCategory(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    authaxios
      .get(`FlavourCodesByFlavourCategoryId/${flavourCategoryId}`)
      .then((res) => {
        setflavourCode(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [flavourCategoryId]);

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
    authaxios
      .get("Allergens")
      .then((res) => {
        if (isMounted) {
          setallergenList(res.data);
        }
      })
      .catch((err) => console.error(err.message));
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    authaxios
      .get(
        `MasProductLineDetail/${masProductLine.technologyId}/${masProductLine.customerId}/${masProductLine.brandId}/${masProductLine.categoryId}/${masProductLine.productId}/0`
      )
      .then((res) => {
        setdeclareId(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [masProductLine]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    join = "";
    setname("");
    setprojNoCase("");
    setreferenceWeight("");
    setpacksPerCase("");
    setunderWeightSetting("");
    setdum([]);
    setshelfLife("");
    setpackTypeId("");
    setdumCode([]);
    setflavourCategoryId(0);
  };

  const height = window.innerHeight;

  const submit = async () => {
    await authaxios
      .post("/MasFilmDetails", {
        productLineId: Number(productIds),
        filmCode: `${name}`,
        referenceWeight: Number(referenceWeight),
        underWeightSetting: Number(underWeightSetting),
        shelfLife: Number(shelfLife),
        projNoCase: `${projNoCase}`,
        packsPerCase: Number(packsPerCase),
        allergenId: `${join}`,
        packType: `${packTypeId}`,
        flavourCategoryId: flavourCategoryId,
        flavourCode: `${joinCode}`,
      })
      .then((res) => {
        setOpen(false);
        setname("");
        setprojNoCase("");
        setreferenceWeight("");
        setpacksPerCase("");
        setunderWeightSetting("");
        setdum([]);
        setshelfLife("");
        setpackTypeId("");
        setdumCode([]);
        setflavourCategoryId(0);
        setvals(!vals);
      })
      .catch((err) => console.error(err.message));
  };

  const [search, setsearch] = useState("");
  const searchs = (e) => {
    setsearch(e.target.value);
  };

  const [msg, setmsg] = useState(true);

  useEffect(() => {
    authaxios
      .get(
        `MasProductLineId/${masProductLine.technologyId}/${masProductLine.customerId}/${masProductLine.brandId}/${masProductLine.categoryId}/${masProductLine.productId}/${weights}`
      )
      .then((res) => {
        // console.log(res.data);
        dispatch(ProductIdProduct(res.data));
      })
      .catch((err) => console.error(err.message));
  }, [masProductLine, weights, dispatch]);

  const [place, setplace] = useState(true);
  const [place2, setplace2] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (dum.length && isMounted) {
      setplace2(false);
    } else {
      setplace2(true);
    }
    return () => {
      isMounted = false;
    };
  }, [dum, msg]);

  useEffect(() => {
    let isMounted = true;
    if (dumCode.length && isMounted) {
      setplace(false);
    } else {
      setplace(true);
    }
    return () => {
      isMounted = false;
    };
  }, [dumCode, msg]);

  return (
    <div>
      <div className="top">
        <div>
          <h3>Film Detail</h3>
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
            <Typography color="textPrimary">Film Detail</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            <h5>Film Detail List</h5>
          </div>
          <div className="filter mb-2">
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Filter FilmCode"
                inputProps={{ "aria-label": "Filter FilmCode" }}
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
          <div className="mb-2">
            <Button
              onClick={handleOpen}
              style={{
                backgroundColor:
                  cus !== null &&
                  bra !== null &&
                  tech !== null &&
                  cat !== null &&
                  pro !== null &&
                  wei !== null
                    ? "#0f5953"
                    : "rgb(15 89 83 / 72%)3",
                color:
                  cus !== null &&
                  bra !== null &&
                  tech !== null &&
                  cat !== null &&
                  pro !== null &&
                  wei !== null
                    ? "white"
                    : "#adb5bd",
              }}
              variant="contained"
              disabled={
                cus !== null &&
                bra !== null &&
                tech !== null &&
                cat !== null &&
                pro !== null &&
                wei !== null
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
                filename={"FilmDetail.csv"}
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
                key={(options, index) => index}
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
                renderInput={(params) => {
                  return <TextField {...params} label="Choose Brand" />;
                }}
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
            <Col lg={3} md={6} sm={6} xs={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={declareId}
                getOptionLabel={(options) => options.declaredWeight}
                onChange={(event, newValue) => {
                  setwei(newValue.id);
                  setweights(newValue.declaredWeight);
                }}
                sx={{ width: "100%", marginBottom: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Choose Dc Weight" />
                )}
              />
            </Col>
            <Col lg={3} md={6} sm={6} xs={6}>
              <Button
                size="large"
                style={{ width: "100%", height: "56px", marginBottom: "10px" }}
                variant="outlined"
              >
                Product Line Id: {productIds}
              </Button>
            </Col>
          </Row>
        </div>
        <MasFilmDetailTable search={search} setvals={setvals} vals={vals} />
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
          <Fade
            style={{
              width: "70%",
              height: `${height - 100}px`,
              overflow: "scroll",
            }}
            in={open}
          >
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Add Film Detail</h2>
              <div className="middles">
                <Row>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Film Code</p>
                    <input
                      type={"text"}
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Enter FilmCode"
                      className="mb-4 input"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Project Number (If empty, enter NA)</p>
                    <input
                      type={"text"}
                      value={projNoCase}
                      onChange={(e) => setprojNoCase(e.target.value)}
                      placeholder="Enter ProjNoCase"
                      className="mb-4 input"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Reference Weight (Grams)</p>
                    <input
                      type={"number"}
                      value={referenceWeight}
                      onChange={(e) => setreferenceWeight(e.target.value)}
                      placeholder="Enter Reference Weight"
                      className="mb-4 input"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Packs Per Case</p>
                    <input
                      type={"number"}
                      value={packsPerCase}
                      onChange={(e) => setpacksPerCase(e.target.value)}
                      placeholder="Enter Packs Per Case"
                      className="mb-4 input"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Under Weight Setting (Grams)</p>
                    <input
                      type={"number"}
                      value={underWeightSetting}
                      onChange={(e) => setunderWeightSetting(e.target.value)}
                      placeholder="Enter Under Weight Setting"
                      className="mb-4 input"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Allergen List</p>
                    <div>
                      <Multiselect
                        placeholder={!place2 ? "" : "Choose Allergen"}
                        displayValue="allergenName"
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={(event, y) => {
                          var index = dum.indexOf(y.id);
                          if (index > -1) {
                            dum.splice(index, 1);
                          }
                          setmsg(!msg);
                        }}
                        onSearch={function noRefCheck() {}}
                        onSelect={(event, y) => {
                          setdum((dum) => [...dum, y.id]);
                        }}
                        options={allergenList}
                        showCheckbox
                        style={{
                          chips: {
                            background: "#0f5953",
                          },
                          multiselectContainer: {
                            color: "#0f5953",
                          },
                          searchBox: {
                            border: "1px solid #b5b5b5",
                            borderRadius: "4px",
                            height: "58.01px",
                            overflow: "auto",
                          },
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Shelf Life (Days)</p>
                    <input
                      type={"number"}
                      value={shelfLife}
                      onChange={(e) => setshelfLife(e.target.value)}
                      placeholder="Enter ShelfLife"
                      className="input mb-4"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Pack Type</p>
                    <div className="mb-4">
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={packType}
                        getOptionLabel={(options) => options.name}
                        onChange={(event, newValue) => {
                          setpackTypeId(newValue.type);
                        }}
                        sx={{ width: "100%", marginBottom: "10px" }}
                        renderInput={(params) => (
                          <TextField {...params} label="Choose Pack Type" />
                        )}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>Flavour Category (If empty choose NA from list)</p>
                    <div>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={flavourCategory}
                        getOptionLabel={(options) =>
                          options.flavourCategoryName
                        }
                        onChange={(event, newValue) => {
                          setflavourCategoryId(newValue.id);
                        }}
                        sx={{ width: "100%", marginBottom: "10px" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose Flavour Category"
                          />
                        )}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={16} xs={12}>
                    <p>
                      Flavour Code ( If Flavour Category is NA then choose NA )
                    </p>
                    <div>
                      <Multiselect
                        placeholder={!place ? "" : "Choose Flavour Code"}
                        displayValue="flavourCodeName"
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={(event, y) => {
                          var index = dumCode.indexOf(y.id);
                          if (index > -1) {
                            dumCode.splice(index, 1);
                          }
                          setmsg(!msg);
                        }}
                        onSearch={function noRefCheck() {}}
                        onSelect={(event, y) => {
                          setdumCode((dumCode) => [...dumCode, y.id]);
                        }}
                        options={flavourCode}
                        showCheckbox
                        style={{
                          chips: {
                            background: "#0f5953",
                          },
                          multiselectContainer: {
                            color: "#0f5953",
                          },
                          searchBox: {
                            border: "1px solid #b5b5b5",
                            borderRadius: "4px",
                            height: "58.01px",
                            overflow: "auto",
                          },
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="deletess mt-4">
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  onClick={submit}
                  style={{
                    backgroundColor:
                      name !== "" &&
                      projNoCase !== "" &&
                      referenceWeight !== "" &&
                      packsPerCase !== "" &&
                      underWeightSetting !== "" &&
                      dum.length &&
                      shelfLife !== "" &&
                      packTypeId !== "" &&
                      flavourCategoryId !== 0 &&
                      dumCode.length
                        ? "#0f5953"
                        : "rgb(15 89 83 / 72%)3",
                    color:
                      name !== "" &&
                      projNoCase !== "" &&
                      referenceWeight !== "" &&
                      packsPerCase !== "" &&
                      underWeightSetting !== "" &&
                      dum.length &&
                      shelfLife !== "" &&
                      packTypeId !== "" &&
                      flavourCategoryId !== 0 &&
                      dumCode.length
                        ? "white"
                        : "#adb5bd",
                  }}
                  variant="contained"
                  disabled={
                    name !== "" &&
                    projNoCase !== "" &&
                    referenceWeight !== "" &&
                    packsPerCase !== "" &&
                    underWeightSetting !== "" &&
                    dum.length &&
                    shelfLife !== "" &&
                    packTypeId !== "" &&
                    flavourCategoryId !== 0 &&
                    dumCode.length
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
