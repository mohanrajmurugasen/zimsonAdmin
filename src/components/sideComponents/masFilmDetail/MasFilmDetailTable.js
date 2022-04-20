import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import "../../../assets/css/category.css";
import Fade from "@material-ui/core/Fade";
import authaxios from "../../interceptors/authaxios";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Multiselect from "multiselect-react-dropdown";
import { technologyProduct } from "../../../redux/actions/action";

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
  table: {
    minWidth: 650,
  },
}));

export default function MasFilmDetailTable({ search, setvals, vals }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modals, setmodals] = useState("");
  const [id, setid] = useState(null);
  const [rowid, setrowid] = useState(null);
  const [values, setvalues] = useState([]);
  const [name, setname] = useState("");
  const [referenceWeight, setreferenceWeight] = useState(null);
  const [underWeightSetting, setunderWeightSetting] = useState(null);
  const [shelfLife, setshelfLife] = useState(null);
  const [projNoCase, setprojNoCase] = useState("");
  const [packsPerCase, setpacksPerCase] = useState(null);
  const [allergenList, setallergenList] = useState([]);
  const [packType2] = useState([
    { name: "Inner Pack", type: "I" },
    { name: "Multi Pack", type: "M" },
    { name: "Share Bag", type: "S" },
  ]);
  const [packTypeId, setpackTypeId] = useState("");
  const [flavourCategory, setflavourCategory] = useState([]);
  const [flavourCategoryId, setflavourCategoryId] = useState(0);
  const [flavourCode, setflavourCode] = useState([]);
  const [dumCode, setdumCode] = useState([]);
  let joinCode = dumCode.join(";");

  const [dum, setdum] = useState([]);
  let join = dum.join(";");

  const dispatch = useDispatch();

  const height = window.innerHeight;

  const productIds = useSelector((state) => state.addProductId.productId);

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
      .get(`FlavourCodes`)
      .then((res) => {
        setflavourCode(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      await authaxios
        .get(`MasFilmDetailByProductLineId/${productIds}`)
        .then((res) => {
          if (isMounted) {
            setvalues(res.data);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [productIds, vals]);

  useEffect(() => {
    let isMounted = true;
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

  const [getsplit, setgetsplit] = useState([]);
  const [getsplitCode, setgetsplitCode] = useState([]);

  const [val, setVal] = useState({});
  const [valCode, setValCode] = useState({});
  const [dumFlav, setdumFlav] = useState(null);
  const [dumbyCod, setdumbyCod] = useState([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      flavourCategory
        .filter((nam) => nam.id === flavourCategoryId)
        .map((itm) => {
          return setValCode(itm);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [flavourCategoryId, flavourCategory]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      packType2
        .filter((nam) => nam.type === packTypeId)
        .map((itm) => {
          return setVal(itm);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [packType2, packTypeId]);

  const handleOpen = (x) => {
    setid(x);
    setOpen(true);
    setmodals("delete");
  };

  const handleOpen1 = (x) => {
    setpackTypeId(x.packType);
    setflavourCategoryId(x.flavourCategoryId);
    setdumFlav(x.flavourCategoryId);
    console.log(x);
    setrowid(x.id);
    setname(x.filmCode);
    setreferenceWeight(x.referenceWeight);
    setunderWeightSetting(x.underWeightSetting);
    setshelfLife(x.shelfLife);
    setprojNoCase(x.projNoCase);
    setpacksPerCase(x.packsPerCase);
    setOpen(true);
    setmodals("edit");
    x.allergenId.split(";") &&
      x.allergenId.split(";").map((res) => {
        setdum((dum) => [...dum, Number(res)]);
        console.log(res);
        return allergenList.map((itm) => {
          return itm.id === Number(res)
            ? setgetsplit((getsplit) => [...getsplit, itm])
            : null;
        });
      });
    x.flavourCode.split(";") &&
      x.flavourCode.split(";").map((res) => {
        setdumCode((dumCode) => [...dumCode, Number(res)]);
        setdumbyCod((dumbyCod) => [...dumbyCod, Number(res)]);
        return flavourCode
          .filter((nam) => nam.id === Number(res))
          .map((itm) => {
            return setgetsplitCode((getsplitCode) => [...getsplitCode, itm]);
          });
      });
  };

  const handleClose = () => {
    setOpen(false);
    setgetsplit([]);
    setgetsplitCode([]);
    setdum([]);
    setdumCode([]);
    setdumbyCod([]);
  };

  const handleClose2 = () => {
    authaxios.delete(`MasFilmDetails?id=${id}`).then((res) => {
      setOpen(false);
      setvals(!vals);
    });
  };

  const handleClose3 = async () => {
    await authaxios
      .put(`MasFilmDetails`, {
        id: Number(rowid),
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
        setgetsplit([]);
        setgetsplitCode([]);
        setOpen(false);
        setdum([]);
        setdumCode([]);
        setdumbyCod([]);
        setvals(!vals);
      })
      .catch((err) => console.log(err.message));
  };

  const filteredCountries = values.filter((country) => {
    return country.filmCode.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  const [filteredCountries2, setfilteredCountries2] = useState([]);

  useEffect(() => {
    const dat = values.filter((country) => {
      return (
        country.filmCode.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    });
    setfilteredCountries2(dat);
  }, [search, values]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(
        technologyProduct({
          type: "filmDetail",
          val: filteredCountries2,
        })
      );
    }

    return () => {
      isMounted = false;
    };
  }, [filteredCountries2, dispatch]);

  const [msg, setmsg] = useState(true);
  const [place, setplace] = useState(true);
  const [place2, setplace2] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (flavourCategoryId === dumFlav && isMounted) {
      setdumCode(dumbyCod);
    } else {
      setdumCode([]);
    }
    return () => {
      isMounted = false;
    };
  }, [flavourCategoryId, dumFlav, dumbyCod]);

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

  return (
    <div className="tech">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">FilmCode</TableCell>
              <TableCell align="center">Reference Weight</TableCell>
              <TableCell align="center">ProjNoCase</TableCell>
              <TableCell align="center">Pack Type</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCountries &&
              filteredCountries.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.filmCode}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.referenceWeight}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.projNoCase}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ textTransform: "capitalize" }}
                  >
                    {row.packType}
                  </TableCell>
                  <TableCell align="center">
                    <div className="action">
                      <div>
                        <EditIcon
                          onClick={() => handleOpen1(row)}
                          color="primary"
                        />
                      </div>
                      <div>
                        <DeleteIcon
                          onClick={() => handleOpen(row.id)}
                          color="secondary"
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div className="modals">
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
            {modals === "delete" ? (
              <Fade style={{ width: "40%" }} in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Are you sure ?</h2>
                  <p id="transition-modal-description">
                    You want be able to delete this!
                  </p>
                  <div className="deletess">
                    <div>
                      <Button
                        style={{ backgroundColor: "red" }}
                        onClick={handleClose2}
                        variant="contained"
                        color="primary"
                      >
                        Yes delete it?
                      </Button>
                    </div>
                    <div>
                      <Button onClick={handleClose} variant="contained">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Fade>
            ) : modals === "edit" ? (
              <Fade
                style={{
                  width: "50%",
                  height: `${height - 100}px`,
                  overflow: "scroll",
                }}
                in={open}
              >
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Edit Film Detail</h2>
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
                          onChange={(e) =>
                            setunderWeightSetting(e.target.value)
                          }
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
                            selectedValues={getsplit}
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
                            value={val}
                            id="combo-box-demo"
                            options={packType2}
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
                            value={valCode}
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
                          Flavour Code ( If Flavour Category is NA then choose
                          NA )
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
                            options={flavourCode.filter(
                              (nam) =>
                                nam.flavourCategoryId === flavourCategoryId
                            )}
                            showCheckbox
                            selectedValues={getsplitCode.filter(
                              (nam) =>
                                nam.flavourCategoryId === flavourCategoryId
                            )}
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
                      onClick={() => handleClose3()}
                      variant="contained"
                      style={{ backgroundColor: "#0f5953", color: "white" }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </Fade>
            ) : null}
          </Modal>
        </div>
      </TableContainer>
    </div>
  );
}
