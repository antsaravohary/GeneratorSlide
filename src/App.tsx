import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import Generator from "./components/Generator";
import Presentation from "./components/Presentation";
import client from "../client.json";
import { gapi } from "gapi-script";

const SCOPES =
  "https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file";

const clientId = client.web.client_id;
const api_key = "AIzaSyCEf61GZDszL7PfqGvHUIeFdQkBiokqT6w";
// import { landingRequest } from "./requests/landingRequest";
// import { emphasisrequest } from "./requests/emphasis_request";

function App() {
  const [response, setResponse] = useState<string>("");
  const [introduction, setIntroduction] = useState<boolean>(false);
  const [conclusion, setConclusion] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleSlide, setTitleSlide] = useState<string>("");
  const [parts, setParts] = useState(3);
  const [GoogleAuth, setGoogleAuth] = useState<gapi.auth2.GoogleAuth>();
  const [loading, setLoading] = useState<boolean>(false);

  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  let currentApiRequest: any;

  const token = "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"; // token open ai

  //ai config
  const configuration = new Configuration({
    apiKey: token,
  });
  const openai = new OpenAIApi(configuration);

  React.useEffect(() => {
    //initialize google auth2
    function start() {
      gapi.client
        .init({
          apiKey: api_key,
          clientId: clientId,
          scope: SCOPES,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            "https://slides.googleapis.com/$discovery/rest?version=v1",
          ],
        })
        .then(() => {
          setGoogleAuth(gapi.auth2.getAuthInstance());
          GoogleAuth?.isSignedIn.listen(updateSigninStatus);
        });
    }
    function updateSigninStatus(isSignedIn: boolean) {
      if (isSignedIn) {
        setIsAuthorized(true);
        if (currentApiRequest) {
          console.log("send api");
          //sendAuthorizedApiRequest(currentApiRequest);
        }
      } else {
        setIsAuthorized(false);
      }
    }
    gapi.load("client:auth2", start);
  }, []);

  //ask if user is already authenticated
  function sendAuthorizedApiRequest(requestDetails: any) {
    console.log("test api");
    currentApiRequest = requestDetails;
    if (isAuthorized) {
      console.log("autoriser");
      createPresentation("SLIDE 2", function (response: any) {
        console.log("response slide:", response);
      });
      currentApiRequest = {};
    } else {
      console.log("Non autorisé");
      GoogleAuth?.signIn();
    }
  }

  //ai fetch data
  const fetchData = async (introduction: boolean, conclusion: boolean) => {
    setLoading(true);
    setIntroduction(introduction);
    setConclusion(conclusion);
    try {
      const response = await openai.createCompletion({
        prompt: `Suggest 3 title topics we can talk about ${title}`,
        model: "text-davinci-003",
        max_tokens: 200,
      });
      setTitleSlide(response.data.choices[0].text?.split("\n")[2] as string);

      const data = response.data.choices[0].text as string;
      setResponse(data);
      setLoading(false);
    } catch (error) {
      // do something
    }
  };

  const updateIntro = (update: boolean) => {
    setIntroduction(update);
  };

  const updateConclusion = (update: boolean) => {
    setConclusion(update);
  };

  //create presentation with google slide
  function createPresentation(title: string, callback: any) {
    try {
      gapi.client.slides.presentations
        .create({
          title: title,
        })
        .then((response) => {
          console.log(
            `Created presentation with ID: ${response.result.presentationId}`
          );
          createSlide(
            response.result.presentationId,
            response.result.presentationId + "index",
            function (res: any) {
              window.open(
                `https://docs.google.com/presentation/d/${response.result.presentationId}/edit#slide=id.p`,
                "_blank"
              );
              console.log("response creation slide:", res);
            }
          );
          if (callback) callback(response);
        });
    } catch (err) {
      console.log("errorrrrr:", err);
      return;
    }
  }

  //https://docs.google.com/presentation/d/1LctDGvEtNrvJMV9k_9fGMvObzxGoIhKxjjbtrPD2zlk/edit#slide=id.p
  function createSlide(
    presentationId: string | undefined,
    pageId: string,
    callback: any
  ) {
    const requests = [
      {
        createSlide: {
          objectId: pageId,
          insertionIndex: "1",
          slideLayoutReference: {
            predefinedLayout: "TITLE_AND_TWO_COLUMNS",
          },
        },
      },
    ];

    try {
      gapi.client.slides.presentations
        .batchUpdate({
          presentationId: presentationId,
          requests: requests,
        })
        .then((createSlideResponse) => {
          const objectId =
            createSlideResponse.result.replies &&
            createSlideResponse.result.replies[0].createSlide?.objectId;
          console.log(`Created slide with ID: ${objectId}`);
          if (callback) callback(createSlideResponse);
        });
    } catch (err) {
      console.log("error creation slide:", err);
      return;
    }
  }

  return (
    <div className="flex justify-center space-x-10 mt-10">
      <Presentation
        dataHandler={fetchData}
        title={setTitle}
        updateIntroduction={updateIntro}
        updateConclusion={updateConclusion}
      />
      <Generator
        response={response}
        intro={introduction}
        conclu={conclusion}
        createSlide={sendAuthorizedApiRequest}
        loading={loading}
      />
    </div>
  );
}

export default App;
