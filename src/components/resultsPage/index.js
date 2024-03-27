import React, { useEffect, useRef, useState } from "react";
import Layout from "../layout";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
  Pagination,
  RadioGroup,
  Radio,
  Button,
} from "@mui/material";
import data from "../../lib/data";
import ProductCard from "../product/productCard";
import { Close, FilterAlt, RotateLeft } from "@mui/icons-material";
import { navigate } from "gatsby";

const importantCategories = [
  "nuts",
  "vegan",
  "dairy",
  "gluten free",
  "no sugar",
];

const typesPlural = { cake: "Cakes", pastry: "Pastries" };

const roundUp = (num) => {
  return num % 1 !== 0 ? 1 - (num % 1) + num : num;
};

const ResultsPageComponent = (props) => {
  const isNotPhone = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const params = new URLSearchParams(props.location.search);
  let page = Number(params.get("p")) || 1;
  const pageLimit = 4;
  const search = params.get("search");
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [filters, setFilters] = useState({ category: "All", types: {} });
  const [priceRange, setPriceRange] = useState([20, 33]);
  const [prices, setPrices] = useState([]);
  const [isPriceChange, setIsPriceChange] = useState(false);
  const [isMobileFilters, setIsMobileFilters] = useState(false);
  const mobileFiltersRef = useRef(null);

  useEffect(() => {
    document.title = `Search results for '${search}'`;

    let priceArray = [];
    data.products.forEach((result) => {
      priceArray = [...priceArray, result.unitPrice.amount];
      setFilters((prev) => ({
        ...prev,
        types: {
          ...prev.types,
          [typesPlural[result.type]]: true,
        },
      }));
      result.categories.forEach((category) => {
        if (importantCategories.includes(category)) {
          setCategories((prev) => {
            if (!prev.includes(category)) {
              return [...prev, category];
            }
            return prev;
          });
        }
      });
    });
    setPriceRange([Math.min(...priceArray), Math.max(...priceArray)]);
    setFilters((prev) => ({
      ...prev,
      min: Math.min(...priceArray),
      max: Math.max(...priceArray),
    }));
    setPrices(priceArray);

    const handleClickOutside = (event) => {
      if (
        mobileFiltersRef.current &&
        !mobileFiltersRef.current.contains(event.target)
      ) {
        switchIsMobileFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let filteredResults = [];
    filteredResults = data.products.filter(
      (product) =>
        filters.types[typesPlural[product.type]] &&
        product.unitPrice.amount >= filters.min &&
        product.unitPrice.amount <= filters.max &&
        (filters.category === "All" ||
          product.categories.includes(filters.category))
    );

    if (filteredResults.length) {
      for (let i = 1; i <= roundUp(filteredResults.length / pageLimit); i++) {
        if (i === 1) {
          setResults([
            filteredResults.slice(pageLimit * i - pageLimit, pageLimit * i),
          ]);
        } else {
          setResults((prev) => [
            ...prev,
            filteredResults.slice(pageLimit * i - pageLimit, pageLimit * i),
          ]);
        }
      }
    } else {
      setResults([[]]);
    }

    navigate(`/results?search=${String(search).split(" ").join("+")}&p=1`);
  }, [filters]);

  const handlePriceRangeChangeSlider = (event, newPriceRange) => {
    setPriceRange(newPriceRange);
    setIsPriceChange(true);
  };

  const handlePriceRangeChangeInput = ({ target }) => {
    if (target.name === "min") {
      if (target.value < Math.max(...prices)) {
        setPriceRange((prev) => [target.value, prev[1]]);
      }
    } else if (target.name === "max") {
      if (target.value < Math.max(...prices)) {
        setPriceRange((prev) => [prev[0], target.value]);
      }
    }
    setIsPriceChange(true);
  };

  const handlePriceSave = () => {
    if (priceRange[0] < Math.min(...prices)) {
      setPriceRange((prev) => [Math.min(...prices), prev[1]]);
    } else if (priceRange[1] > Math.max(...prices)) {
      setPriceRange((prev) => [prev[0], Math.max(...prices)]);
    }
    setFilters((prev) => ({ ...prev, min: priceRange[0], max: priceRange[1] }));
    setIsPriceChange(false);
  };

  const handlePriceRangeReset = () => {
    setPriceRange([Math.min(...prices), Math.max(...prices)]);
    setFilters((prev) => ({
      ...prev,
      min: Math.min(...prices),
      max: Math.max(...prices),
    }));
    setIsPriceChange(false);
  };

  const switchType = ({ target }) => {
    setFilters((prev) => ({
      ...prev,
      types: {
        ...prev.types,
        [target.name]: !prev.types[target.name],
      },
    }));
  };

  const hanldleCategoryChange = ({ target }) => {
    setFilters((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const switchIsMobileFilters = (state) => {
    setIsMobileFilters(state);
  };

  const handlePageChange = (event, value) => {
    navigate(
      `/results?search=${String(search).split(" ").join("+")}&p=${value}`
    );
  };

  console.log(results);

  return (
    <Layout>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Box mt={"100px"} width={"95%"}>
          <Box minHeight={"100vh"} display={"flex"}>
            <Box
              ref={mobileFiltersRef}
              position={isNotPhone ? undefined : "fixed"}
              bottom={isMobileFilters ? 0 : -20}
              paddingTop={"20px"}
              mb={isNotPhone ? "50px" : undefined}
              width={isNotPhone ? "25%" : "95%"}
              borderRadius={"25px 25px 0px 0px"}
              height={isMobileFilters ? "70%" : "0"}
              display={"flex"}
              justifyContent={"center"}
              overflow={isNotPhone ? undefined : "scroll"}
              bgcolor={"white"}
              zIndex={isNotPhone ? undefined : 6}
              sx={{ transformOrigin: "bottom", transition: "0.4s" }}
              boxShadow={
                isNotPhone
                  ? undefined
                  : `0px 0px 10px 0px ${theme.palette.grey[400]}`
              }
            >
              <Box
                minHeight={"400px"}
                width={isNotPhone ? "70%" : "80%"}
                borderRadius={"25px"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={"20px"}
                padding={"20px 0px"}
                position={"relative"}
              >
                {!isNotPhone && (
                  <>
                    <Typography fontFamily={"pacifico"}>Filters</Typography>
                    <Box
                      top={-10}
                      right={-30}
                      position={"absolute"}
                      width={"110%"}
                      display={"flex"}
                      justifyContent={"flex-end"}
                    >
                      <IconButton onClick={() => switchIsMobileFilters(false)}>
                        <Close />
                      </IconButton>
                    </Box>
                  </>
                )}
                <Box
                  width={"85%"}
                  boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  borderRadius={"10px"}
                  gap={"20px"}
                  padding={"20px 0px"}
                  position={"relative"}
                >
                  <Typography
                    justifySelf={"center"}
                    mt={"10px"}
                    fontFamily={"pacifico"}
                    fontSize={"1.2rem"}
                  >
                    Price
                  </Typography>
                  {(priceRange[0] !== Math.min(...prices) ||
                    priceRange[1] !== Math.max(...prices)) && (
                    <Box position={"absolute"} right={5} top={25}>
                      <IconButton onClick={handlePriceRangeReset}>
                        <RotateLeft />
                      </IconButton>
                    </Box>
                  )}

                  <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    gap={"45px"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"90%"}
                  >
                    <TextField
                      step="10"
                      type="number"
                      size="small"
                      label="min"
                      name="min"
                      value={priceRange[0]}
                      onChange={handlePriceRangeChangeInput}
                      sx={{ "& > div": { color: "black", fontSize: "13px" } }}
                    />
                    <TextField
                      step="10"
                      type="number"
                      size="small"
                      label="max"
                      name="max"
                      value={priceRange[1]}
                      onChange={handlePriceRangeChangeInput}
                      sx={{ "& > div": { color: "black", fontSize: "13px" } }}
                    />
                  </Box>
                  <Slider
                    max={Math.max(...prices)}
                    min={Math.min(...prices)}
                    value={priceRange}
                    onChange={handlePriceRangeChangeSlider}
                    valueLabelDisplay="auto"
                    step={100}
                    sx={{ width: "80%" }}
                  />
                  {isPriceChange && (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handlePriceSave}
                    >
                      Save
                    </Button>
                  )}
                </Box>
                <Box
                  width={"85%"}
                  boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
                  display={"flex"}
                  flexDirection={"column"}
                  borderRadius={"10px"}
                  alignItems={"center"}
                  gap={"10px"}
                >
                  <Typography
                    mt={"10px"}
                    ml={"10px"}
                    fontSize={"1.2rem"}
                    fontFamily={"pacifico"}
                  >
                    Filter results
                  </Typography>
                  <RadioGroup
                    row
                    aria-labelledby={`result-filters-group`}
                    name={"category"}
                    value={filters.category}
                    onChange={hanldleCategoryChange}
                    sx={{
                      width: "90%",
                      flexWrap: isNotPhone ? "nowrap" : "wrap",
                      flexDirection: isNotPhone ? "column" : "row",
                      alignSelf: "center",
                    }}
                  >
                    {categories.map((category, index) => (
                      <FormControlLabel
                        key={`filter-category-${category}-0${index}}`}
                        value={category}
                        control={<Radio />}
                        label={
                          category.charAt(0).toUpperCase() +
                          category.substring(1, category.length)
                        }
                        checked={filters.category === category}
                      />
                    ))}
                  </RadioGroup>
                </Box>
                <Box
                  width={"85%"}
                  boxShadow={`0px 0px 10px 0px ${theme.palette.grey[400]}`}
                  display={"flex"}
                  flexDirection={"column"}
                  borderRadius={"10px"}
                  gap={"10px"}
                >
                  <FormGroup sx={{ ml: "10px" }}>
                    {Object.keys(filters.types).map((type, index) => (
                      <FormControlLabel
                        key={`result-filter-type-${index}`}
                        checked={filters.types[type]}
                        control={<Checkbox name={type} onClick={switchType} />}
                        label={type}
                      />
                    ))}
                    {(filters["Pastries"] === true ||
                      filters["Pastries"] === false) && (
                      <FormControlLabel
                        key={`result-filter-Pastries`}
                        checked={filters["Pastries"]}
                        control={
                          <Checkbox name={"Pastries"} onClick={switchType} />
                        }
                        label={"Pastries"}
                      />
                    )}
                  </FormGroup>
                </Box>
              </Box>
            </Box>
            <Box
              width={isNotPhone ? "75%" : "100%"}
              display={"flex"}
              flexDirection={"column"}
            >
              {!isNotPhone && (
                <Box
                  display={"flex"}
                  width={"100%"}
                  justifyContent={"flex-end"}
                >
                  <IconButton
                    onClick={() => switchIsMobileFilters(!isMobileFilters)}
                  >
                    <FilterAlt
                      sx={{
                        color: isMobileFilters ? "primary.main" : undefined,
                      }}
                    />
                  </IconButton>
                </Box>
              )}
              <Box
                border={`1px solid ${theme.palette.grey[400]}`}
                borderRadius={"25px"}
                width={"100%"}
                mb={"30px"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                gap={"20px"}
              >
                <Typography
                  fontFamily={"pacifico"}
                  fontSize={"clamp(0.7rem, 4vw, 1.3rem)"}
                  margin={"10px 30px"}
                >
                  Search results for "{search}"
                </Typography>
              </Box>
              {results[page - 1] && (
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  padding={"0px 0px 50px 0px"}
                  width={"100%"}
                >
                  {results[page - 1].map((result, index) => (
                    <ProductCard
                      id={index}
                      product={result}
                      changeProduct={props.changeProduct}
                      changeIsProductDetails={props.changeIsProductDetails}
                    />
                  ))}
                </Box>
              )}
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                m={"30px 0px"}
              >
                <Pagination
                  page={page}
                  count={results.length}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                  sx={{
                    "& > ul > li > button": { color: "black" },
                    "& > ul > li > div": { color: "black" },
                  }}
                  color="primary"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ResultsPageComponent;
