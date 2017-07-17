/*
 * script.js
*/

 var allFlux = [
   {
     url: "http://www.lemonde.fr/rss/une.xml",
     main: "http://www.lemonde.fr",
     title: "Le Monde",
     color: "2D3143"
   },
   {
     url: "https://hnrss.org/frontpage",
     main: "https://news.ycombinator.com",
     title: "Hacker News",
     color: "FF6600"
   },
   {
     url: "https://lobste.rs/rss",
     main: "https://lobste.rs",
     title: "Lobsters",
     color: "EE0000"
   },
   {
     url: "https://korben.info/feed",
     main: "https://korben.info",
     title: "Korben",
     color: "41557A"
   },
   {
     url: "https://www.journalduhacker.net/rss",
     main: "https://www.journalduhacker.net",
     title: "Journal du Hacker",
     color: "8C2F37"
   },
   {
     url: "https://www.producthunt.com/feed",
     main: "https://www.producthunt.com",
     title: "Product Hunt",
     color: "DA552F"
   },
   {
     url: "http://rss.nytimes.com/services/xml/rss/nyt/World.xml",
     main: "https://www.nytimes.com",
     title: "NY Times",
     color: "000000"
   },
   {
     url: "https://www.reddit.com/.rss",
     main: "https://www.reddit.com",
     title: "Reddit",
     color: "5F99CF"
   },
   {
     url: "https://lehollandaisvolant.net/rss.php",
     main: "https://lehollandaisvolant.net",
     title: "Le Hollandais volant",
     color: "FFCD00"
   },
   {
     url: "https://hackaday.com/blog/feed",
     main: "https://hackaday.com",
     title: "Hack a Day",
     color: "28931F"
   },
   {
     url: "https://news.google.fr/?output=rss",
     main: "https://news.google.fr",
     title: "Google news",
     color: "888888"
   },
   {
     url: "http://www.rollingstone.com/rss",
     main: "http://www.rollingstone.com",
     title: "Rolling Stone",
     color: "C10303"
   }
 ]

function parseItem(item, isFeed) {
  var itemLink = item.find("link").text()
  if (isFeed) itemLink = $(item.find("link")).attr("href")
  return {
    title: item.find("title").text(),
    link: itemLink,
    description: item.find("description").text(),
    pubDate: item.find("pubDate").text(),
    author: item.find("author").text(),
    enclosure: item.find("enclosure").text(),
    comments: item.find("comments").text(),
    guid: item.find("guid").text()
  }
}

function displayItems(fluxId, rssurl, color) {
  var corsProxy = "https://cors-anywhere.herokuapp.com/"
  var url = corsProxy + rssurl
  $.get(url, function(data) {
      var $xml = $(data)
      var nbMaxItems = 10
      var arr = $xml.find("item")
      if (arr.length === 0) {
        var isFeed = true
        arr = $xml.find("entry")
      }
      for (var i=0; i<nbMaxItems; i++) {
        var item = parseItem($(arr[i]), isFeed)
        $("."+fluxId).append("<li><a href=\""+item.link+"\" title=\""+item.title+"\">"+item.title+"</a></li>")
      }
  })
}

function displayBox(c, title, mainPage, color) {
  $("#container").append("<div><center><div class=\"title\" style=\"color:#"+color+";\"><a href=\""+mainPage+"\">"+title+"</a></div></center><ul class=\""+c+"\" style=\"color:#"+color+";\"></ul></div>")
}

function displayFlux(flux) {
  for (var i=0; i<flux.length; i++) {
    var item = flux[i]
    displayBox("flux"+i, item.title, item.main, item.color)
    displayItems("flux"+i, item.url)
  }
}

$(document).ready(function() {
  displayFlux(allFlux)
})
