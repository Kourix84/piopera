import React, { useEffect, useState, useRef } from "react";
import { getFinishedCities, addFinishedCity } from './db/idb';
import './styles/quiz.css';

// Example quiz data (add your cities here)
const QUIZ = {
  // NETHERLANDS
  Eindhoven: [
    {
      question: "When was Philips founded?",
      options: [
        { label: "A", text: "1891", correct: true },
        { label: "B", text: "1994", correct: false },
        { label: "C", text: "1888", correct: false }
      ]
    },
    {
      question: "Which river flows through Eindhoven?",
      options: [
        { label: "A", text: "Maas", correct: false },
        { label: "B", text: "Rijn", correct: false },
        { label: "C", text: "Dommel", correct: true }
      ]
    },
    {
      question: "What is the nickname for Eindhoven?",
      options: [
        { label: "A", text: "Havenstad", correct: false },
        { label: "B", text: "Lichtstad", correct: true },
        { label: "C", text: "Koekstad", correct: false }
      ]
    }
  ],
  Den_Haag: [
    {
      question: "What important international institution is based in The Hague?",
      options: [
        { label: "A", text: "European Parliament", correct: false },
        { label: "B", text: "International Court of Justice", correct: true },
        { label: "C", text: "United Nations Headquarters", correct: false }
      ]
    },
    {
      question: "Which beachside district in The Hague is popular for tourists and locals?",
      options: [
        { label: "A", text: "Jordaan", correct: false },
        { label: "B", text: "Scheveningen", correct: true },
        { label: "C", text: "Zandvoort", correct: false }
      ]
    },
    {
      question: "What type of art is the Mauritshuis museum in The Hague famous for?",
      options: [
        { label: "A", text: "Modern abstract art", correct: false },
        { label: "B", text: "Contemporary sculpture", correct: false },
        { label: "C", text: "Dutch Golden Age paintings", correct: true }
      ]
    }
  ],
    Amsterdam: [
    {
      question: "What is the name of the main river that runs through Amsterdam?",
      options: [
        { label: "A", text: "Maas", correct: false },
        { label: "B", text: "Rijn", correct: false },
        { label: "C", text: "Amstel ", correct: true }
      ]
    },
    {
      question: "Which famous museum in Amsterdam is dedicated to a young Jewish girl who wrote a diary during World War II?",
      options: [
        { label: "A", text: "Van Gogh Museum", correct: false },
        { label: "B", text: "Anne Frank House", correct: true },
        { label: "C", text: "Rijksmuseum", correct: false }
      ]
    },
    {
      question: "What are the traditional Dutch houses in Amsterdam most famous for?",
      options: [
        { label: "A", text: "Colorful rooftops", correct: false },
        { label: "B", text: " Narrow, tall design with large windows", correct: true },
        { label: "C", text: "Underground rooms", correct: false }
      ]
    }
  ],
  // SPAIN
  Madrid: [
    {
      question: "What is the name of Madrid's famous central square?",
      options: [
        { label: "A", text: "Plaza de España", correct: false },
        { label: "B", text: "Plaza Mayor", correct: true },
        { label: "C", text: "Plaza Real", correct: false }
      ]
    },
    {
      question: "Which world-famous art museum is located in Madrid?",
      options: [
        { label: "A", text: "Louvre Museum", correct: false },
        { label: "B", text: "Prado Museum", correct: true },
        { label: "C", text: "Madrid Museum", correct: false }
      ]
    },
    {
      question: "What is the name of the large royal residence located in Madrid?",
      options: [
        { label: "A", text: "Alhambra", correct: false },
        { label: "B", text: "Royal Palace of Madrid", correct: true },
        { label: "C", text: "El Escorial", correct: false }
      ]
    }
  ],
  Barcelona: [
    {
      question: "What famous architect is most associated with Barcelona's unique architecture?",
      options: [
        { label: "A", text: "Le Corbusier", correct: false },
        { label: "B", text: "Frank Lloyd Wright", correct: false },
        { label: "C", text: "Antoni Gaudí", correct: true }
      ]
    },
    {
      question: "What is the name of Barcelona's most famous unfinished church?",
      options: [
        { label: "A", text: "Catedral de la Almudena", correct: false },
        { label: "B", text: "Sagrada Família", correct: true },
        { label: "C", text: "Santa Maria del Fiore", correct: false }
      ]
    },
    {
      question: "What is the name of the famous street in Barcelona known for shopping, street performers, and cafés?",
      options: [
        { label: "A", text: "Passeig de Gràcia", correct: false },
        { label: "B", text: "La Rambla", correct: true },
        { label: "C", text: "Gran Vía", correct: false }
      ]
    }
  ],
  Sevilla: [
    {
      question: "In which region of Spain is Seville located?",
      options: [
        { label: "A", text: "Catalonia", correct: false },
        { label: "B", text: "Galicia", correct: false },
        { label: "C", text: "Andalusia", correct: true }
      ]
    },
    {
      question: "Which traditional Spanish dance is closely associated with Seville?",
      options: [
        { label: "A", text: "Sardana", correct: false },
        { label: "B", text: "Flamenco", correct: true },
        { label: "C", text: "Jota", correct: false }
      ]
    },
    {
      question: "What is the name of the beautiful palace complex in Seville with Moorish architecture?",
      options: [
        { label: "A", text: "Real Alcázar", correct: true },
        { label: "B", text: "Alhambra", correct: false },
        { label: "C", text: "Casa Batlló", correct: false }
      ]
    }
  ],
  // FRANCE
  Paris: [
    {
      question: "Which river flows through the city of Paris?",
      options: [
        { label: "A", text: "Thames", correct: false },
        { label: "B", text: "Danube", correct: false },
        { label: "C", text: "Seine", correct: true }
      ]
    },
    {
      question: "What is the name of the world-famous art museum in Paris that houses the Mona Lisa?",
      options: [
        { label: "A", text: "The Louvre", correct: true },
        { label: "B", text: "Musée d'Orsay", correct: false },
        { label: "C", text: "Prado Museum", correct: false }
      ]
    },
    {
      question: "What is the name of the famous street known for luxury shopping in Paris?",
      options: [
        { label: "A", text: "Champs-Élysées", correct: true },
        { label: "B", text: "Rue de Rivoli", correct: false },
        { label: "C", text: "Boulevard Haussmann", correct: false }
      ]
    }
  ],
  Toulouse: [
    {
      question: "What is Toulouse's nickname due to the color of its buildings?",
      options: [
        { label: "A", text: "The Golden City", correct: false },
        { label: "B", text: "The White City", correct: false },
        { label: "C", text: "The Pink City", correct: true }
      ]
    },
    {
      question: "Which major industry is Toulouse known for?",
      options: [
        { label: "A", text: "Aerospace", correct: true },
        { label: "B", text: "Fashion", correct: false },
        { label: "C", text: "Wine Production", correct: false }
      ]
    },
    {
      question: "What famous aircraft manufacturer has its headquarters in Toulouse?",
      options: [
        { label: "A", text: "Airbus", correct: true },
        { label: "B", text: "Boeing", correct: false },
        { label: "C", text: "Dassault", correct: false }
      ]
    }
  ],
  Nice: [
    {
      question: "What sea borders the city of Nice?",
      options: [
        { label: "A", text: "North Sea", correct: false },
        { label: "B", text: "Aegean Sea", correct: false },
        { label: "C", text: "Mediterranean Sea", correct: true }
      ]
    },
    {
      question: "In which region of France is Nice located?",
      options: [
        { label: "A", text: "Provence-Alpes-Côte d'Azur", correct: true },
        { label: "B", text: "Brittany", correct: false },
        { label: "C", text: "Normandy", correct: false }
      ]
    },
    {
      question: "What is the name of the famous seaside promenade in Nice?",
      options: [
        { label: "A", text: "Promenade des Anglais", correct: true },
        { label: "B", text: "Boulevard Saint-Michel", correct: false },
        { label: "C", text: "Avenue des Champs-Élysées", correct: false }
      ]
    }
  ],
  // ITALY
  Naples: [
    {
      question: "Which world-famous dish originated in Naples?",
      options: [
        { label: "A", text: "Lasagna", correct: false },
        { label: "B", text: "Spaghetti Carbonara", correct: false },
        { label: "C", text: "Pizza", correct: true }
      ]
    },
    {
      question: "Naples is located near which active volcano?",
      options: [
        { label: "A", text: "Mount Vesuvius", correct: true },
        { label: "B", text: "Mount Stromboli", correct: false },
        { label: "C", text: "Mount Etna", correct: false }
      ]
    },
    {
      question: "What is the name of the large castle overlooking the Bay of Naples?",
      options: [
        { label: "A", text: "Castel dell'Ovo", correct: true },
        { label: "B", text: "Castel Sant'Angelo", correct: false },
        { label: "C", text: "Castelvecchio", correct: false }
      ]
    }
  ],
  Rome: [
    {
      question: "What is the name of the ancient Roman amphitheater located in the center of Rome?",
      options: [
        { label: "A", text: "Pantheon", correct: false },
        { label: "B", text: "Colosseum", correct: true },
        { label: "C", text: "Forum", correct: false }
      ]
    },
    {
      question: "Which independent city-state is located entirely within Rome?",
      options: [
        { label: "A", text: "Vatican City", correct: true },
        { label: "B", text: "Monaco", correct: false },
        { label: "C", text: "San Marino", correct: false }
      ]
    },
    {
      question: "What is the name of the river that runs through Rome?",
      options: [
        { label: "A", text: "Arno", correct: false },
        { label: "B", text: "Po", correct: false },
        { label: "C", text: "Tiber", correct: true }
      ]
    }
  ],
  Florence: [
    {
      question: "Florence is widely considered the birthplace of which cultural movement?",
      options: [
        { label: "A", text: "Baroque", correct: false },
        { label: "B", text: "Enlightenment", correct: false },
        { label: "C", text: "Renaissance", correct: true }
      ]
    },
    {
      question: "What is the name of the famous cathedral with a large dome in Florence?",
      options: [
        { label: "A", text: "Santa Maria del Fiore", correct: true },
        { label: "B", text: "Basilica di San Giovanni", correct: false },
        { label: "C", text: "St. Mark's Basilica", correct: false }
      ]
    },
    {
      question: "Which famous artist designed the dome of Florence's cathedral?",
      options: [
        { label: "A", text: "Leonardo da Vinci", correct: false },
        { label: "B", text: "Michelangelo", correct: false },
        { label: "C", text: "Filippo Brunelleschi", correct: true }
      ]
    }
  ],
  // ...add more cities here
};

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const TIMER = 15;

export default function QuizGame({ goHome }) {
  const [cityQueue, setCityQueue] = useState([]);
  const [currentCityIdx, setCurrentCityIdx] = useState(0);
  const [city, setCity] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(TIMER);
  const [selected, setSelected] = useState(null);
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [cityCompleted, setCityCompleted] = useState(false);
  const timerRef = useRef();

  // On mount: load finished cities and build city queue
  useEffect(() => {
    async function init() {
      const finished = await getFinishedCities();
      const available = Object.keys(QUIZ).filter(city => !finished.includes(city));
      const shuffled = shuffleArray(available);
      setCityQueue(shuffled);
      setCurrentCityIdx(0);
      if (shuffled.length > 0) {
        setCity(shuffled[0]);
        setQuestions(QUIZ[shuffled[0]]);
      }
      setLoading(false);
    }
    init();
  }, []);

  // Timer logic
  useEffect(() => {
    if (lost || won || loading || !city || !started || cityCompleted) return;
    setTime(TIMER);
    setSelected(null);
    timerRef.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setLost(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [step, city, lost, won, loading, started, cityCompleted]);

  // Handle answer
  function handleSelect(opt) {
    if (selected || lost || won || cityCompleted) return;
    setSelected(opt);
    clearInterval(timerRef.current);
    if (!opt.correct) setLost(true);
    else if (step === questions.length - 1) setWon(true);
    else setTimeout(() => setStep(step + 1), 800);
  }

  // When a city is won, show win message, then go home after delay
  useEffect(() => {
    if (!won || !cityQueue.length) return;
    addFinishedCity(cityQueue[currentCityIdx]).then(() => {
      setCityCompleted(true);
      setTimeout(() => {
        if (goHome) goHome();
      }, 2000); // 2 seconds
    });
    // eslint-disable-next-line
  }, [won]);

  // On loss, go home after a short delay
  useEffect(() => {
    if (lost && goHome) {
      const t = setTimeout(() => goHome(), 1800);
      return () => clearTimeout(t);
    }
  }, [lost, goHome]);

  // All cities finished in this session
  if (!loading && (!city || cityQueue.length === 0)) {
    return (
      <div className="quiz-finish-container">
        <h2 className="quiz-complete-title">You completed all cities!</h2>
      </div>
    );
  }

  // Loading
  if (loading || !city) {
    return <div className="quiz-loading">Loading...</div>;
  }

  // Start screen: show city, wait for unlock
  if (!started && !cityCompleted) {
    return (
      <div className="quiz-start-container">
        <div className="quiz-city-label">City</div>
        <div className="quiz-city">{city}</div>
        <button className="quiz-unlock-btn" onClick={() => setStarted(true)}>
          Unlock Questions
        </button>
      </div>
    );
  }

  // Game over (lost)
  if (lost) {
    return (
      <div className="quiz-lost-container">
        <h2 className="quiz-lost-title">You lost!</h2>
        <div className="quiz-lost-msg">Returning to home…</div>
      </div>
    );
  }

  // After finishing a city, show win, then go home (no button)
  if (cityCompleted) {
    return (
      <div className="quiz-city-completed">
        <h2 className="quiz-complete-title">You won this city!</h2>
        <div className="quiz-city">{city}</div>
        <div className="quiz-lost-msg">Returning to home…</div>
      </div>
    );
  }

  // The quiz UI
  const q = questions[step];
  const progress = ((time / TIMER) * 100) + "%";

  return (
    <div className="quiz-root">
      <div className="quiz-header">
        <div className="quiz-city">{city}</div>
        <div className="quiz-question-num">
          Question {step + 1}/{questions.length}
        </div>
      </div>
      <div className="quiz-question-card">{q.question}</div>
      {/* Timer */}
      <div className="quiz-timer-row">
        <span className="quiz-timer-label">Time</span>
        <div className="quiz-timer-bar-bg">
          <div
            className="quiz-timer-bar-fg"
            style={{ width: progress }}
          ></div>
        </div>
        <span className="quiz-timer-count">{`00:${time.toString().padStart(2, '0')}`}</span>
      </div>
      {/* Options */}
      <div className="quiz-options">
        {q.options.map((opt) => {
          let className = "quiz-option";
          if (selected && selected.text === opt.text) {
            className += opt.correct ? " correct" : " wrong";
          }
          return (
            <button
              key={opt.text}
              onClick={() => handleSelect(opt)}
              className={className}
              disabled={!!selected || lost || won || cityCompleted}
            >
              <span className="quiz-option-label">{opt.label}</span>
              {opt.text}
            </button>
          );
        })}
      </div>
      {/* Correct feedback, pause before next question */}
      {won && (
        <div className="quiz-correct-feedback">
          Correct!<br />
          (Last question)
        </div>
      )}
    </div>
  );
}
