import WavingHandIcon from "@mui/icons-material/WavingHand";
import { Box, Button, Typography } from "@mui/material";
const JoinBanner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        color: "black",
        height: "210px",
        alignItems: "center",
        overflow: "hidden",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#6a4ee9",
          borderRadius: "15px",
          width: {
            xs: "100px",
            md: "120px",
            lg: "160px",
          },
          height: {
            xs: "100px",
            md: "120px",
            lg: "160px",
          },
          rotate: "45deg",
          marginInline: "-80px",
          marginTop: {
            xs: "120px",
            lg: "0px",
          },
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          gap: {
            lg: "30px",
          },
          zIndex: 50,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#282424",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: {
                xs: "center",
                lg: "flex-start",
              },
            }}
          >
            Join to our community
            <WavingHandIcon sx={{ fontSize: "35px", color: "#ffc83d" }} />
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#3d3939",
              fontSize: {
                lg: "20px",
                xs: "14px",
              },
              width: {
                lg: "450px",
                xs: "fit-content",
              },
            }}
          >
            Get full access to <b> DEVJOURNEY</b> and see the new posts in your
            <b> inbox</b> every day.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        />
        <Box
          variant="subtitle1"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            // "&:hover": {
            //   "& .hover-button": {
            //     gap: "130px",
            //   },
            // },
          }}
        >
          <Typography variant="subtitle1">
            Subscribe to our <b>Newsletter</b> cancel at <b>anytime.</b>
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              display: "flex",
              backgroundColor: "#333333",
              width: "fit-content",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 1s ease",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            Join Now
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ff2aac",
          borderRadius: "15px",
          width: {
            xs: "100px",
            md: "120px",
            lg: "160px",
          },
          height: {
            xs: "100px",
            md: "120px",
            lg: "160px",
          },
          rotate: "45deg",
          marginInline: "-80px",
          marginTop: {
            xs: "120px",
            lg: "0px",
          },
        }}
      ></Box>
    </Box>
  );
};

export default JoinBanner;
