import { Modal, Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// eslint-disable-next-line react/prop-types
const MyModal = ({ open, handleClose, handleDelete, title }) => {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            ...style,
            width: 400,
          }}
        >
          <ErrorOutlineIcon sx={{ color: "#c81e1e", fontSize: "50px" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "#9ca3af" }}>
            {title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 2 }}>
            <Button
              variant="contained"
              sx={{ bgcolor: "#c81e1e", textTransform: "none" }}
              onClick={handleDelete}
            >
              Yes,I&apos;m sure
            </Button>
            <Button
              variant="contained"
              sx={{
                color: "black",
                bgcolor: "white",
                ":hover": { color: "#2196f3" },
                textTransform: "none",
              }}
              onClick={handleClose}
            >
              {" "}
              No,cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "10px",
};

export default MyModal;
