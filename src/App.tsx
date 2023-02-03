import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Generator from "./components/Generator";
import Presentation from "./components/Presentation";
import { API } from "./constant";

function App() {
  const [response, setResponse] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const token = "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";
  const api = API;
  console.log("api", api);

  const configuration = new Configuration({
    apiKey: token,
  });
  const openai = new OpenAIApi(configuration);

  const fetchData = async () => {
    const response = await openai.createCompletion({
      prompt: `Suggest 3 title topics we can talk about ${title}`,
      model: "text-davinci-003",
      max_tokens: 200,
    });
    const data = response.data.choices[0].text as string;
    console.log(data);

    setResponse(data);
  };
  return (
    <div className="flex justify-center space-x-10 mt-10">
      <Presentation dataHandler={fetchData} title={setTitle} />
      <Generator response={response} />
    </div>
  );
}

export default App;
