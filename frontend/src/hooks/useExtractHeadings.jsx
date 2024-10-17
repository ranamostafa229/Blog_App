import { useEffect, useState } from "react";

const useExtractHeadings = (htmlContent) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const headingValues = Array.from(headings).map((heading) =>
      heading.textContent.trim()
    );
    setHeadings(headingValues);
  }, [htmlContent]);

  return headings;
};

export default useExtractHeadings;
// const result = [];

// headings.forEach((heading) => {
//   const headingText = heading.textContent.trim();
//   let nextSibling = heading.nextSibling;
//   let content = "";

//   while (
//     nextSibling &&
//     !(
//       nextSibling.nodeType === Node.ELEMENT_NODE &&
//       /^H[1-6]$/.test(nextSibling.nodeName)
//     )
//   ) {
//     if (
//       nextSibling.nodeType === Node.TEXT_NODE ||
//       nextSibling.nodeType === Node.ELEMENT_NODE
//     ) {
//       content += nextSibling.outerHTML || nextSibling.textContent;
//     }
//     nextSibling = nextSibling.nextSibling;
//   }

//   result.push({ id: headingText, body: content });
// });
