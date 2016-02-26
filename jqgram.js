var cheerio = require('cheerio');
var jq = require("jqgram").jqgram;

// // The easy part, jqgram:
// var jq = require("../jqgram").jqgram;


var test = {"type":"nav","content":[{"type":"ul","content":[{"type":"li","content":[{"type":"a","content":["News"]}]}]}]};

var buzzfeed = {
   "type":"div",
   "content":[
      {
         "type":"parsererror",
         "content":[
            {
               "type":"h3",
               "content":[
                  "This page contains the following errors:"
               ]
            },
            {
               "type":"div",
               "content":[
                  "error on line 229 at column 28: Opening and ending tag mismatch: input line 0 and form\n"
               ]
            },
            {
               "type":"h3",
               "content":[
                  "Below is a rendering of the page up to the first error."
               ]
            }
         ]
      },
      "\n            ",
      {
         "type":"nav",
         "content":[
            "\n                ",
            {
               "type":"ul",
               "content":[
                  "\n                    ",
                  {
                     "type":"li",
                     "content":[
                        "\n                        ",
                        {
                           "type":"a",
                           "content":[
                              "News"
                           ]
                        },
                        "\n                    "
                     ]
                  },
                  "\n                    ",
                  {
                     "type":"li",
                     "content":[
                        "\n                        ",
                        {
                           "type":"a",
                           "content":[
                              "Buzz"
                           ]
                        },
                        "\n                    "
                     ]
                  },
                  "\n                    ",
                  {
                     "type":"li",
                     "content":[
                        "\n                        ",
                        {
                           "type":"a",
                           "content":[
                              "Life"
                           ]
                        },
                        "\n                    "
                     ]
                  },
                  "\n                    ",
                  {
                     "type":"li",
                     "content":[
                        "\n                        ",
                        {
                           "type":"a",
                           "content":[
                              "Quizzes"
                           ]
                        },
                        "\n                    "
                     ]
                  },
                  "\n                    ",
                  {
                     "type":"li",
                     "content":[
                        "\n                        ",
                        {
                           "type":"a",
                           "content":[
                              "Videos"
                           ]
                        },
                        "\n                    "
                     ]
                  },
                  "\n                    ",
                  {
                     "type":"li",
                     "content":[
                        "\n                        ",
                        {
                           "type":"span",
                           "content":[
                              "More ",
                              {
                                 "type":"svg",
                                 "content":[
                                    "\n                        ",
                                    {
                                       "type":"use"
                                    }
                                 ]
                              }
                           ]
                        },
                        "\n                        ",
                        {
                           "type":"div",
                           "content":[
                              "\n                            ",
                              {
                                 "type":"div",
                                 "content":[
                                    "\n                                ",
                                    {
                                       "type":"a",
                                       "content":[
                                          "BuzzFeed Community"
                                       ]
                                    },
                                    " ",
                                    {
                                       "type":"a",
                                       "content":[
                                          "Make A Post!"
                                       ]
                                    },
                                    "\n                            "
                                 ]
                              },
                              "\n                            ",
                              {
                                 "type":"div",
                                 "content":[
                                    "\n                                ",
                                    {
                                       "type":"span",
                                       "content":[
                                          "SECTIONS"
                                       ]
                                    },
                                    "\n                                ",
                                    {
                                       "type":"ul",
                                       "content":[
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Animals"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Audio"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Big Stories"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Books"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Business"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Celebrity"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "DIY"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Entertainment"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Food"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Geeky"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Health"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Ideas"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "LGBT"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Music"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Parents"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Podcasts"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Politics"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Puzzles"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Rewind"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Science"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Sports"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Style"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Tech"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Travel"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Weddings"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Weekend"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "World"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                "
                                       ]
                                    },
                                    "\n                            "
                                 ]
                              },
                              "\n                            ",
                              {
                                 "type":"div",
                                 "content":[
                                    "\n                                ",
                                    {
                                       "type":"ul",
                                       "content":[
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Advertise"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Jobs"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Mobile"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Newsletters"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"div",
                                                   "content":[
                                                      "\n                                            ",
                                                      {
                                                         "type":"a",
                                                         "content":[
                                                            {
                                                               "type":"svg",
                                                               "content":[
                                                                  "\n                                            ",
                                                                  {
                                                                     "type":"use",
                                                                     "content":[
                                                                        "\n                                            "
                                                                     ]
                                                                  }
                                                               ]
                                                            },
                                                            " US Edition ",
                                                            {
                                                               "type":"svg",
                                                               "content":[
                                                                  "\n                                            ",
                                                                  {
                                                                     "type":"use",
                                                                     "content":[
                                                                        "\n                                            "
                                                                     ]
                                                                  }
                                                               ]
                                                            }
                                                         ]
                                                      },
                                                      "\n                                            ",
                                                      {
                                                         "type":"ul",
                                                         "content":[
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "US\n                                                    Edition"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "UK\n                                                    Edition"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "\n                                                    Australia"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "Brasil"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "Canada"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "\n                                                    Deutschland"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "EspaÃƒÂ±a"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "EspaÃƒÂ±ol"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "France"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "India"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                li>",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "Japan"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                                ",
                                                            {
                                                               "type":"li",
                                                               "content":[
                                                                  "\n                                                    ",
                                                                  {
                                                                     "type":"a",
                                                                     "content":[
                                                                        "MÃƒÂ©xico"
                                                                     ]
                                                                  },
                                                                  "\n                                                "
                                                               ]
                                                            },
                                                            "\n                                            "
                                                         ]
                                                      },
                                                      "\n                                        "
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                "
                                       ]
                                    },
                                    "\n                                ",
                                    {
                                       "type":"ul",
                                       "content":[
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "About"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Press"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "RSS"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Privacy"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "User Terms"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"#comment"
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Ad\n                                        Choices"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Help"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "\n                                        ",
                                                {
                                                   "type":"a",
                                                   "content":[
                                                      "Contact"
                                                   ]
                                                },
                                                "\n                                    "
                                             ]
                                          },
                                          "\n                                    ",
                                          {
                                             "type":"li",
                                             "content":[
                                                "Ã‚Â© 2016\n                                    BuzzFeed, Inc"
                                             ]
                                          },
                                          "\n                                "
                                       ]
                                    },
                                    {
                                       "type":"a",
                                       "content":[
                                          "Made in NY"
                                       ]
                                    },
                                    "\n                            "
                                 ]
                              },
                              "\n                        "
                           ]
                        },
                        "\n                    "
                     ]
                  },
                  "\n                "
               ]
            },
            "\n            "
         ]
      },
      "\n            ",
      {
         "type":"div",
         "content":[
            "\n                ",
            {
               "type":"a",
               "content":[
                  "Get Our\n                App!"
               ]
            },
            "\n                ",
            {
               "type":"div",
               "content":[
                  "\n                    ",
                  {
                     "type":"div",
                     "content":[
                        "\n                        ",
                        {
                           "type":"span",
                           "content":[
                              {
                                 "type":"iframe",
                                 "content":[
                                    "&lt;span style=\n                        \"vertical-align: bottom; width: 89px; height: 20px;\"&gt;&lt;/span&gt;"
                                 ]
                              }
                           ]
                        },
                        "\n                    "
                     ]
                  },
                  "\n                "
               ]
            },
            "\n            "
         ]
      },
      "\n            ",
      {
         "type":"div",
         "content":[
            "\n                ",
            {
               "type":"div",
               "content":[
                  "\n                    ",
                  {
                     "type":"form",
                     "content":[
                        "\n                        ",
                        {
                           "type":"input",
                           "content":[
                              "\n                        ",
                              {
                                 "type":"button",
                                 "content":[
                                    {
                                       "type":"svg",
                                       "content":[
                                          "\n                        ",
                                          {
                                             "type":"use"
                                          }
                                       ]
                                    }
                                 ]
                              },
                              ""
                           ]
                        }
                     ]
                  }
               ]
            }
         ]
      }
   ]
}

jq.distance({
    root: test,
    lfn: function(node){ return node.type; },
    cfn: function(node){ return node.content; }
},{
    root: buzzfeed,
    lfn: function(node){ return node.type; },
    cfn: function(node){ return node.content; }
},{ p:2, q:3, depth:10 },
function(result) {
    console.log(result.distance);
});

var root1 = {
    "thelabel": "nav",
    "thekids": [
        { "thelabel": "b",
        "thekids": [
                { "thelabel": "c" },
                { "thelabel": "d" }
            ]
        },
        { "thelabel": "e" },
        { "thelabel": "f" }
    ]
}

var root2 = {
    "name": "a",
    "kiddos": [
        { "name": "b",
        "kiddos": [
                { "name": "c" },
                { "name": "d" },
                { "name": "y" }
            ]
        },
        { "name": "e" },
        { "name": "x" }
    ]
}

// jq.distance({
//     root: test,
//     lfn: function(node){ return node.type; },
//     cfn: function(node){ return node.content; }
// },{
//     root: root2,
//     lfn: function(node){ return node.name; },
//     cfn: function(node){ return node.kiddos; }
// },{ p:2, q:3, depth:10 },
// function(result) {
//     console.log(result.distance);
// });