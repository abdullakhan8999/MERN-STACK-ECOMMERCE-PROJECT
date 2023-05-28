import React, { useState } from "react";
import "./Accordion.css";
const Accordion = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={handleAccordion}>
        <h3 className="accordion-title">{title}</h3>
      </div>
      {isExpanded && (
        <div className="accordion-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;
