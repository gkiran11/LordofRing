import React, { useState } from "react";
import CharacterDetailsModal from "./CharacterDetailModal";
import Multiselect from "multiselect-react-dropdown";

const CharacterList = ({ characters }) => {
  const [searchName, setSearchName] = useState("");

  const [selectedGender, setSelectedGender] = useState("any");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const next = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openCharacterDetails = (character) => {
    setSelectedCharacter(character);
  };

  const closeCharacterDetails = () => {
    setSelectedCharacter(null);
  };
  const data = [
    { value: "Hobbit", label: "Hobbit" },
    { value: "Human", label: "Human" },
    { value: "Elf", label: "Elf" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options] = useState(data);

  const filteredCharacters = () => {
    return characters
      .filter((character) =>
        character?.name?.toLowerCase().includes(searchName?.toLowerCase())
      )

      .filter(
        (character) =>
          selectedOptions.length === 0 ||
          selectedOptions.some((option) => option.value === character.race)
      )

      .filter(
        (character) =>
          selectedGender === "any" ||
          character?.gender?.toLowerCase() === selectedGender?.toLowerCase()
      )
      .sort((a, b) =>
        sortOrder === "ascending"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
  };

  const numPages = Math.ceil(filteredCharacters().length / perPage);

  const indexOfLastCharacter = currentPage * perPage;
  const indexOfFirstCharacter = indexOfLastCharacter - perPage;
  const currentCharacters = filteredCharacters()?.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const pageNumbers = [];
  for (let i = 1; i <= numPages; i++) {
    pageNumbers.push(i);
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap space-x-4 mb-4">
        <div className="flex-1">
          <label
            htmlFor="default-search"
            className="text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <input
            type="text"
            className="border rounded p-2 w-full"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="w-1/4">
          {" "}
          <label htmlFor="small" className="text-gray-600 text-sm">
            Sort by Name:
          </label>
          <select
            id="small"
            className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <div className="w-1/4">
          <label htmlFor="small" className="text-gray-600 text-sm">
            Filter by Race:
          </label>
          <Multiselect
            options={options}
            selectedValues={selectedOptions}
            onSelect={(selectedList) => setSelectedOptions(selectedList)}
            onRemove={(selectedList) => setSelectedOptions(selectedList)}
            displayValue="label"
          />
        </div>
        <div className="w-1/4">
          <label htmlFor="small" className="text-gray-600 text-sm">
            Filter by Gender:
          </label>
          <br />
          <select
            id="small"
            className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="any">Any Values</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-1/4">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleSearchSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Race</th>
            <th className="p-2">Gender</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map((character) => (
            <tr key={character.name} className="border-t">
              <td className="p-2">{character.name}</td>
              <td className="p-2">{character.race}</td>
              <td className="p-2">{character.gender}</td>
              <td
                className="p-2"
                onClick={() => openCharacterDetails(character)}
              >
                "details"
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="flex items-center gap-8">
            <ul className="mt-4 flex">
              <li>
                <button
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-white text-gray-500 border border-gray-500"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={prev}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li>
                <button
                  className={`px-3 py-1 rounded ${
                    currentPage === numPages
                      ? "bg-white text-gray-500 border border-gray-500"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={next}
                  disabled={currentPage === numPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="perPage" className="text-gray-600 text-sm">
            Limit
          </label>
          <select
            id="perPage"
            className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {selectedCharacter && (
        <CharacterDetailsModal
          character={selectedCharacter}
          onClose={closeCharacterDetails}
        />
      )}
    </div>
  );
};

export default CharacterList;
