import { useEffect, useState } from "react";

const useModifyHtmlWithIds = (htmlContent) => {
  const [modifiedHtml, setModifiedHtml] = useState("");

  useEffect(() => {
    if (htmlContent) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const elements = doc.body.children;

      Array.from(elements).forEach((element) => {
        if (element instanceof HTMLHeadingElement) {
          element.id = element.textContent;
        }
        // else {
        //   element.id = `element-${index + 1}`;
        // }
      });

      setModifiedHtml(doc.body.innerHTML);
    }
  }, [htmlContent]);

  return modifiedHtml;
};

export default useModifyHtmlWithIds;
