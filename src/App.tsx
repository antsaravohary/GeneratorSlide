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
// import { landingRequest } from "./requests/landingRequest";
// import { emphasisrequest } from "./requests/emphasis_request";

function App() {
  const [response, setResponse] = useState<string>("");
  const [introduction, setIntroduction] = useState<boolean>(false);
  const [conclusion, setConclusion] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [titleSlide, setTitleSlide] = useState<string>("");
  const [GoogleAuth, setGoogleAuth] = useState<gapi.auth2.GoogleAuth>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [topic1, setTopic1] = useState<string>("");
  const [topic2, setTopic2] = useState<string>("");
  const [firstContentOfTopics, setFirstContentOfTopic] = useState<string>("");
  const [secondContentOfTopics, setSecondContentOfTopic] = useState<string>("");
  const [thirdContentOfTopics, setThirdContentOfTopic] = useState<string>("");

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
      } else {
        setIsAuthorized(false);
      }
    }
    gapi.load("client:auth2", start);
  }, []);

  //ask if user is already authenticated
  function sendAuthorizedApiRequest(requestDetails: any) {
    if (isAuthorized) {
      createPresentation(
        titleSlide.replace("1.", ""),
        function (response: any) {
          // console.log("response slide:", response);
        }
      );
      // currentApiRequest = {};
    } else {
      // console.log("Non autorisé");
      GoogleAuth?.signIn();
    }
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
    } catch (error) {}
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
          // console.log(
          //   `Created presentation with ID: ${response.result.presentationId}`
          // );
          // console.log(response.result.masters);
          createSlide(
            response.result.presentationId,
            response.result.presentationId + "index",
            function (res: any) {
              window.open(
                `https://docs.google.com/presentation/d/${response.result.presentationId}/edit#slide=id.p`,
                "_blank"
              );
            }
          );
          updatePresentationTheme(
            response.result.presentationId,
            response.result.masters &&
              response.result.masters[0].pageElements &&
              response.result.masters[0].pageElements[0].objectId
          );

          if (callback) callback(response);
        });
    } catch (err) {
      // console.log("errorrrrr:", err);
      // return;
      //do something
    }
  }

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

  function updatePresentationTheme(
    presentationId: string | undefined,
    objectId: string | undefined
  ) {

    gapi.client.slides.presentations
      .batchUpdate({
        presentationId: presentationId ? presentationId : "",
        resource: {
          requests: [
            {
              updateShapeProperties: {
                objectId: objectId,
                fields: "shapeBackgroundFill.solidFill.color",
                shapeProperties: {
                  shapeBackgroundFill: {
                    solidFill: {
                      color: {
                        themeColor: "LIGHT2",
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      })
      .then(
        function (response) {
          // console.log(response.result);
        },
        function (error) {
          console.error(error);
        }
      );
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
