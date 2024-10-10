import { Box, Button, Divider, Typography } from "@mui/material";
import CssIcon from "../../assets/css-icon.png";

const RelatedPosts = () => {
  const shapeCircleStyles = {
    width: 60,
    height: 60,
    // position: "absolute",
    borderRadius: "50%",
    boxshadow: "0 0 2px 2px rgba(0, 0, 0, 0.15)",
  };
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
        borderRadius: "20px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        padding: "35px",
        gap: "30px",
        bgcolor: theme.palette.background.banner,
      })}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          width: "100%",
        }}
      >
        <Box
          component="span"
          sx={{
            ...shapeCircleStyles,
            bgcolor: "#ff8e51",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <img
            src={CssIcon}
            alt="Trending"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
        </Box>
        <Typography
          component={"div"}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            gap: "6px",
            fontWeight: "500",
            color: "#656262",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span>
              More in this {/* /{ color: "#282424" } */}
              <Box
                component={"span"}
                sx={(theme) => ({ color: theme.palette.text.subtitle })}
              >
                Category
              </Box>
            </span>
            <Typography
              variant="h4"
              sx={(theme) => ({
                //  color: "#282424",
                color: theme.palette.text.primary,
                fontWeight: "bold",
              })}
            >
              CSS
            </Typography>
          </Box>
          <Button variant="contained" sx={{ bgcolor: "#227dff" }}>
            View All Articles
          </Button>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          pl: "15px",
        }}
      >
        <Typography
          variant="h6"
          sx={(theme) => ({
            display: "flex",
            gap: "10px",
            // color: "#2d2929",
            color: theme.palette.text.subtitle,
            fontSize: "18px",
          })}
        >
          <Box
            sx={{
              bgcolor: "#282424",
              // bgcolor: theme.palette.background.paper,
              color: "white",
              borderRadius: "5px",
              paddingX: "9px",
              fontSize: "15px",
              alignSelf: "center",
            }}
          >
            1
          </Box>
          CSS Selectors: Class and ID basic filtering for HTML elements
        </Typography>
        <Divider></Divider>
        <Typography
          variant="h6"
          sx={(theme) => ({
            display: "flex",
            gap: "10px",
            // color: "#2d2929",
            color: theme.palette.text.subtitle,
            fontSize: "18px",
          })}
        >
          <Box
            sx={{
              bgcolor: "#282424",
              color: "white",
              borderRadius: "5px",
              paddingX: "9px",
              fontSize: "15px",
              alignSelf: "center",
            }}
          >
            2
          </Box>
          Introduction to CSS 🚀
        </Typography>
      </Box>
    </Box>
  );
};

export default RelatedPosts;
