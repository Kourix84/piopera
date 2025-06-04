import React, { useEffect, useState } from 'react';
import { getAllMysteryBoxes, saveAllMysteryBoxes, saveMysteryBox } from './db/idb';
import mysteryBoxIcon from './assets/mysterybox.svg';
import './styles/mysteryboxes.css';

// Mystery box items
const ITEMS = [
  "Go to jail", "Pay 100 doekoe to the golden pot", "Give every player 20 doekoe", "Get a free sticker",
  "Get 100 doekoe from the bank", "Move to the Golden Pot", "Go to the Start", "Go 3 steps back", "Go 3 steps forward",
  "Steal a sticker from another player", "Go to the pirates!", "Give a sticker to another player"
];

// Max number of mystery boxes to generate
const MYSTERY_BOX_COUNT = 14;

// Shuffle function to randomize items
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate mystery boxes with unique items
function generateMysteryBoxes(num = MYSTERY_BOX_COUNT) {
  const count = Math.min(num, ITEMS.length);
  const shuffledItems = shuffle(ITEMS).slice(0, count);
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: 'Mystery Box',
    revealedItem: shuffledItems[i], // Unique item
    isOpened: false,
  }));
}

// Main App component
function App() {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load mystery boxes from IndexedDB or generate new ones
  // on initial render
  useEffect(() => {
    getAllMysteryBoxes().then(storedBoxes => {
      if (!storedBoxes || storedBoxes.length === 0) {
        const initialBoxes = generateMysteryBoxes();
        saveAllMysteryBoxes(initialBoxes).then(() => {
          setBoxes(initialBoxes);
          setLoading(false);
        });
      } else {
        setBoxes(storedBoxes);
        setLoading(false);
      }
    });
  }, []);

  // Open a mystery box and save the state
  const openBox = async (box) => {
    if (box.isOpened) return;
    const updatedBox = { ...box, isOpened: true };
    await saveMysteryBox(updatedBox);
    setBoxes(boxes.map(b => b.id === box.id ? updatedBox : b));
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1>Mystery Boxes</h1>
      <p className="app-description">
        Click a box to reveal a random item!<br />
        Each item is unique, and your progress is saved offline.
      </p>
      <div className="mystery-boxes-grid">
        {boxes.map(box => (
          <div
            key={box.id}
            className="mystery-box"
            onClick={() => openBox(box)}
            tabIndex={0}
            aria-label={box.isOpened ? 'Opened: ${box.revealedItem}' : "Closed mystery box"}
          >
            <span className="mystery-emoji">
              {box.isOpened ? box.revealedItem : <img src={mysteryBoxIcon} alt="Mystery Box" style={{ width: '80px', height: '80px' }} />}
            </span>
            <span className="mystery-status">{box.isOpened ? "Opened" : "Tap to reveal"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
