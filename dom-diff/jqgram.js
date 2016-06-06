var cheerio = require('cheerio');
var _ = require('underscore');
var jq = require("jqgram").jqgram;

var compare = function (a, b) {

  var $a = cheerio.load(a.html, {
    ignoreWhitespace: false,
    lowerCaseTags: true
  });

  var $b = cheerio.load(b.html, {
    ignoreWhitespace: false,
    lowerCaseTags: true
  });


  var allDescendants = function (parentEl, tree) {
    // console.log(parentEl.children);
    //for (var i = 0; i < parentEl.childNodes.length; i++) {
    for (var i = 0; i < parentEl.children.length; i++) {
      var node = parentEl.children[i];
      var tagName = node.name;

      if (tree[parentEl.name][tagName]) {
        tree[parentEl.name][tagName].count += 1;
      } else {
        tree[parentEl.name][tagName] = {
          count: 1,
          path: tree[parentEl.name].path + tagName
        };
      }

      allDescendants(node, tree[parentEl.name]);
    }
  };

  var getTreeFromCheerioDom = function ($cheerio, label) {
    var tree = {
      label:label,
      html: {
        count: 1,
        path: "html"
      }
    };

    var children = $cheerio.root().children();
    var htmlNode = children.get(0);
    allDescendants(htmlNode, tree);

    return tree;
  };

  var root1 = getTreeFromCheerioDom($a, a.label);
  var root2 = getTreeFromCheerioDom($b, b.label);

  var cfn = function (obj) {
    var values = _(obj).values();
    return values;
  };

  var lfn = function (obj) {
    //console.log("bar", JSON.stringify(obj, null, 2))
    return obj.path;
  };

  jq.distance({
      root: root1.html,
      lfn: lfn,
      cfn: cfn
    }, {
      root: root2.html,
      lfn: lfn,
      cfn: cfn
    }, {p: 2, q: 3, depth: 10},
    function (result) {
      var message = result.distance;
      var similarity = 1.0 - message;
      console.log(root1.label, root2.label, "Similarity: " + similarity);
    });
};

var a = {
  label: "buzzfeed",
  html: '<html><body><div class=""><nav class=""><ul class=""><li class=""><a class=""></a></li><li class=""><span class=""><svg class=""></svg></span><div class=""><div class=""><a class=""></a></div><div class=""><span class=""></span><ul class=""><li class=""><a class=""></a></li></ul></div><div class=""><ul class=""><li class=""><a class=""></a></li><li class=""><div class=""><a class=""><svg class=""></svg><svg class=""></svg></a><ul class=""><li class=""><a class=""></a></li></ul></div></li></ul><ul class=""><li class=""><a class=""></a></li><li class=""></li></ul><a class=""></a></div></div></li></ul></nav><div class=""><a class=""></a><div class=""><div class=""><span class=""><iframe></iframe></span></div></div></div><div class=""><div class=""><form class=""><input><button class=""><svg class=""></svg></button></form></div><div class=""><div class=""><a class=""></a></div><div class=""><a class=""><span class=""><img></span><span class=""></span></a><ul class=""><li class=""><a class=""></a></li></ul></div><div class=""></div></div></div></div></body></html>'
};

var b = {
  label: "spotify",
  html: '<html><body><header class=""><div class=""><div class=""><div class=""><button class=""><span class=""></span></button><a class=""></a></div></div></div><div class=""><div class=""><button class="" type="button"><span class=""></span></button><ul class=""><li class=""><a class=""><img class=""></a><ul class=""><li class=""><a class=""></a></li></ul></li></ul><a class=""><img class=""></a><a class=""><span class=""></span></a></div><nav class="" role="navigation"><ul class=""><li class=""><a class=""></a></li><li class=""><a class=""><img class=""><span class=""></span><svg class=""></svg></a><ul class=""><li class=""><a class=""></a></li></ul></li></ul></nav></div></header></body></html>'
};

var c = {
  label: "twitter",
  html: '<html><body><div class=""><div class=""><h1 class=""><span class=""></span></h1><div class=""></div><div class=""><ul class=""><li class=""></li><li class=""><a class=""></a></li></ul></div><div class=""><div class=""><form class=""><label class=""></label><input><span class=""><button class=""><span class=""><span class=""></span></span></button></span><div class=""><div class=""><div class=""></div><div class=""></div></div><div class=""><div class=""><h3 class=""></h3><button class=""></button><ul class=""><li class=""><span class=""><span class=""></span></span><a class=""></a></li></ul></div><div class=""><h3 class=""></h3><ul class=""><li class=""><span class=""><span class=""></span></span><a class=""></a></li></ul></div><ul class=""><li class=""><a class=""></a></li></ul><ul class=""><li class=""></li><li class=""><a class=""></a></li></ul></div></div></form></div><ul class=""><li class=""></li><li class=""><button class=""></button></li></ul></div></div></div></body></html>'
};

var d = {
  label: "youtube",
  html: '<html><body><div class=""><button class=""><span class=""><span class=""></span></span></button><div class=""></div><span class=""><a class=""></a></span></div><div class=""><a class=""></a><div class=""><button class=""></button></div><span class=""></span></div><div class=""><form class=""></form></div></body></html>'
};

var e = {
  label: "nyt",
  html: '<html><body><div class=""></div><div class=""></div><div class=""><div class=""><div class=""><button class=""><i class=""></i><span class=""></span></button><a class=""></a></div><div class=""><div class=""></div><div class=""><button class=""></button><button class=""></button><button class=""><i class=""></i><span class=""></span></button><button class=""><i class=""></i><span class=""></span></button></div></div></div></div><div class=""><div class=""><ul class=""><li class=""></li><li class=""><a class=""></a></li><li class=""><a class=""></a></li></ul></div><div class=""></div><div class=""></div><h2 class=""><a class=""><svg class=""><image class=""></image></svg></a></h2><ul class=""><li class=""></li><li class=""><a class=""></a></li><li class=""><a class=""></a></li><li class=""></li><li class=""></li></ul></div><nav class=""><h2 class=""></h2><ul class=""><li class=""><button class=""><i class=""></i><span class=""></span></button></li><li class=""><button class=""><i class=""></i><span class=""></span></button></li><li class=""><a class=""></a></li><li class=""><button class=""></button></li></ul></nav><div class=""><button class=""><i class=""></i><span class=""></span></button><div class=""><div class=""><small class=""></small></div></div><nav class=""><h2 class=""></h2><form class=""><div class=""><div class=""><label class=""></label></div><div class=""><input class=""><button class=""><i class=""></i><span class=""></span></button><div class=""><ol class=""></ol></div><button class=""></button></div></div></form></nav></div><div class=""></div></body></html>'
};

var f = {
  label: "etsy",
  html: '<html><body><div class=""><div class=""><a class=""></a></div><a class=""><span class=""></span></a><div class=""><div class=""><form class=""><div class=""><label class=""></label><div class=""><input class=""><div class=""></div></div><div class=""><button class=""></button></div></div><input class=""></form></div></div><a class=""></a><ul class=""><li class=""><a class=""><span class=""></span></a></li><li class=""></li></ul></div></body></html>'
};

var g = {
  label: "kayak",
  html: '<html><body><header class=""><div class=""><div class=""><a class=""></a></div><div class=""><nav class=""><div class=""><div class=""><a class=""></a></div><div class=""><div class=""><a class=""><span class=""></span><span class=""><span class=""></span></span></a><div class=""><div class=""></div><div class=""><div class=""><a class=""><span class=""></span><span class=""></span></a></div></div></div></div></div></div></nav></div><div class=""><div class=""><div class=""><div class=""><a class=""></a></div><div class=""><div class=""><a class=""><span class=""></span><span class=""><span class=""><span class=""></span></span></span></a><div class=""><div class=""></div><div class=""><div class=""><a class=""><span class=""><span class=""></span></a></div></div></div></div></div><div class=""><a class=""><span class=""></span></a><div class=""><div class=""></div><div class=""><div class=""><nav class=""><div class=""><div class=""><a class=""></a></div></div></nav></div></div></div></div></div></div></div></div></header></body></html>'
};

var h = {
  label: "pinterest",
  html: '<html><body><div class=""><div class=""><div class=""><div class=""><div class=""><button class=""><em></em><span class=""></span><span class=""></span></button></div><button class=""><div class=""><div class=""><div class=""><img src=""></div></div><span class=""></span></div></button></div></div><div class=""><a class="" href=""><em></em><span class=""></span></a><div class=""><form><div class=""><div class=""><div class=""><div class=""><ul class=""><li class=""><input class=""></li></ul></div><a class=""><em></em></a></div></div><div class=""><ul class=""></ul></div></div></form></div></div></div></div></body></html>'
};

var i = {
  label: "github",
  html: '<html><body><div class=""><a class=""></a><div class=""><form class=""></form></div><ul class=""><li class=""><a class=""></a></li></ul><ul class=""><li class=""><span class=""></span></li><li class=""><a class=""></a><div class=""><ul class=""><a class=""></a><a class=""></a></ul></div></li><li class=""><a class=""></a><div class=""><div class=""><div class=""><strong class=""></strong></div><div class=""></div><a class=""></a><div class=""></div><a class=""></a><form class=""></form></div></div></li></ul></div></body></html>'
}

var j = {
  label: "instagram",
  html: '<html><body><nav class=""><div class=""><a class=""></a><div class=""><div class=""><input class=""><div class=""><div class=""><span class=""></span></div></div></div><a class=""></a></div></div></nav></body></html>'
};

// var a = {
//   label: "a",
//   html: "<html><body><div><ul><li></li><li></li><li></li></ul></div></body></html>"
// };
// var b = {
//   label: "b",
//   html: "<html><body><head><nav><div></div><div></div><div></div></nav></head></body></html>"
// };
// var c = {
//   label: "c",
//   html: "<html><body><div><ol><li></li><li></li><li></li></ol></div></body></html>"
// };
// var d = {
//   label: "d",
//   html: "<html><body><div><ul><li></li><li></li><li></li></ul></div></body></html>"
// };

// var htmlDomSet = [
//   a, b, c, d
// ];

var htmlDomSet = [
  a, b, c, d, e, f, g, h, i, j
];

for (var i = 0; i < htmlDomSet.length; i++) {
  for (var j = i + 1; j < htmlDomSet.length; j++) {
    compare(htmlDomSet[i], htmlDomSet[j]);
  }
}