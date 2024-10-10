import { ToggleButton } from "@mui/material";
import { useState } from "react";
import NightlightIcon from "@mui/icons-material/Nightlight";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";

const ModeButton = () => {
  const [selected, setSelected] = useState(false);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => setSelected((prevSelected) => !prevSelected)}
      sx={{
        borderRadius: "100px",
        // color: "#6A4EE9",
        // bgcolor: "white",
        marginLeft: "10px",
      }}
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? (
        <NightlightIcon sx={{ color: "#6A4EE9" }} />
      ) : (
        <Brightness7Icon sx={{ color: "#6A4EE9" }} />
      )}
    </ToggleButton>
  );
};

export default ModeButton;
