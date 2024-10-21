import { Box, Container, Grid2, styled, Typography } from "@mui/material";
import HtmlIcon from "../assets/html-icon.png";
import CssIcon from "../assets/css-icon.png";
import JavascriptIcon from "../assets/js-icon.png";
import CodeIcon from "../assets/code-icon.png";
import DatabaseIcon from "../assets/databases-icon.png";
import SQLIcon from "../assets/sql-icon.png";
import TechIcon from "../assets/tech-icon.png";
import DeployIcon from "../assets/deploy-icon.png";
import JoinBanner from "../components/JoinBanner";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Categories = () => {
  const icons = [
    {
      img: HtmlIcon,
      bg: "#ff8e51",
      label: "HTML",
    },
    {
      img: CssIcon,
      bg: "#227dff",
      label: "CSS",
    },
    {
      img: JavascriptIcon,
      bg: "#ffcb29",
      label: "javaScript",
    },
    {
      img: CodeIcon,
      bg: "#6a4ee9",
      label: "Fundamentals",
    },
    {
      img: DatabaseIcon,
      bg: "#5751ff",
      label: "Databases",
    },
    {
      img: SQLIcon,
      bg: "#f95353",
      label: "Databases",
    },
    {
      img: TechIcon,
      bg: "#4775ff",
      label: "Tech",
    },
    {
      img: CodeIcon,
      bg: "#ff2ed9",
      label: "Code",
    },
    {
      img: DeployIcon,
      bg: "#2a2728",
      label: "Code",
    },
  ];
  const shapeCircleStyles = {
    width: 60,
    height: 60,
    position: "absolute",
    borderRadius: "50%",
    boxshadow: "0 0 2px 2px rgba(0, 0, 0, 0.15)",
  };
  const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.primary,
    cursor: "pointer",
  }));
  const navigate = useNavigate();
  const { data } = useFetch("/api/v1/post/categories", []);

  const categoryElement = icons
    .filter((icon) => data?.categories?.includes(icon.label))
    .map((icon, index) => (
      <Grid2 key={index} size={{ xs: 2, sm: 2, md: 3 }}>
        <Item onClick={() => navigate(`/categories/${icon.label}`)}>
          <Typography
            component={"span"}
            key={index}
            sx={{
              display: "flex",
              flexDirection: {
                md: "row",
                xs: "column",
              },
              gap: "10px",
              alignItems: "center",
              fontWeight: "500",
              // color: "black",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "70px",
                height: "70px",
                // bgcolor: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "&:hover": {
                  bgcolor: icon.bg + "33",
                },
                transition: "all 0.4s ease",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  ...shapeCircleStyles,
                  bgcolor: icon.bg,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                <img
                  src={icon.img}
                  alt="Trending"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60px",
                    height: "60px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: {
                  lg: "flex-start",
                  sx: "center",
                },
                gap: "8px",
              }}
            >
              <span>{icon.label}</span>
              <span style={{ color: "#636060" }}>10 Articles</span>
            </Box>
          </Typography>
        </Item>
      </Grid2>
    ));

  return (
    <Box
      sx={{
        // color: "#121111",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: "45px",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Explore our Categories ✨
      </Typography>
      <Typography
        variant="body1"
        sx={(theme) => ({
          color: theme.palette.text.subtitle,
          width: "60%",
          alignSelf: "center",
          fontSize: "20px",
        })}
      >
        Browse through our categories to find the best content for you to enjoy
        in no time at all and learn more about the topics you love.
      </Typography>

      <Container
        sx={(theme) => ({
          flexGrow: 1,
          bgcolor: theme.palette.background.banner,
          border: "2px solid",
          borderColor: theme.palette.text.secondary,
          borderRadius: "8px",
          marginBottom: "40px",
        })}
      >
        <Grid2
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, sm: 6, md: 12 }} // sm: 8,
          sx={{ paddingX: "40px", paddingY: "50px" }}
        >
          {categoryElement}
        </Grid2>
      </Container>
      <JoinBanner />
    </Box>
  );
};

export default Categories;
