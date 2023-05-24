import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export default function Loading({ obscuro, text }) {
  return (
    <div className="conteiner-files">
      <Dimmer
        style={{
          backgroundColor: obscuro ? "#424E5E" : "#ffffff",
        }}
        active
        inverted
      >
        <Loader style={{
            color: obscuro ? "#ffffff" : "#000000",
        }} inverted>{text}</Loader>
      </Dimmer>
    </div>
  );
}
