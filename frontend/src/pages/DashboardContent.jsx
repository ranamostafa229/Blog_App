import { useSelector } from "react-redux";
import TotalCard from "../components/Dashboard/TotalCard";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { getTokenFromCookie } from "../utils/utils";
import Charts from "../components/Charts/Chart";
import { Box, styled } from "@mui/material";

const DashboardContent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const token = getTokenFromCookie();

  const { data: usersData } = useFetch(
    `/api/v1/user/all-users?limit=5`,
    {
      Authorization: `Bearer ${token}`,
    },
    []
  );
  const { data: postsData } = useFetch(
    `/api/v1/post/all-posts?limit=5`,
    {
      Authorization: `Bearer ${token}`,
    },
    []
  );
  const { data: commentsData } = useFetch(
    `/api/v1/comment/all-comments?limit=5`,
    {
      Authorization: `Bearer ${token}`,
    },
    []
  );
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  useEffect(() => {
    if (currentUser?.isAdmin) {
      setTotalUsers(usersData?.totalUsers);
      setLastMonthUsers(usersData?.lastMonthUsers);
      setTotalPosts(postsData?.totalPosts);
      setLastMonthPosts(postsData?.lastMonthPosts);
      setTotalComments(commentsData?.totalComments);
      setLastMonthComments(commentsData?.lastMonthComments);
    }
  }, [currentUser, usersData, postsData, commentsData]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TotalCard
        totalUsers={totalUsers}
        lastMonthUsers={lastMonthUsers}
        totalPosts={totalPosts}
        lastMonthPosts={lastMonthPosts}
        totalComments={totalComments}
        lastMonthComments={lastMonthComments}
      />
      <StyledBox>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Charts
            values={[totalUsers, lastMonthUsers]}
            labels={["Total Users", "Last Month Users"]}
            label={"# of Users"}
            type={"user"}
            backgroundColor={["rgb(133,56,232)", "rgb(221,191,251)"]}
            borderColor={["rgb(133,56,232)", "rgb(221,191,251)"]}
          />
          <Charts
            values={[totalPosts, lastMonthPosts]}
            labels={["Total Posts", "Last Month Posts"]}
            label={"# of Posts"}
            type={"post"}
            backgroundColor={["rgb(138,194,251)", "rgb(42,121,226)"]}
            borderColor={["rgb(138,194,251)", "rgb(42,121,226)"]}
          />
        </Box>
        <Charts
          values={[totalComments, lastMonthComments]}
          labels={["Total Posts", "Last Month Posts"]}
          type={"comment"}
          backgroundColor={["rgb(252,173,145)", "rgb(226,71,46)"]}
          borderColor={["rgb(252,173,145)", "rgb(226,71,46)"]}
        />
      </StyledBox>
    </Box>
  );
};

export default DashboardContent;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "center",
  backgroundColor: theme.palette.background.banner,
  padding: "20px",
  borderRadius: "20px",
  width: "94%",
}));
