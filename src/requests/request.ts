export const request = [

  //#region Landing
  {
    createSlide: {
      objectId: 'landing',
      slideLayoutReference: {
        predefinedLayout: "TITLE"
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "CENTERED_TITLE",
            index: 0
          },
          objectId: 'landing-title',
        },
        {
          layoutPlaceholder: {
            type: "SUBTITLE",
            index: 0
          },
          objectId: 'landing-subtitle',
        },
      ],
    }
  },

  //#endregion
  //#region Adds text
  {
    insertText:
    {
      objectId: 'landing-title',
      text: "My first generated presentation",
    }
  },
  {
    insertText: {
      objectId: 'landing-subtitle',
      text: "this is a subtitle",
    },
  },
  //#endregion


  //#region Landing
  {
    createSlide: {
      objectId: 'content',
      slideLayoutReference: {
        predefinedLayout: "ONE_COLUMN_TEXT"
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0
          },
          objectId: 'content-title',
        },
        {
          layoutPlaceholder: {
            type: "BODY",
            index: 0
          },
          objectId: 'content-body',
        },
      ],
    }
  },

  //#endregion
  //#region Adds text
  {
    insertText:
    {
      objectId: 'content-title',
      text: "Table of Contents",
    }
  },
  {
    insertText: {
      objectId: 'content-body',
      text: "This is the content of the presentation",
    },
  },
  //#endregion


  //#region First Slide
  {
    createSlide: {
      objectId: 'main_1',
      slideLayoutReference: {
        predefinedLayout: "TITLE_AND_BODY"
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0
          },
          objectId: 'main-title_1',
        },
        {
          layoutPlaceholder: {
            type: "BODY",
            index: 0
          },
          objectId: 'main-body_1',
        }
      ],
    }
  },

  //#endregion
  //#region Adds text
  {
    insertText:
    {
      objectId: 'main-title_1',
      text: "This is my slide title",
    },

  },
  {
    insertText: {
      objectId: 'main-body_1',
      text: "This is my slide paragraph",
    }
  },
  //#endregion


  //#region Second Slide

  {
    createSlide: {
      objectId: 'main_2',
      slideLayoutReference: {
        predefinedLayout: "TITLE_AND_BODY"
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0
          },
          objectId: 'main-title_2',
        },
        {
          layoutPlaceholder: {
            type: "BODY",
            index: 0
          },
          objectId: 'main-body_2',
        }
      ],
    }
  },

  //#endregion
  //#region Adds text
  // {
  //   insertText:
  //   {
  //     objectId: 'main-title_2',
  //     text: "This is my second slide title",
  //   },

  // },
  // {
  //   insertText: {
  //     objectId: 'main-body_2',
  //     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   }
  // },
  // //#endregion


  //#region Emphasis 1 Slide

  {
    createSlide: {
      objectId: 'main-point_1',
      slideLayoutReference: {
        predefinedLayout: "MAIN_POINT"
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0
          },
          objectId: 'main-point-title_1',
        },
      ],
    }
  },

  //#endregion
  //#region Adds text
  {
    insertText:
    {
      objectId: 'main-point-title_1',
      text: "Emphasis on this second point",
    },

  },
  //#endregion

];

