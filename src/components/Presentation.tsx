import React, { useState } from "react";

function Presentation() {
  const [toggleOne, setToggleOne] = useState<boolean>(false);
  const [toggleTwo, setToggleTwo] = useState<boolean>(false);
  return (
    <div className="w-96">
      <p className="text-xl text-center">Presentation Generator</p>
      <div className="">
        <p className="text-center">Do you want an introduction ?</p>
        <div className="flex p-2.5 justify-center ">
          <p>No</p>
          <div
            className={`w-12 h-6 flex items-center  rounded-full mx-3 px-1 ${
              toggleOne ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => setToggleOne(!toggleOne)}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                toggleOne ? "translate-x-6" : "translate-x-0"
              } `}
            ></div>
          </div>
          <p>Yes</p>
        </div>
        <p className="text-center">And what about a conclusion ?</p>
        <div className="flex p-2.5 justify-center">
          <p>No</p>
          <div
            className={`w-12 h-6 flex items-center  rounded-full mx-3 px-1 ${
              toggleTwo ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => setToggleTwo(!toggleTwo)}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                toggleTwo ? "translate-x-6" : "translate-x-0"
              } `}
            ></div>
          </div>
          <p>Yes</p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex">
          <label>Pick a template</label>
          <select
            id="default"
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>
      </div>
      <div className="  mb-6">
        <p className="text-center">
          <label htmlFor="default-input" className=" mb-2">
            Submit
          </label>
        </p>

        <input
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button className="w-96 bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Generate outline
        </button>
      </div>
    </div>
  );
}

export default Presentation;
