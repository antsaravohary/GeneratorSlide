import React, { useEffect, useState } from "react";
import { OpenAIApi, Configuration } from "openai";
import axios from "axios";
import { API } from "../constant";

interface ResponseApi {
  response: string;
}
function Generator({ response }: ResponseApi) {
  const data = response?.split("\n");
  const [first, ...rest] = data;

  return (
    <div className="w-96">
      <div className="h-[298px] bg-gray-100 ">
        {rest?.map((e, index) => {
          return (
            <p
              key={index}
              className="mt-4 text-center block align-middle font-semibold"
            >
              {e}
            </p>
          );
        })}
      </div>
      <button
        onClick={() => {}}
        className="mt-5 w-96 bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Create file
      </button>
    </div>
  );
}

export default Generator;
