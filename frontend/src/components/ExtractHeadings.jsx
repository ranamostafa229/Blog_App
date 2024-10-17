/* eslint-disable react/prop-types */
import { ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const ExtractHeadings = ({ htmlContent }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const pasrser = new DOMParser();
    const doc = pasrser.parseFromString(htmlContent, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingValues = Array.from(headings).map((heading) =>
      heading.textContent.trim()
    );
    setHeadings(headingValues);
  }, [htmlContent]);

  return (
    <ListItemText
      primary={
        <div>
          {headings.map((heading, index) => (
            <div key={index}>{heading}</div>
          ))}
        </div>
      }
    />
  );
};

export default ExtractHeadings;
