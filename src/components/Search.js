import {
  DotsVerticalIcon,
  MapIcon,
  MicrophoneIcon,
  NewspaperIcon,
  PhotographIcon,
  PlayIcon,
  SearchIcon,
  XIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import { useHistory, useParams } from "react-router-dom";
import { CogIcon, ViewGridIcon } from "@heroicons/react/outline";
import Response from "./Response";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [index, setIndex] = useState(1);
  const [results, setResults] = useState([]);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    setInputValue(params.query);
    setIndex(params.index);
    searchData(params.query, params.index);
  }, [params.query, params.index]);

  const searchData = async (value, index) => {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyCbNBXRrRCCINjkQ6pbbri9S5Ur3GhmVto&cx=104b02e0506524e9e&q=${
        value
      }&start=${index}`
    );
    const data = await response.json();
    // const data = Response;
    setResults(data);
  };

  const onSearch = (e) => {
    e.preventDefault();

    if (!inputValue) return;
    history.push(`/tooble/search/${inputValue}/${index}`);
  };

  const headerOptions = [
    {
      Icon: SearchIcon,
      title: "All",
      selected: true,
    },
    {
      Icon: PhotographIcon,
      title: "Images",
      selected: false,
    },
    {
      Icon: PlayIcon,
      title: "Videos",
      selected: false,
    },
    {
      Icon: NewspaperIcon,
      title: "News",
      selected: false,
    },
    {
      Icon: MapIcon,
      title: "Maps",
      selected: false,
    },
    {
      Icon: DotsVerticalIcon,
      title: "More",
      selected: false,
    },
  ];

  return (
    <div>
      <header className="sticky top-0 bg-white">
        <div className="flex w-full p-6 pl-20 items-center">
          <img
            loading="lazy"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="logo"
            className="h-8 cursor-pointer"
            onClick={() => history.push("/tooble")}
          />
          <form className="flex flex-grow px-6 py-3 ml-10 mr-5 border border-gray-200 rounded-full shadow-lg hover:shadow-xl max-w-3xl items-center">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow w-full focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <div className={`${inputValue && "border-r-2"}`}>
              <XIcon
                className={`h-6 sm:mr-3 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-125 ${
                  !inputValue && "invisible"
                }`}
                onClick={() => setInputValue("")}
              />
            </div>
            <MicrophoneIcon className="mr-3 h-6 hidden sm:inline-flex text-blue-500 pl-4 border-gray-300" />
            <SearchIcon className="h-6 hidden text-blue-500 sm:inline-flex" />
            <button hidden type="submit" onClick={onSearch} />
          </form>
          <div className="ml-auto flex justify-center items-center">
            <CogIcon className="h-10 text-gray-500 p-2 mr-3 rounded-full hover:bg-gray-100 cursor-pointer" />
            <ViewGridIcon className="h-10 text-gray-500 p-2 mr-3 rounded-full hover:bg-gray-100 cursor-pointer" />
            <img
              loading="lazy"
              className="h-10 w-10 rounded-full cursor-pointer object-cover transition duration-150 transform hover:scale-110 "
              src="https://images.unsplash.com/photo-1667788383721-8fa5975e363b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzOXx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
              alt="profile"
            />
          </div>
        </div>
        <div className="flex w-full text-gray-700 justify-evenly text-sm lg:text-base lg:justify-start lg:space-x-56 lg:pl-56 border-b-[1px]">
          <div className="flex space-x-6">
            {headerOptions.map((option, i) => {
              return (
                <div
                  key={i}
                  className={`flex items-center space-x-1 border-b-4 border-transparent hover:text-blue-500 hover:border-blue-500 pb-3 cursor-pointer ${
                    option.selected && "text-blue-500 border-blue-500"
                  }`}
                >
                  <option.Icon className="h-4" />
                  <p className="hidden sm:inline-flex">{option.title}</p>
                </div>
              );
            })}
          </div>
          <p className="link">Tools</p>
        </div>
      </header>
      <SearchResults results={results} />
    </div>
  );
}

export default Search;
