import {
  Card,
  CardHeader,
  Icon,
  TextArea,
  Button,
} from "@ui5/webcomponents-react";
import React, { useEffect, useState } from "react";
import { LayoutContext } from "../context/LayoutContext";

import "../css/Dialog.css";

function AICard({ onSubmit, isVisible, isSubmitted }) {
  const [textArea, setTextArea] = useState("");
  const { setLayout } = React.useContext(LayoutContext);
  let onSend = async function () {
    onSubmit();

    const postData = {
      messages: [
        {
          role: "user",
          content: textArea,
        },
      ],
      model: "gpt-4o",
    };

    try {
      const response = await fetch("http://localhost:8080/UIconfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let jsonRes = await response.json();
      console.log(jsonRes["message"]);

      setLayout(JSON.parse(jsonRes["message"]));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`dialog ${isSubmitted ? "submitted" : ""}`}>
      <Card
        className="dialog-content"
        header={
          <CardHeader
            avatar={<Icon name="person-placeholder" />}
            titleText="Misha"
          />
        }
      >
        <section
          style={{
            display: "flex",
            height: "200px",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "1rem",
            gap: "0.5rem",
          }}
        >
          <TextArea
            id="output"
            style={{ height: "100%" }}
            onInput={(e) => {
              setTextArea(e.target.value);
            }}
          ></TextArea>
        </section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "0.25rem",
            padding: "0 0.75rem 0.75rem 0.75rem",
          }}
        >
          <Button onClick={onSend}>Send</Button>
        </div>
      </Card>
    </div>
  );
}

export default AICard;
