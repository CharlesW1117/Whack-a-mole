import { useState } from "react";

export default function Field({ increaseScore }) {
  const NUM_HOLES = 9;
  const [field, setField] = useState(() => {
    const initial = Array(NUM_HOLES).fill(false);
    const moleIndex = Math.floor(Math.random() * NUM_HOLES);
    initial[moleIndex] = true;
    return initial;
  });

  function whackMole(index) {
    if (!field[index]) return; // only respond if mole is clicked

    increaseScore(); // increase score

    const newField = Array(NUM_HOLES).fill(false);
    let newMoleIndex = Math.floor(Math.random() * NUM_HOLES);

    // ensure the mole moves to a different hole
    while (newMoleIndex === index) {
      newMoleIndex = Math.floor(Math.random() * NUM_HOLES);
    }

    newField[newMoleIndex] = true;
    setField(newField);
  }

  return (
    <div className="field">
      {field.map((hasMole, index) => (
        <div key={index} className={`hole ${hasMole ? 'mole' : ''}`} onClick={() => whackMole(index)}>
        </div>
      ))}
    </div>
  );
}
