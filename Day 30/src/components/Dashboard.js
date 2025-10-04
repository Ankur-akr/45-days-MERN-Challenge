import React, { useState } from "react";
import Modal from "./Modal";
import { ButtonGroup, Button } from "./CompoundButton";
import DataFetcher from "./DataFetcher";

export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleButtonClick = (label) => {
    setSelected(label);
    setModalOpen(true);
  };

  return (
    <div className="dashboard">
      <h2>Advanced Component Integration</h2>

      <ButtonGroup onClick={handleButtonClick}>
        <Button label="Profile" />
        <Button label="Settings" />
        <Button label="Analytics" />
      </ButtonGroup>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <h3>{selected} Modal</h3>
          <p>This modal is rendered using a React Portal.</p>
        </Modal>
      )}

      <h3>Render Props Example:</h3>
      <DataFetcher url="https://jsonplaceholder.typicode.com/posts">
        {(data) =>
          data ? (
            <ul>
              {data.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          ) : (
            <p>Loading data...</p>
          )
        }
      </DataFetcher>
    </div>
  );
}