const landingRequest = [
  {
    createSlide: {
      objectId: "landing",
      slideLayoutReference: {
        predefinedLayout: "TITLE",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "CENTERED_TITLE",
            index: 0,
          },
          objectId: "landing-title",
        },
        {
          layoutPlaceholder: {
            type: "SUBTITLE",
            index: 0,
          },
          objectId: "landing-subtitle",
        },
      ],
    },
  },

  {
    insertText: {
      objectId: "landing-title",
      text: "My first generated presentation",
    },
  },
  {
    insertText: {
      objectId: "landing-subtitle",
      text: "this is a subtitle",
    },
  },

  {
    createSlide: {
      objectId: "content",
      slideLayoutReference: {
        predefinedLayout: "ONE_COLUMN_TEXT",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0,
          },
          objectId: "content-title",
        },
        {
          layoutPlaceholder: {
            type: "BODY",
            index: 0,
          },
          objectId: "content-body",
        },
      ],
    },
  },

  {
    insertText: {
      objectId: "content-title",
      text: "Table of Contents",
    },
  },
  {
    insertText: {
      objectId: "content-body",
      text: "This is the content of the presentation",
    },
  },
];

export { landingRequest };
