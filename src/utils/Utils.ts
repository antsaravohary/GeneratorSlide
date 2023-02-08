 // function getDate() {
  //   const date = new Date();
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   let month = months[date.getMonth()];
  //   return month + " " + date.getFullYear();
  // }

  // function updateObjectIds(
  //   emphasisrequest: any,
  //   newObjectIds: any,
  //   textPlaceholder: string,
  //   bodyText: string
  // ) {
  //   const modifiedRequests = [];

  //   for (let i = 0; i < parts; i++) {
  //     const modifiedRequest = emphasisrequest.map((item: any) => {
  //       if (item.createSlide) {
  //         return {
  //           createSlide: {
  //             ...item.createSlide,
  //             objectId: `${newObjectIds[item.createSlide.objectId]}-${i + 1}`,
  //             placeholderIdMappings: item.createSlide.placeholderIdMappings.map(
  //               (mapping: any) => {
  //                 return {
  //                   ...mapping,
  //                   objectId: `${newObjectIds[mapping.objectId]}-${i + 1}`,
  //                 };
  //               }
  //             ),
  //           },
  //         };
  //       } else if (item.insertText) {
  //         if (
  //           item.insertText.objectId === "section-title" ||
  //           item.insertText.objectId === "main-point-title_1"
  //         ) {
  //           return {
  //             insertText: {
  //               ...item.insertText,
  //               objectId: `${newObjectIds[item.insertText.objectId]}-${i + 1}`,
  //               text: textPlaceholder[i],
  //             },
  //           };
  //         } else if (item.insertText.objectId === "section-body") {
  //           return {
  //             insertText: {
  //               ...item.insertText,
  //               objectId: `${newObjectIds[item.insertText.objectId]}-${i + 1}`,
  //               text: bodyText[i],
  //             },
  //           };
  //         }
  //       }
  //       return item;
  //     });

  //     modifiedRequests.push(...modifiedRequest);
  //   }

  //   return modifiedRequests;
  // }

  // function copyPresentation(
  //   token: string,
  //   presentationId: string,
  //   copyTitle: string
  // ) {
  //   fetch(
  //     "https://www.googleapis.com/drive/v3/files/" + presentationId + "/copy",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ name: copyTitle }),
  //     }
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then(function (val) {
  //       let idTemp = val.id;
  //       //console.log(val);
  //       //console.log(idTemp);
  //       //setCopyId(idTemp)
  //       createNewSlide(token, idTemp);
  //       //window.open(`https://docs.google.com/presentation/d/${idTemp}`)

  //       //setTitleList("")
  //     });
  // }

  // function modifyRequest() {
  //   //const newIds = ['new-id-1', 'new-id-2', 'new-id-3'];
  //   //const newPageIds = ['new-page-id-1', 'new-page-id-2', 'new-page-id-3'];
  //   //const textPlaceholder = ['part 1', 'part 2', 'part 3'];

  //   const subtitleText = String(getDate());

  //   const modifiedLandingRequest = [...landingRequest];

  //   modifiedLandingRequest.forEach((request) => {
  //     if (request.insertText) {
  //       if (request.insertText.objectId === "landing-title") {
  //         request.insertText.text = title;
  //       } else if (request.insertText.objectId === "landing-subtitle") {
  //         request.insertText.text = subtitleText;
  //       } else if (request.insertText.objectId === "content-body") {
  //         request.insertText.text = "Bonjour";
  //       }
  //     }
  //   });

  //   console.log(modifiedLandingRequest);

  //   const newObjectIds = {
  //     "main-point": "new-main-point",
  //     section: "new-section",
  //     "main-point-title_1": "new-main-point-title-id",
  //     "section-title": "new-section-title-id",
  //     "section-body": "new-section-body-id",
  //   };

  //   const modifiedRequests = updateObjectIds(
  //     emphasisrequest,
  //     newObjectIds,
  //     textPlaceholder,
  //     bodyText
  //   );

  //   modifiedLandingRequest.push(...modifiedRequests);
  //   console.log(modifiedLandingRequest);
  //   return modifiedLandingRequest;
  // }

  // function createNewSlide(presentationId: string) {
  //   console.log("mandeeeeeeeeeeeeeeeee");
  //   let token = gapi.auth.getToken().access_token;
  //   console.log("token:", token);
  //   fetch(
  //     `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         presentationId: presentationId,
  //         //requests: modifyRequest(),
  //       }),
  //     }
  //   )
  //     .then(function () {
  //       //window.open(`https://docs.google.com/presentation/d/${idTemp}`);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }