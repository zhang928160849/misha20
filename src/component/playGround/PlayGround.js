import "../css/PlayGround.css";
import { LayoutContext } from "../context/LayoutContext";
import { useState, useContext } from "react";
import BasicInput from "../input/BasicInput";
import {
  Form,
  FormGroup,
  FormItem,
  Label,
  ObjectPageSection,
  ObjectPage,
  FlexBox,
  FlexibleColumnLayout,
} from "@ui5/webcomponents-react";
import "../css/InputExplosion.css";

function PlayGround({ isSubmitted }) {
  const { layout } = useContext(LayoutContext);

  const [exploded, setExploded] = useState(true);

  const renderedLayout = Object.keys(layout).map((key) => {
    console.log("key is", key, "lay out is", layout[key]);
    let fields = layout[key].map((field, index) => {
      let fieldName = Object.keys(field)[0];

      return (
        <FormItem
          key={fieldName}
          labelContent={
            <Label
              className="exploded-input"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {fieldName}
            </Label>
          }
        >
          <BasicInput
            type="Text"
            valueState="None"
            value={field[fieldName]}
            className="exploded-input"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        </FormItem>
      );
    });

    // return <FormGroup headerText={layout[key]}>{fields}</FormGroup>;
    return <FormGroup headerText={key}>{fields}</FormGroup>;
  });

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
              <Form
                headerText="ERP Canvas"
                labelSpan="S12 M6 L6 XL6"
                layout="S2 M2 L3 XL3"
              >
                {renderedLayout}
              </Form>
            </ObjectPageSection>
          </ObjectPage>
        )}
      </div>
    </div>
  );
}

export default PlayGround;
