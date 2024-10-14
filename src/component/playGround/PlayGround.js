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
  Table,
  TableHeaderCell,
  TableHeaderRow,
  TableCell,
  TableRow,
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

  if (layoutInfo && layoutInfo["Type"] === "A") {
    renderedLayout = Object.keys(layoutInfo).map((key) => {
      if (key === "Type") {
        return;
      }

      let fields = layoutInfo[key].map((field, index) => {
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
              key={fieldName + "input"}
              type="Text"
              valueState="None"
              value={field[fieldName]}
              className="exploded-input"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          </FormItem>
        );
      });

      console.log("return arrived");
      // return <FormGroup headerText={layout[key]}>{fields}</FormGroup>;
      return <FormGroup headerText={key}>{fields}</FormGroup>;
    });
    renderedLayout = (
      <Form
        headerText="ERP Canvas"
        labelSpan="S12 M6 L6 XL6"
        layout="S2 M2 L3 XL3"
      >
        {renderedLayout}
      </Form>
    );
  } else if (layoutInfo && layoutInfo["Type"] === "B") {
    let tableHeaderRow = layoutInfo["fieldname"].map((field) => {
      return (
        <TableHeaderCell key={field} minWidth="12rem">
          <span>{field}</span>
        </TableHeaderCell>
      );
    });

    tableHeaderRow = <TableHeaderRow sticky>{tableHeaderRow}</TableHeaderRow>;

    let tableRows = layoutInfo["value"].map((row) => {
      return (
        <TableRow>
          {row.map((value) => {
            return (
              <TableCell>
                <span>{value}</span>
              </TableCell>
            );
          })}
        </TableRow>
      );
    });

    renderedLayout = (
      <Table headerRow={tableHeaderRow} onRowClick={function ks() {}}>
        {tableRows}
      </Table>
    );
  }

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
              {renderedLayout}
            </ObjectPageSection>
          </ObjectPage>
        )}
      </div>
    </div>
  );
}

export default PlayGround;
