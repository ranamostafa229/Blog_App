import { Box, Button, TextField, Typography } from "@mui/material";

const ReplySection = () => {
  return (
    <Box
      sx={{
        marginLeft: "22px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="h6" sx={{ color: "#282424", fontWeight: "600" }}>
        Leave a Reply
      </Typography>
      <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextField
          label="Comment"
          multiline
          rows={4}
          variant="outlined"
          sx={{
            bgcolor: "white",
            width: "100%",
            borderRadius: "10px",
          }}
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
