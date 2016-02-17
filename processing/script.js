// v1 - returns JSON object
function css(a) {
    var sheets = document.styleSheets, o = {};
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (a.is(rules[r].selectorText)) {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
    }
    return o;
}

function css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
        for (var i in css) {
            if ((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } else if (typeof css == "string") {
        css = css.split("; ");
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        }
    }
    return s;
}

// clean up html

function cleanHTML(node) {
  var data = $(node).data(),
      i;
  // Fetch all the key-names
  var keys = $.map(data , function(value, key) { return key; });
  // Loop through the keys, remove the attribute if the key contains "lorem".
  for(i = 0; i < keys.length; i++) {
    node = $(node).removeAttr("data-" + keys[i]);
      // if (keys[i].indexOf('lorem') != -1) {
      //
      // }
  }
  return node;
}

// v2
var $ = jQuery;
jQuery.fn.css = (function(css2) {
return function() {
  if (arguments.length) { return css2.apply(this, arguments); }
  var attr = ['font-family','font-size','font-weight','font-style','color',
      'text-transform','text-decoration','letter-spacing','word-spacing',
      'line-height','text-align','vertical-align','direction','background-color',
      'background-image','background-repeat','background-position',
      'background-attachment','opacity','width','height','top','right','bottom',
      'left','margin-top','margin-right','margin-bottom','margin-left',
      'padding-top','padding-right','padding-bottom','padding-left',
      'border-top-width','border-right-width','border-bottom-width',
      'border-left-width','border-top-color','border-right-color',
      'border-bottom-color','border-left-color','border-top-style',
      'border-right-style','border-bottom-style','border-left-style','position',
      'display','visibility','z-index','overflow-x','overflow-y','white-space',
      'clip','float','clear','cursor','list-style-image','list-style-position',
      'list-style-type','marker-offset'];
  var len = attr.length, obj = {};
  for (var i = 0; i < len; i++) {
      obj[attr[i]] = css2.call(this, attr[i]);
  }
  return obj;
};
})(jQuery.fn.css);

// get ALL children of nav bar element
function getChildren() {
  var nav_children = $('.page-nav').find('*');

  for (var i=0; i< nav_children.length; i++) {
    var child_css = $(nav_children[i]).css();
    var child_node = $(nav_children[i])[0].nodeName;
    var child_class = $(nav_children[i])[0].className;
    var css = cleanCSS(JSON.stringify(child_css));

    $('#css-output').append('<div class="css-attr">' + child_node.toLowerCase() + ' ' + css + '</div>');
    // console.log(child_node);
    // console.log(child_css);
    // console.log($(nav_children[i]).css());
  }
}

// need to clean this up but for now i don't know enough regex to do this properly
function cleanCSS(css) {
  var cleaned_css = css.replace(/"/g , "");
  var attr = ['font-family','font-size','font-weight','font-style','color',
      'text-transform','text-decoration','letter-spacing','word-spacing',
      'line-height','text-align','vertical-align','direction','background-color',
      'background-image','background-repeat','background-position',
      'background-attachment','opacity','width','height','top','right','bottom',
      'left','margin-top','margin-right','margin-bottom','margin-left',
      'padding-top','padding-right','padding-bottom','padding-left',
      'border-top-width','border-right-width','border-bottom-width',
      'border-left-width','border-top-color','border-right-color',
      'border-bottom-color','border-left-color','border-top-style',
      'border-right-style','border-bottom-style','border-left-style','position',
      'display','visibility','z-index','overflow-x','overflow-y','white-space',
      'clip','float','clear','cursor','list-style-image','list-style-position',
      'list-style-type','marker-offset'];

  for (var i = 0; i < attr.length; i++) {
    var regex = new RegExp('(,' + attr[i] + ')');
    cleaned_css = cleaned_css.replace(regex, ';' + attr[i]);
  }
  return cleaned_css;
}

$(document).ready(function() {
  getChildren();
});

// var style = css($("#elementToGetAllCSS"));
// $("#elementToPutStyleInto").css(style);
