import { List, ListItemStandard, TextArea } from "@ui5/webcomponents-react";
import "../css/Dialog.css";
import { Card, CardHeader, Icon, Button } from "@ui5/webcomponents-react";
import { useState, useEffect } from "react";
import FunctionSpec from "./FunctionSpec";

function NotesCard({ isSubmitted }) {
  const [functionSpecPopover, setFunctionSpecPopover] = useState({
    opener: "createSC",
    open: false,
  });

  const onClick = (e) => {
    console.log("clicked", e.target.id);
    setFunctionSpecPopover({
      opener: e.target.id,
      open: true,
    });
  };

  return (
    <Card className={`notes ${isSubmitted ? "submitted" : ""}`}>
      <section
        style={{
          display: "flex",
          height: "250px",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "1rem",
          gap: "0.5rem",
        }}
      >
        <List headerText="Function Specs" style={{ height: "100%" }}>
          <ListItemStandard id="create service contract" onClick={onClick}>
            Create a service contract
          </ListItemStandard>
          <ListItemStandard id="list all service contracts" onClick={onClick}>
            List all service contracts
          </ListItemStandard>
        </List>
        <FunctionSpec
          open={functionSpecPopover.open}
          opener={functionSpecPopover.opener}
          onClose={() => {
            setFunctionSpecPopover({
              open: false,
            });
          }}
        ></FunctionSpec>
      </section>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "0.25rem",
          padding: "0 0.75rem 0.75rem 0.75rem",
        }}
      ></div>
    </Card>

    // <Card className={`notes ${isSubmitted ? "submitted" : ""}`}>
    // </Card>
  );
}

export default NotesCard;
