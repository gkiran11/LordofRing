import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CharacterList from "./CharacterList";

const Data = () => {
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCharacterData();
  }, []);
  const fetchCharacterData = async () => {
    try {
      const token = "M2QhoK9zYDxnlNlPseCl";
      await axios
        .get("https://the-one-api.dev/v2/character", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCharacter(response.data.docs);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? <p>Loading...</p> : <CharacterList characters={character} />}
    </div>
  );
};

export default Data;
