import { Box, Button, styled, TextField, Typography } from "@mui/material";

const ReplySection = () => {
  const CustomTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.subtitle,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6a4ee9",
    },
    backgroundColor: theme.palette.background.banner,
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    color: theme.palette.text.primary,
  }));
  return (
    <Box
      sx={{
        marginLeft: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography
        variant="h6"
        sx={(theme) => ({
          fontWeight: "600",
          color: theme.palette.text.primary,
        })}
      >
        Leave a Reply
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <CustomTextField
          label="Comment"
          multiline
          rows={4}
          variant="outlined"
        />

        <Button
          variant="contained"
          sx={{ bgcolor: "#6a4ee9", width: "fit-content" }}
        >
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

export default ReplySection;
