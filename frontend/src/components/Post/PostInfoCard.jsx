/* eslint-disable react/prop-types */
import { Box, Rating, SvgIcon, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import WorkspacePremiumSharpIcon from "@mui/icons-material/WorkspacePremiumSharp";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const PostInfoCard = ({ category, updatedAt, userId, content }) => {
  const [value, setValue] = useState(2);
  console.log(typeof userId);
  const { data: user } = useFetch(`/api/v1/user/${userId}`, {});
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "50px",
      }}
    >
      <Typography
        variant="h6"
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontbold: "bold",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        })}
      >
        <AutoAwesomeIcon sx={{ fontSize: "25px", color: "#ff2aac" }} />
        Article Information
      </Typography>
      <Box
        sx={(theme) => ({
          color: "#121111",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          bgcolor: theme.palette.background.banner,
          paddingY: "27px",
          width: "100%",
          paddingX: "26px",
          borderRadius: "10px",
          border: "1px solid ",
          borderColor: theme.palette.text.secondary,
          boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
        })}
      >
        <Box display={"flex"} gap={2}>
          <LocalOfferOutlinedIcon sx={{ color: "#6a4ee9", fontSize: "20px" }} />
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          >
            <span style={{ fontWeight: "500" }}>Category:</span>{" "}
            <span style={{ color: "#8493ab" }}>{category}</span>
          </Typography>
        </Box>
        <Box display={"flex"} gap={2}>
          <QueryBuilderOutlinedIcon
            sx={{ color: "#6a4ee9", fontSize: "20px" }}
          />
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          >
            <span style={{ fontWeight: "500" }}> Updated: </span>
            <span style={{ color: "#8493ab" }}>{updatedAt}</span>
          </Typography>
        </Box>
        <Box display={"flex"} gap={2} sx={{ alignItems: "center" }}>
          <PersonOutlineSharpIcon sx={{ color: "#6a4ee9", fontSize: "22px" }} />
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              display: "flex",
              gap: "2px",
            })}
          >
            <span style={{ fontWeight: "500" }}> Author: </span>
            <span
              style={{
                color: "#8493ab",
                textOverflow: "ellipsis",
              }}
            >
              {user?.username}
            </span>
          </Typography>
        </Box>
        <Box display={"flex"} gap={2}>
          <SvgIcon sx={{ color: "#6a4ee9", fontSize: "20px" }}>
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              d="M6.382 5.968A8.962 8.962 0 0 1 12 4c2.125 0 4.078.736 5.618 1.968l1.453-1.453 1.414 1.414-1.453 1.453A9 9 0 1 1 3 13c0-2.125.736-4.078 1.968-5.618L3.515 5.93l1.414-1.414 1.453 1.453ZM12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm1-8h3l-5 6.5V14H8l5-6.505V12ZM8 1h8v2H8V1Z"
            />
          </SvgIcon>
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
          >
            <span style={{ fontWeight: "500" }}> Reading time: </span>
            <span style={{ color: "#8493ab" }}>
              {`${(content?.length / 1000).toFixed(0)} Mins`}
            </span>
          </Typography>
        </Box>
        <Box display={"flex"} gap={2}>
          <WorkspacePremiumSharpIcon
            sx={{ color: "#6a4ee9", fontSize: "20px" }}
          />
          <Typography
            variant="body2"
            sx={(theme) => ({
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            })}
          >
            <span style={{ fontWeight: "500" }}>Difficulty:</span>
            {/* <span style={{ color: "#8493ab" }}>1 Min</span> */}
            <Rating
              name="read-only"
              value={value}
              max={3}
              readOnly
              size="small"
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostInfoCard;
