/* eslint-disable react/prop-types */
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";
import { Box } from "@mui/material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  Title,
  CategoryScale,
  LinearScale,
  PointElement
);
const Charts = ({
  labels,
  label,
  values,
  type,
  backgroundColor,
  borderColor,
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: values,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: { legend: { position: "top" }, tooltip: { enabled: true } },
  };
  const lineOptions = { scales: { y: { beginAtZero: true } } };
  return (
    <Box sx={{ width: "50%" }}>
      {type === "user" && <Bar data={data} options={options} />}
      {type === "post" && <Line data={data} options={lineOptions} />}
      {type === "comment" && <Doughnut data={data} options={options} />}
    </Box>
  );
};

export default Charts;
