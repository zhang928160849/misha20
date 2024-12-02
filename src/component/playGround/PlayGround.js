import "../css/PlayGround.css";
import { LayoutContext } from "../context/LayoutContext";
import { useState, useContext } from "react";
import logJsxDetails from "../devUtil/devUtils";
import BasicInput from "../input/BasicInput";
import {
  Form,
  FormGroup,
  FormItem,
  Label,
  ObjectPageSection,
  ObjectPage,
  Input,
  Select,
  Option,
  TextArea,
  CheckBox,
} from "@ui5/webcomponents-react";
import "../css/InputExplosion.css";

function PlayGround({ isSubmitted }) {
  const { layout } = useContext(LayoutContext);

  const [exploded, setExploded] = useState(true);

  let renderedLayout;

  let layoutInfo;

  if (layout) {
    layoutInfo = layout["layout"];
  }

  const mapJsonToHtml = (json) => {
    const { type, label, children, attributes } = json;

    const buildAttributes = (attributesArray) => {
      return (
        attributesArray
          ?.map((attr) => `${attr.name}="${attr.value}"`)
          .join(" ") || ""
      );
    };

    switch (type) {
      case "Form":
        return `
          <form ${buildAttributes(attributes)}>
            ${label ? `<h1>${label}</h1>` : ""}
            ${children ? children.map(mapJsonToHtml).join("") : ""}
          </form>
        `;
      case "FormGroup":
        return `
          <FormGroup class="form-group" ${buildAttributes(attributes)}>
              ${children ? children.map(mapJsonToHtml).join("") : ""}
          </FormGroup>
        `;
      case "FormItem":
        return `
          <FormItem class="form-item" ${buildAttributes(attributes)}>
            ${children ? children.map(mapJsonToHtml).join("") : ""}
          </FormItem>
        `;
      case "Input":
        return `<Input ${buildAttributes(attributes)} />`;
      case "Select":
        return `
          <Select ${buildAttributes(attributes)}>
            ${children ? children.map(mapJsonToHtml).join("") : ""}
          </Select>
        `;
      case "Option":
        return `<Option ${buildAttributes(attributes)}>${label}</option>`;
      default:
        return "";
    }
  };

  const mapJsonToJsx = (json) => {
    const { type, label, children, attributes } = json;

    const buildAttributes = (attributesArray) => {
      const attributes = {};
      attributesArray?.forEach((attr) => (attributes[attr.name] = attr.value));
      return attributes;
    };

    switch (type) {
      case "Form":
        return (
          <Form {...buildAttributes(attributes)}>
            {/* {label && <h1>{label}</h1>} */}
            {children && children.map(mapJsonToJsx)}
          </Form>
        );
      case "FormGroup":
        return (
          <FormGroup headerText={label} {...buildAttributes(attributes)}>
            {children && children.map(mapJsonToJsx)}
          </FormGroup>
        );
      case "FormItem":
        return (
          <FormItem
            labelContent={<Label>{label}</Label>}
            {...buildAttributes(attributes)}
          >
            {children && children.map(mapJsonToJsx)}
          </FormItem>
        );
      case "Input":
        return <Input {...buildAttributes(attributes)} />;
      case "Select":
        return (
          <Select {...buildAttributes(attributes)}>
            {children && children.map(mapJsonToJsx)}
          </Select>
        );
      case "Option":
        return <Option {...buildAttributes(attributes)}>{label}</Option>;
      default:
        return null;
    }
  };

  const dynamicForm = () => {
    if (!layoutInfo) {
      return null;
    }
    let formGroups = layoutInfo.map(mapJsonToJsx);
    return formGroups;
  };

  return (
    <div className={`new-page ${isSubmitted ? "visible" : ""}`}>
      <div className="explosion-container">
        {exploded && (
          <ObjectPage>
            <ObjectPageSection
              aria-label="Details"
              id="Details"
              titleText="Details"
            >
              <Form>{dynamicForm()}</Form>
            </ObjectPageSection>
          </ObjectPage>
        )}
      </div>
    </div>
  );
}

export default PlayGround;
