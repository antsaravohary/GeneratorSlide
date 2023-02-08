const emphasisrequest = [
    {
        createSlide: {
            objectId: 'main-point',
            slideLayoutReference: {
                predefinedLayout: "SECTION_HEADER"
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


    {
        insertText:
        {
            objectId: 'main-point-title_1',
            text: "Emphasis on this second point",
        },

    },

    {
        createSlide: {
            objectId: 'section',
            slideLayoutReference: {
                predefinedLayout: "TITLE_AND_BODY"
            },
            placeholderIdMappings: [
                {
                    layoutPlaceholder: {
                        type: "TITLE",
                        index: 0
                    },
                    objectId: 'section-title',
                },
                {
                    layoutPlaceholder: {
                        type: "BODY",
                        index: 0
                    },
                    objectId: 'section-body',
                },
            ],
        }
    },
    {
        insertText:
        {
            objectId: 'section-title',
            text: "Section title ",
        }
    },
    {
        insertText: {
            objectId: 'section-body',
            text: "this is a paragraph",
        },
    },
]








// const emphasisrequest = [
//     {
//         createSlide: {
//             objectId: 'main-point_1',
//             placeholderIdMappings: [
//                 {
//                     layoutPlaceholder: {
//                         type: 'TITLE',
//                         index: 0,
//                     },
//                     objectId: 'main-point-title_1',
//                 },
//             ],
//         },
//     },
//     {
//         insertText: {
//             objectId: 'main-point-title_1',
//             text: 'Emphasis on this second point',
//         },
//     },
// ];

export { emphasisrequest };
