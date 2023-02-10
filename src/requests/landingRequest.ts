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
      text: "1-\n",
    },
  },
  {
    createSlide: {
      objectId: "title",
      slideLayoutReference: {
        predefinedLayout: "TITLE_ONLY",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0,
          },
          objectId: "title-each-element-1",
        },
      ],
    },
  },
  {
    insertText: {
      objectId: "title-each-element-1",
      text: "Titre du premier contenu",
    },
  },
  {
    createSlide: {
      objectId: "content-element-1",
      slideLayoutReference: {
        predefinedLayout: "ONE_COLUMN_TEXT",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "BODY",
            index: 0,
          },
          objectId: "content-each-element-1",
        },
      ],
    },
  },
  {
    insertText: {
      objectId: "content-each-element-1",
      text: "Contenu du premier element",
    },
  },
  //2nd element
  {
    createSlide: {
      objectId: "title-2",
      slideLayoutReference: {
        predefinedLayout: "TITLE_ONLY",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0,
          },
          objectId: "title-each-element-2",
        },
      ],
    },
  },
  {
    insertText: {
      objectId: "title-each-element-2",
      text: "Titre du premier contenu",
    },
  },
  {
    createSlide: {
      objectId: "content-element-2",
      slideLayoutReference: {
        predefinedLayout: "ONE_COLUMN_TEXT",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "BODY",
            index: 0,
          },
          objectId: "content-each-element-2",
        },
      ],
    },
  },
  {
    insertText: {
      objectId: "content-each-element-2",
      text: "Contenu du premier element",
    },
  },

  // 3e element
  {
    createSlide: {
      objectId: "title-3",
      slideLayoutReference: {
        predefinedLayout: "TITLE_ONLY",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "TITLE",
            index: 0,
          },
          objectId: "title-each-element-3",
        },
      ],
    },
  },
  {
    insertText: {
      objectId: "title-each-element-3",
      text: "Titre du premier contenu",
    },
  },
  {
    createSlide: {
      objectId: "content-element-3",
      slideLayoutReference: {
        predefinedLayout: "ONE_COLUMN_TEXT",
      },
      placeholderIdMappings: [
        {
          layoutPlaceholder: {
            type: "BODY",
            index: 0,
          },
          objectId: "content-each-element-3",
        },
      ],
    },
  },
  {
    insertText: {
      objectId: "content-each-element-3",
      text: "Contenu du premier element",
    },
  },

];

export { landingRequest };
