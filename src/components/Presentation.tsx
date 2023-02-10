import React, { useEffect, useState } from "react";

interface PropsPresenation {
  dataHandler: any;
  title: (title: string) => void;
  updateConclusion: (update: boolean) => void;
  updateIntroduction: (update: boolean) => void;
}
function Presentation({
  dataHandler,
  title,
  updateConclusion,
  updateIntroduction,
}: PropsPresenation) {
  const [input, setInput] = useState<string>("");
  const [toggleOne, setToggleOne] = useState<boolean>(false);
  const [toggleTwo, setToggleTwo] = useState<boolean>(false);

  // useEffect(() => {
  //   updateIntroduction(toggleOne);
  //   updateConclusion(toggleTwo);
  // }, [toggleOne, toggleTwo]);

  return (
    <div className="w-96">
      <p className="text-xl text-center font-semibold">
        Presentation Generator
      </p>
      <div className="">
        <p className="text-center mt-3">Do you want an introduction ?</p>
        <div className="flex p-2.5 justify-center ">
          <p>No</p>
          <div
            className={`w-12 h-6 flex items-center  rounded-full mx-3 px-1 ${
              toggleOne ? "bg-green-600" : "bg-gray-300"
            }`}
            onClick={() => {
              setToggleOne(!toggleOne);
              updateIntroduction(toggleOne);
            }}
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
            onClick={() => {
              setToggleTwo(!toggleTwo);
              updateConclusion(toggleTwo);
            }}
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
      <div className="flex justify-center space-x-4">
        <div>
          <label className="align-middle">Pick a template</label>
        </div>
        <select
          id="default"
          className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-auto p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultChecked>Pick template</option>
          <option value="1FSl0HXV-DakETpGFo5_twMmsd_Y0s2zgkrm0aKi4gsU">Coral</option>
          <option value="1Kqv5zPolpfJfzejZlSz1cfn6mznuZQD4ymk5bLYpC7k">Swiss</option>
          <option value="14wzGoaUl9MaptFluU7d2wd32NXKnGV1xVy3YGD">Plum</option>
          <option value="1P8KtuW4l_GiC50g-cwICdD9BpaO006llMNWqqiGN7-4">ModernWriter</option>
          <option value="1rsPheFi_DJZy_87AWc_bKg0rBYrLacEtE4gF2SoZ20">Luxe</option>
          <option value="1ExyubR_a46JNlDeWKCXywAR7U5lYC6P-oIBM8TXF2gY">Tropic</option>
          
        </select>
      </div>
      <div className="mb-6">
        <div>
          <p className="text-center">
            <label htmlFor="default-input">Subject</label>
          </p>
        </div>

        <input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
            title(input);
          }}
          type="text"
          id="default-input"
          className=" my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          onClick={() => {
            dataHandler(toggleOne, toggleTwo, 3);
            setInput("");
          }}
          className="w-96 bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate outline
        </button>
      </div>
    </div>
  );
}

export default Presentation;
