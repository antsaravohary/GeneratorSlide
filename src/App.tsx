import { Configuration, OpenAIApi } from "openai";
import React, { useState } from "react";
import Generator from "./components/Generator";
import Presentation from "./components/Presentation";
import client from "../client.json";
import { gapi } from "gapi-script";
import { landingRequest } from "./requests/landingRequest";

const SCOPES =
  "https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file";

const clientId = client.web.client_id;
const api_key = "AIzaSyCEf61GZDszL7PfqGvHUIeFdQkBiokqT6w";

function App() {
  const [response, setResponse] = useState<string>("");
  const [introduction, setIntroduction] = useState<boolean>(false);
  const [conclusion, setConclusion] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleSlide, setTitleSlide] = useState<string>("");
  const [GoogleAuth, setGoogleAuth] = useState<gapi.auth2.GoogleAuth>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [topic1, setTopic1] = useState<string>("");
  const [topic2, setTopic2] = useState<string>("");
  const [firstContentOfTopics, setFirstContentOfTopic] = useState<string>("");
  const [secondContentOfTopics, setSecondContentOfTopic] = useState<string>("");
  const [thirdContentOfTopics, setThirdContentOfTopic] = useState<string>("");
  const [isSelected, setIsSelected] = useState<string>(
    "1FSl0HXV-DakETpGFo5_twMmsd_Y0s2zgkrm0aKi4gsU"
  );

  const localStorageKey = "google_auth_token";

  const token = "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";
  const options = [
    {
      label: "Coral",
      value: "1FSl0HXV-DakETpGFo5_twMmsd_Y0s2zgkrm0aKi4gsU",
    },
    {
      label: "Swiss",
      value: "1Kqv5zPolpfJfzejZlSz1cfn6mznuZQD4ymk5bLYpC7k",
    },
    {
      label: "Paradigm",
      value: "14wzGoaUl9MaptFluU7d2wd32NXKnGV1xVy3YGD-wSzM",
    },
    {
      label: "Plum",
      value: "1P8KtuW4l_GiC50g-cwICdD9BpaO006llMNWqqiGN7-4",
    },
    {
      label: "ModernWriter",
      value: "1rsPheFi_DJZy_87AWc_bKg0rBYrLacEtE4gF2SoZ20",
    },
    {
      label: "Luxe",
      value: "1ExyubR_a46JNlDeWKCXywAR7U5lYC6P-oIBM8TXF2gY",
    },
    {
      label: "Tropic",
      value: "1V0sRVl4cCOpcorBIlQyzn4ONHhGgZwRUBX_tV2TkMyE",
    },
  ]; // token open ai

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
          if (gapi.client.getToken().access_token) {
            localStorage.setItem(
              localStorageKey,
              gapi.client.getToken().access_token
            );
          } else {
            localStorage.setItem(localStorageKey, "");
          }
          setGoogleAuth(gapi.auth2.getAuthInstance());
          GoogleAuth?.isSignedIn.listen(updateSigninStatus);
        })
        .catch((e) => {
          console.log("error google sigining error:", e);
        });
    }
    function updateSigninStatus(isSignedIn: boolean) {
      console.log("isSignedIn:", isSignedIn);
      if (isSignedIn) {
        setIsAuthorized(true);
        console.log("signed");
      } else {
        console.log("not signed");
        setIsAuthorized(false);
      }
    }
    gapi.load("client:auth2", start);
  }, []);

  //ask if user is already authenticated
  async function sendAuthorizedApiRequest(requestDetails: any) {
    const token = localStorage.getItem(localStorageKey);
    if (token === "") {
      console.log("Non autorisé");
      await GoogleAuth?.signIn();
      localStorage.setItem(
        localStorageKey,
        gapi.client.getToken().access_token
      );
      copyPresentation(
        isSelected,
        `${title}_${generateRandomString(5)}`,
        function (response: any) {
          //do something
        }
      );
    } else {
      copyPresentation(
        isSelected,
        `${title}_${generateRandomString(5)}`,
        function (response: any) {
          //do something
        }
      );
    }
  }

  function selected(value: string) {
    setIsSelected(value);
  }

  //ai fetch data
  const fetchData = async (
    introduction: boolean,
    conclusion: boolean,
    topicNumber: number
  ) => {
    setLoading(true);
    setIntroduction(introduction);
    setConclusion(conclusion);
    try {
      const response = await openai.createCompletion({
        prompt: `Suggest ${topicNumber} title topics we can talk about ${title}`,
        model: "text-davinci-003",
        max_tokens: 200,
      });
      setTitleSlide(response.data.choices[0].text?.split("\n")[2] as string);
      setTopic1(response.data.choices[0].text?.split("\n")[3] as string);
      setTopic2(response.data.choices[0].text?.split("\n")[4] as string);

      const data = response.data.choices[0].text as string;
      setResponse(data);
      await fetchFiveTopics();
      setLoading(false);
    } catch (error) {
      // do something
    }
  };

  const fetchFiveTopics = async () => {
    try {
      const response1 = await openai.createCompletion({
        prompt: `Suggest 5 title topics we can talk about ${titleSlide.replace(
          "1.",
          ""
        )}`,
        model: "text-davinci-003",
        max_tokens: 200,
      });
      const response2 = await openai.createCompletion({
        prompt: `Suggest 5 title topics we can talk about ${topic1.replace(
          "2.",
          ""
        )}`,
        model: "text-davinci-003",
        max_tokens: 200,
      });
      const response3 = await openai.createCompletion({
        prompt: `Suggest 5 title topics we can talk about ${topic2.replace(
          "3.",
          ""
        )}`,
        model: "text-davinci-003",
        max_tokens: 200,
      });

      setFirstContentOfTopic(response1.data.choices[0].text as string);
      setSecondContentOfTopic(response2.data.choices[0].text as string);
      setThirdContentOfTopic(response3.data.choices[0].text as string);
    } catch (error) {
      //do something
    }
  };

  const updateIntro = (update: boolean) => {
    setIntroduction(update);
  };

  const updateConclusion = (update: boolean) => {
    setConclusion(update);
  };

  function getDate() {
    const date = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let month = months[date.getMonth()];
    return month + " " + date.getFullYear();
  }

  function generateRandomString(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  //https://docs.google.com/presentation/d/1LctDGvEtNrvJMV9k_9fGMvObzxGoIhKxjjbtrPD2zlk/edit#slide=id.p
  function createSlide(
    presentationId: string | undefined,
    pageId: string,
    callback: any
  ) {
    landingRequest.map(function (landing) {
      if (landing.insertText) {
        if (landing.insertText.objectId === "landing-title") {
          landing.insertText.text = titleSlide.replace("1.", "");
        } else if (landing.insertText.objectId === "landing-subtitle") {
          landing.insertText.text = getDate();
        } else if (landing.insertText.objectId === "content-body") {
          landing.insertText.text = response;
        } else if (landing.insertText.objectId === "title-each-element-1") {
          landing.insertText.text = titleSlide.replace("1.", "");
        } else if (landing.insertText.objectId === "content-each-element-1") {
          landing.insertText.text = firstContentOfTopics;
        } else if (landing.insertText.objectId === "title-each-element-2") {
          landing.insertText.text = topic1.replace("2.", "");
        } else if (landing.insertText.objectId === "content-each-element-2") {
          landing.insertText.text = secondContentOfTopics;
        } else if (landing.insertText.objectId === "title-each-element-3") {
          landing.insertText.text = topic2.replace("3.", "");
        } else if (landing.insertText.objectId === "content-each-element-3") {
          landing.insertText.text = thirdContentOfTopics;
        }
      }
    });
    const requests = landingRequest;

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
          // console.log(`Created slide with ID: ${objectId}`);
          if (callback) callback(createSlideResponse);
        });
    } catch (err) {
      // console.log("error creation slide:", err);
      return;
    }
  }

  function copyPresentation(
    templateId: string,
    copyTitle: string,
    callback: any
  ) {
    const request = {
      name: copyTitle,
    };
    try {
      gapi.client.drive.files
        .copy({
          fileId: templateId,
          resource: request,
          fields: "id,name,webViewLink",
        })
        .then(async (driveResponse) => {
          const presentationCopyId = driveResponse.result.id;
          if (callback) callback(presentationCopyId);
          await createSlide(
            presentationCopyId,
            presentationCopyId + "index",
            function (res: any) {}
          );
          console.log("create copy_presentation with id", presentationCopyId);
          window.open(
            `https://docs.google.com/presentation/d/${presentationCopyId}/edit#slide=id.p`,
            "_blank"
          );
        });
    } catch (err) {
      //do something
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
        options={options}
        selected={isSelected}
        handleSelected={selected}
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
