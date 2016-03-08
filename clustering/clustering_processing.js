var data = [ 
  {'websites': 'BuzzFeed/Spotify' , 'size': 0, 'diff': 0.02915451895},
  {'websites': 'BuzzFeed/Twitter' , 'size': 0, 'diff': 0.04597701149},
  {'websites': 'BuzzFeed/Youtube' , 'size': 0, 'diff': 0.06451612903},
  {'websites': 'BuzzFeed/NYT' , 'size': 0, 'diff': 0.0378250591},
  {'websites': 'BuzzFeed/Etsy' , 'size': 0, 'diff': 0.05555555556 },
  {'websites': 'BuzzFeed/Kayak' , 'size': 0, 'diff': 0.02610966057},
  {'websites': 'BuzzFeed/Pinterest' , 'size': 0, 'diff': 0.04733727811},
  {'websites': 'BuzzFeed/GitHub' , 'size': 0, 'diff': 0.05755395683},
  {'websites': 'BuzzFeed/Instagram' , 'size': 0, 'diff': 0.04032258065},
  {'websites': 'Spotify/Twitter' , 'size': 0, 'diff': 0.03194888179},
  {'websites': 'Spotify/Youtube' , 'size': 0, 'diff': 0.04694835681},
  {'websites': 'Spotify/NYT' , 'size': 0, 'diff': 0.02577319588},
  {'websites': 'Spotify/Etsy' , 'size': 0, 'diff': 0.0395256917},
  {'websites': 'Spotify/Kayak' , 'size': 0, 'diff': 0.08045977011},
  {'websites': 'Spotify/Pinterest' , 'size': 0, 'diff': 0.03300330033},
  {'websites': 'Spotify/GitHub' , 'size': 0, 'diff': 0.04115226337},
  {'websites': 'Spotify/Instagram' , 'size': 0, 'diff': 0.04694835681},
  {'websites': 'Twitter/Youtube' , 'size': 0, 'diff': 0.07339449541},
  {'websites': 'Twitter/NYT' , 'size': 0, 'diff': 0.05597964377},
  {'websites': 'Twitter/Etsy' , 'size': 0, 'diff': 0.08527131783},
  {'websites': 'Twitter/Kayak' , 'size': 0, 'diff': 0.0283286119},
  {'websites': 'Twitter/Pinterest' , 'size': 0, 'diff': 0.07142857143},
  {'websites': 'Twitter/GitHub' , 'size': 0, 'diff': 0.06451612903},
  {'websites': 'Youtube/NYT' , 'size': 0, 'diff': 0.05460750853},
  {'websites': 'Youtube/Etsy' , 'size': 0, 'diff': 0.1012658228},
  {'websites': 'Youtube/Kayak' , 'size': 0, 'diff': 0.0395256917},
  {'websites': 'Youtube/Pinterest' , 'size': 0, 'diff': 0.07692307692},
  {'websites': 'Youtube/GitHub' , 'size': 0, 'diff': 0.1081081081},
  {'websites': 'Youtube/Instagram' , 'size': 0, 'diff': 0.1186440678},
  {'websites': 'NYT/Etsy' , 'size': 0, 'diff': 0.06606606607},
  {'websites': 'NYT/Kayak' , 'size': 0, 'diff': 0.02336448598},
  {'websites': 'NYT/Pinterest' , 'size': 0, 'diff': 0.08355091384},
  {'websites': 'NYT/GitHub' , 'size': 0, 'diff': 0.04953560372},
  {'websites': 'NYT/Instagram', 'size': 0, 'diff': 0.03412969283},
  {'websites': 'Etsy/Kayak', 'size': 0, 'diff': 0.03412969283},
  {'websites': 'Etsy/Pinterest', 'size': 0, 'diff': 0.08870967742},
  {'websites': 'Etsy/GitHub', 'size': 0, 'diff': 0.08510638298},
  {'websites': 'Etsy/Instagram', 'size': 0, 'diff': 0.06329113924},
  {'websites': 'Kayak/Pinterest', 'size': 0, 'diff': 0.02915451895},
  {'websites': 'Kayak/GitHub', 'size': 0, 'diff': 0.03533568905},
  {'websites': 'Kayak/Instagram', 'size': 0, 'diff': 0.0395256917},
  {'websites': 'Pinterest/GitHub', 'size': 0, 'diff': 0.06722689076},
  {'websites': 'Pinterest/Instagram', 'size': 0, 'diff': 0.04807692308},
  {'websites': 'GitHub/Instagram', 'size': 0, 'diff': 0.06756756757},
];

var cluster1 = [ 0, 1, 3, 5, 6, 8, 9, 10, 11, 12, 14, 15, 16, 20, 25, 30, 32, 33, 34, 38, 39, 40, 42 ];

var cluster2 = [ 2, 4, 7, 13, 17, 18, 21, 22, 23, 26, 29, 37, 41, 43 ];

var cluster3 = [ 19, 24, 27, 28, 31, 35, 36 ];

var clusters = [cluster1, cluster2, cluster3];

for (var k=0; k<clusters.length; k++) {
  console.log("CLUSTER " + (k+1));
  for (var i=0; i<clusters[k].length; i++) {
    var j = clusters[k][i];
    console.log(data[j].websites);
  }
}
