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
    console.log(parentEl.children);
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
  label: "a",
  html: "<html><body><div><ul><li></li><li></li><li></li></ul></div></body></html>"
};
var b = {
  label: "b",
  html: "<html><body><head><nav><div></div><div></div><div></div></nav></head></body></html>"
};
var c = {
  label: "c",
  html: "<html><body><div><ol><li></li><li></li><li></li></ol></div></body></html>"
};
var d = {
  label: "d",
  html: "<html><body><div><ul><li></li><li></li><li></li></ul></div></body></html>"
};

var htmlDomSet = [
  a, b, c, d
];

for (var i = 0; i < htmlDomSet.length; i++) {
  for (var j = i + 1; j < htmlDomSet.length; j++) {
    compare(htmlDomSet[i], htmlDomSet[j]);
  }
}