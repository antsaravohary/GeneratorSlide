import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

interface ResponseApi {
  response: string;
  intro: boolean;
  conclu: boolean;
  createSlide: (request: any) => void;
  loading: boolean;
}

function Generator({
  response,
  intro,
  conclu,
  createSlide,
  loading,
}: ResponseApi) {
  const data = response?.split("\n");
  const [first, ...rest] = data;

  return (
    <div className="w-96">
      {!loading ? (
        <div className="h-[298px] bg-gray-100 p-2">
          {intro ? <p className="w-full flex justify-center p-4">Introduction</p> : null}

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
          {conclu ? <p className="w-full flex justify-center p-4">Conclusion</p> : null}
        </div>
      ) : (
        <div className="h-[298px] bg-gray-100 flex justify-center items-center p-2">
          <BeatLoader color="#36d7b7" />
        </div>
      )}
      <button
        onClick={() => createSlide("test")}
        className="mt-5 w-96 bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Create file
      </button>
    </div>
  );
}

export default Generator;
