import { TextArea } from "@ui5/webcomponents-react";
import "../css/Dialog.css";
import { Card, CardHeader, Icon, Button } from "@ui5/webcomponents-react";
import { useState, useEffect } from "react";

function NotesCard({ isSubmitted }) {
  const [textArea, setTextArea] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/functionSpec")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("response raw", response);
        let jsonResponse = await response.json();
        console.log("response", jsonResponse);
        return jsonResponse;
      })
      .then((data) => {
        setTextArea(data.functionSpec);
      })
      .catch((error) => {
        console.error("There was an error fetching the value!", error);
      });
  }, []);

  let onSend = async function () {
    console.log("发出的body是", JSON.stringify({ functionSpec: textArea }));
    fetch("http://localhost:8080/functionSpec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ functionSpec: textArea }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        alert("Updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the value!", error);
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
        <TextArea
          value={textArea}
          id="notes"
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
        <Button onClick={onSend}>update</Button>
      </div>
    </Card>
  );
}

export default NotesCard;
