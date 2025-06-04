import React, { useEffect, useState } from 'react';
import { getAllSideQuests, saveAllSideQuests, saveSideQuest } from './db/idb';
import './styles/sideQuest.css';

// SideQuest tasks/items
const SIDEQUESTS = [
  "Name 10 cities from your home country to get 20 doekoe", "Throw doubles to get 100 doekoe. You have one try!",
  "Do a dance for 10 seconds to get 50 doekoe", "Sing a song of your choice to get 30 doekoe",
  "Do 10 push-ups to get 50 doekoe",
];

// Max number of sidequests to generate
const SIDEQUEST_COUNT = 14;

// Shuffle function to randomize tasks
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Generate sidequests with unique tasks
function generateSideQuests(num = SIDEQUEST_COUNT) {
  const count = Math.min(num, SIDEQUESTS.length);
  const shuffledTasks = shuffle(SIDEQUESTS).slice(0, count);
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: 'SideQuest',
    revealedTask: shuffledTasks[i], // Unique task
    isCompleted: false,
  }));
}

// Main SideQuestApp component
function SideQuestApp() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load sidequests from IndexedDB or generate new ones
  useEffect(() => {
    getAllSideQuests().then(storedQuests => {
      if (!storedQuests || storedQuests.length === 0) {
        const initialQuests = generateSideQuests();
        saveAllSideQuests(initialQuests).then(() => {
          setQuests(initialQuests);
          setLoading(false);
        });
      } else {
        setQuests(storedQuests);
        setLoading(false);
      }
    });
  }, []);

  // Reveal a sidequest and save the state
  const revealQuest = async (quest) => {
    if (quest.isCompleted) return;
    const updatedQuest = { ...quest, isCompleted: true };
    await saveSideQuest(updatedQuest);
    setQuests(quests.map(q => q.id === quest.id ? updatedQuest : q));
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</div>;
  }

  return (
    <div className="sidequest-container">
      <h1>🗺️ SideQuest Reveal 🗺️</h1>
      <p className="sidequest-description">
        Click a SideQuest to reveal your challenge!<br />
        Each quest is unique, and your progress is saved offline.
      </p>
      <div className="sidequest-grid">
        {quests.map(quest => (
          <div
            key={quest.id}
            className="sidequest-card"
            onClick={() => revealQuest(quest)}
            tabIndex={0}
            aria-label={quest.isCompleted ? `Completed: ${quest.revealedTask}` : "Hidden SideQuest"}
          >
            <span className="sidequest-emoji">
              {quest.isCompleted ? quest.revealedTask : "🗺️"}
            </span>
            <span className="sidequest-status">
              {quest.isCompleted ? "Revealed" : "Tap to reveal"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideQuestApp;
