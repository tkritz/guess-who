import React, { useState } from "react";
import "./App.css";
import plainChar from "./assets/plain_char.png";
import xIcon from "./assets/x_icon.png";

const mediaOptions = {
  "Stardew Valley": [
    "Sebastian",
    "Haley",
    "Alex",
    "Elliott",
    "Sam",
    "Abigail",
    "Leah",
    "Shane",
    "Emily",
    "Harvey",
    "Maru",
    "Penny",
    "Caroline",
    "Clint",
    "Demetrius",
    "Gus",
    "Jodi",
    "Kent",
    "Lewis",
    "Marnie",
    "Linus",
    "Pam",
    "Pierre",
    "Robin",
    "Evelyn",
    "George",
    "Jas",
    "Vincent",
  ],
  "Attack on Titan": [
    "Eren",
    "Mikasa",
    "Armin",
    "Levi",
    "Erwin",
    "Hange",
    "Connie",
    "Sasha",
    "Jean",
    "Marco",
    "Reiner",
    "Annie",
    "Ymir",
    "Historia",
    "Gabi",
    "Falco",
    "Zeke",
    "Pieck",
    "Grisha",
    "Carla",
    "Bertolt",
    "Moblit",
    "Onyankopon",
    "Niccolo",
    "Petra",
    "Pyxis",
    "Hannes",
    "Hitch",
  ],
  "Genshin Impact": [
    "Ningguang",
    "Beidou",
    "Bennett",
    "Zhongli",
    "Raiden",
    "Yae Miko",
    "Razor",
    "Hu Tao",
    "Xiao",
    "Lisa",
    "Jean",
    "Kaeya",
    "Kazuha",
    "Klee",
    "Navia",
    "Neuvillette",
    "Furina",
    "Venti",
    "Childe",
    "Ayaka",
    "Ayato",
    "Yelan",
    "Ganyu",
    "Shenhe",
    "Nahida",
    "Traveler",
    "Kaveh",
    "Alhaitham",
    "Arlecchino",
    "Kinich",
    "Xiangling",
    "Fischl",
    "Gorou",
    "Cyno",
    "Keqing"
  ],
  "Arcane": [
    "Jinx",
    "Vi",
    "Caitlyn",
    "Ekko",
    "Vander",
    "Isha",
    "Heimerdinger",
    "Mel",
    "Ambessa",
    "Silco",
    "Cassandra",
    "Tobias",
    "Viktor",
    "Sevika",
    "Jayce",
    "Mylo",
    "Claggor",
    "Marcus",
    "Grayson",
    "Salo",
    "Singed",
    "Smeech",
    "Huck",
    "Loris",
    "Maddie",
    "Lest",
    "Shoola",
    "Benzo"
  ], 
  "Harry Potter": [
    "Harry",
    "Voldemort",
    "Hermione",
    "Ron",
    "Dumbledore",
    "Snape",
    "Hagrid",
    "Draco",
    "Dobby",
    "Bellatrix",
    "Sirius",
    "Ginny",
    "Neville",
    "Luna",
    "Mcgonagall",
    "Molly",
    "Dolores",
    "Lucius",
    "Fred",
    "George",
    "Remus",
    "Alastor",
    "Cedric",
    "Lily",
    "James",
    "Cho",
    "Trelawney",
    "Narcissa",
  ],
};

function App() {
  const [selectedMedia, setSelectedMedia] = useState("Stardew Valley");
  const [selectedCharacters, setSelectedCharacters] = useState(
    mediaOptions[selectedMedia]
  );
  const [originalCharacters, setOriginalCharacters] = useState(
    mediaOptions[selectedMedia]
  );
  const [assignedCharacter, setAssignedCharacter] = useState(null);
  const [overlayState, setOverlayState] = useState({});
  const [disabledCharacter, setDisabledCharacter] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const toggleOverlay = (character) => {
    setOverlayState((prev) => ({
      ...prev,
      [character]: !prev[character],
    }));
  };

  const assignRandomCharacter = () => {
    const randomChar =
      selectedCharacters[
        Math.floor(Math.random() * selectedCharacters.length)
      ];
    if (disabledCharacter) {
      setOverlayState((prev) => ({
        ...prev,
        [disabledCharacter]: false,
      }));
    }
    setOverlayState({});
    setAssignedCharacter(randomChar);
    setDisabledCharacter(randomChar);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSelectedMedia(option);
    setIsDropdownVisible(false);
    setSelectedCharacters(mediaOptions[option]);
    setOriginalCharacters(mediaOptions[option]);
    setAssignedCharacter(null);
    setDisabledCharacter(null);
    setOverlayState({});
  };

  const capitalizeName = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const handleRemoveCharacter = () => {
    const normalizedInput = capitalizeName(inputValue);
    if (selectedCharacters.includes(normalizedInput)) {
      setSelectedCharacters((prev) =>
        prev.filter((character) => character !== normalizedInput)
      );
      setInputError("");
    } else {
      setInputError("Not a valid character");
      setTimeout(() => setInputError(""), 2000);
    }
    setInputValue("");
  };

  const resetGrid = () => {
    setSelectedCharacters(originalCharacters);
    setOverlayState({});
    setDisabledCharacter(null);
  };

  // Dynamically adjust height for game-container
  const getGameContainerHeight = () => {
    const rows = Math.ceil(selectedCharacters.length / 7); // 7 items per row
    const itemHeight = 153 + 5; // Item height + gap
    return rows * itemHeight + 10; // Add padding
  };

  return (
    <div className="App">
      <header className="header-container">
        <h1 className="heading-text">GUESS WHO?</h1>
        <div className="mode-dropdown">
          <button className="mode-button" onClick={toggleDropdown}>
            Mode
          </button>
          {isDropdownVisible && (
            <div className="dropdown-content">
              {Object.keys(mediaOptions).map((option) => (
                <button
                  key={option}
                  className="dropdown-item"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className="main-section">
        <div
          className="game-container"
          style={{
            height: selectedCharacters.length <= 21 ? getGameContainerHeight() : "80vh",
          }}
        >
          {selectedCharacters.map((character) => (
            <div
              key={character}
              className={`grid-item ${
                disabledCharacter === character ? "disabled" : ""
              }`}
              onClick={() =>
                disabledCharacter !== character && toggleOverlay(character)
              }
            >
              <img
                src={`./characters/${selectedMedia}/${character}.png`}
                alt={character}
                className="character-image"
              />
              <div className="name-tag">{character.toUpperCase()}</div>
              {overlayState[character] && (
                <div
                  className="overlay-image"
                  style={{ backgroundImage: `url(${xIcon})` }}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="side-container">
          <div className="text-tag">YOUR CHARACTER:</div>
          <div className="character-display">
            <div className="character-card-container">
              <img
                src={
                  assignedCharacter
                    ? `./characters/${selectedMedia}/${assignedCharacter}.png`
                    : plainChar
                }
                alt="Assigned Character"
                className="character-card"
              />
              <div className="name-tag">
                {assignedCharacter ? assignedCharacter.toUpperCase() : ""}
              </div>
            </div>
            <button className="custom-char-button" onClick={assignRandomCharacter}>
              GET CHARACTER
            </button>
          </div>
        </div>
      </section>

      {/* Circular Button */}
      <button
        className="circle-button"
        onClick={() => setIsInputVisible((prev) => !prev)}
      >
        +
      </button>

      {isInputVisible && (
        <div className="input-modal">
          <input
            type="text"
            placeholder="Enter character name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="character-input"
          />
          <button onClick={handleRemoveCharacter} className="submit-button">
            Remove
          </button>
          <button onClick={resetGrid} className="reset-button">
            Reset Grid
          </button>
          {inputError && <div className="error-message">{inputError}</div>}
        </div>
      )}
    </div>
  );
}

export default App;