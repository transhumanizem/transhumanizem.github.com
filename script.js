var tagPicker   = document.getElementById("tag-picker")

if (tagPicker) {
  var titleTag    = snack.qwery("section.articles h1")[0]
  var origTitle   = titleTag.innerHTML.trim()
  var showAll     = snack.qwery("section.articles h1 a")[0]
  var articleList = snack.qwery("section.articles ul.articles")[0]
  var articles    = snack.qwery("li", articleList)
  var activeTag

  function filterArticles(el) {
    var tag = el.getAttribute("href").split("#")[1]
    if (tag === "_") return

    snack.each(articles, function(article) {
      var link = snack.qwery("a", article)[0]
      var tags = link.getAttribute("data-tags").split(",")

      if (activeTag) activeTag.removeAttribute("class")
      activeTag = el
      activeTag.setAttribute("class", "active")

      showAll.removeAttribute("style")
      articleList.setAttribute("class", "filtered")
      article.removeAttribute("class", "selected")

      snack.each(tags, function(tagged) {
        if (tagged.trim() && tagged.trim() === tag) {
          article.setAttribute("class", "selected")
          return
        }
      })

    })
  }

  var params = {
    node: tagPicker,
    event: "click",
    delegate: function(node) {
      return snack.qwery("li.tag a", node)
    }
  }
  snack.listener(params, function(ev) {
    filterArticles(this)
  })

  snack.listener({ node: showAll, event: "click" }, function() {
    this.setAttribute("style", "display:none")
    articleList.removeAttribute("class")
  })

  var hashTag = document.location.hash.split("#")[1]
  if (hashTag) {
    var link = snack.qwery("section.tags a[href='#" + hashTag + "']")[0]
    if (link) filterArticles(link)
  }
}
