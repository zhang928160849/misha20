import React from "react";

const logJsxDetails = (element, depth = 0) => {
  if (React.isValidElement(element)) {
    const indentation = " ".repeat(depth * 2);
    console.log(`${indentation}Type:`, element.type);
    console.log(`${indentation}Key:`, element.key);
    console.log(`${indentation}Props:`, element.props);

    if (element.props && element.props.children) {
      React.Children.forEach(element.props.children, (child) => {
        logJsxDetails(child, depth + 1);
      });
    }
  }
};

export default logJsxDetails;
