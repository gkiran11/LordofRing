import React from "react";

const CharacterDetailsModal = ({ character, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        {" "}
        <h2 className="text-2xl font-bold mb-4">
          Character > {character.name}
        </h2>
        <p>Name: {character.name}</p>
        <p>WikiUrl:{character.wikiUrl}</p>
        <p>Race: {character.race}</p>
        <p>Gender: {character.gender}</p>
        <p>Height: {character.height}</p>
        <p>Hair: {character.hair}</p>
        <p>Realm: {character.realm}</p>
        <p>Birth: {character.birth}</p>
        <p>Spouse: {character.spouse}</p>
        <p>Death: {character.death}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CharacterDetailsModal;
