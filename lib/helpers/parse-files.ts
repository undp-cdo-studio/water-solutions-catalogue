import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";

export function str2xml(str: string) {
  if (str.charCodeAt(0) === 65279) {
    // BOM sequence
    str = str.substr(1);
  }
  return new DOMParser().parseFromString(str, "text/xml");
}

// Get paragraphs as javascript array
export function getParagraphs(content: any) {
  const zip = new PizZip(content);
  const xml = str2xml(zip.files["word/document.xml"].asText());
  const paragraphsXml = xml.getElementsByTagName("w:p");
  let paragraphs: string[] = [];

  for (let i = 0, len = paragraphsXml.length; i < len; i++) {
    let fullText = "";
    const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
    for (let j = 0, len2 = textsXml.length; j < len2; j++) {
      const textXml = textsXml[j];
      if (textXml.childNodes && textXml.childNodes.length > 0) {
        fullText += textXml.childNodes[0].nodeValue;
      }
    }
    if (fullText) {
      paragraphs.push(fullText);
    }
  }
  return paragraphs;
}

const handlePDF = (uploaded: any) => {
  const formData = new FormData();
  formData.append("file", uploaded);
  const reader = new FileReader();
  reader.onload = async (readEvent) => {
    const arrayBuffer = readEvent?.target?.result;
    const response = await fetch("/api/extract-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/pdf",
      },
      body: arrayBuffer,
    });
    if (response.ok) {
      const data = await response.json();

      // TODO: Query OpenAI API for response, then pass to frontend
      const llmResponse = "";

      return llmResponse;
    } else {
      console.error("Error extracting text", response);
    }
  };
  reader.readAsArrayBuffer(uploaded);
};

const handleDOCX = (upload: any) => {
  const formData = new FormData();
  formData.append("document", upload);
  const reader = new FileReader();
  reader.onload = (e: any) => {
    const content = e.target.result;
    const paragraphs = getParagraphs(content);

    // TODO: Query OpenAI API for response, then return to frontend
    const response = "";

    return response;
  };
  reader.onerror = (err) => console.error(err);
  reader.readAsBinaryString(upload);
};

export const handleFileChange = async (
  event: any,
  maxSize = 5 * 1024 * 1024,
) => {
  const uploaded = event.target.files[0];

  if (uploaded.size > maxSize) {
    return;
  }

  if (uploaded && uploaded.type == "application/pdf") {
    const response = handlePDF(uploaded);
    return response;
  } else if (uploaded) {
    const response = handleDOCX(uploaded);
    return response;
  }
};
