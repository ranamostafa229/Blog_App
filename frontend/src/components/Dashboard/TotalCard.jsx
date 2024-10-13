import { Card, CardContent, Typography, Box, SvgIcon } from "@mui/material";
import { styled } from "@mui/system";
import UsersImage from "../../assets/users.svg";
import CommentsImage from "../../assets/comments.svg";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const StyledCard = styled(Card)({
  //   background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
  color: "#fff",
  padding: "20px",
  borderRadius: "15px",
  // flexGrow: 1,
  width: "30%",
});

const NewUsersText = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: "bold",
});

const UserCountText = styled(Typography)({
  fontSize: "1.7rem",
  fontWeight: "bold",
});

const TotalCard = () => {
  const cardItems = [
    {
      title: "Total Users",
      value: "1.35M",
      img: UsersImage,
      background: "linear-gradient(135deg, #e0c3fc 0%, #9649f2 100%)",
      //   background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      color: "#9649f2",
    },
    {
      title: "Total Posts",
      value: "1.35M",
      //"#9c27b0"
      icon: <TextSnippetIcon sx={{ color: "#2a79e2", fontSize: "55px" }} />,
      background: "linear-gradient(135deg, #8ec5fc 0%, #2a79e2 100%)",
      color: "#2a79e2",
    },
    {
      title: "Total Comments",
      value: "1.35M",
      img: CommentsImage,
      background: "linear-gradient(135deg, #ffe5d6 0%, #e44a30 100%)",
      //   background: "linear-gradient(135deg, #ffe5d6 0%, #f5576c 100%)",
      color: "#e44a30",
    },
  ];
  return (
    <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {cardItems.map((item) => (
        <StyledCard key={item.title} sx={{ background: item.background }}>
          <CardContent sx={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {item.img ? <img src={item.img} alt="users" /> : item.icon}
            </div>

            <NewUsersText>{item.title}</NewUsersText>

            <UserCountText>1.35</UserCountText>
            {/* Add your line graph component here */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: 0,
                right: 0,
                gap: "10px",
              }}
            >
              <SvgIcon
                sx={{
                  width: "1em",
                  height: "1em",

                  color: "#fff",
                }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21 7a.8.8 0 0 0 0-.21a.6.6 0 0 0-.05-.17a1 1 0 0 0-.09-.14a.8.8 0 0 0-.14-.17l-.12-.07a.7.7 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 0 0 0 2h2.83l-4 4.71l-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 .13 1.41A1 1 0 0 0 4 18a1 1 0 0 0 .77-.36l4.45-5.34l4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 0 0 2 0z"
                />
              </SvgIcon>
              2.5 LM
            </Box>
          </CardContent>
        </StyledCard>
      ))}
    </Box>
  );
};

export default TotalCard;
