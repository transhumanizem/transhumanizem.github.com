Article.all.each do |article|

  format = article.is_html? ? :html : :markdown
  tstamp = article.created_at.strftime "%Y-%m-%d"
  filename = "#{tstamp}-#{article.permalink}.#{format}"
  front_matter = <<-EOS
---
layout: post
title: "#{article.title}"
categories: [#{article.tags.map(&:name).join(", ")}]
last_updated: #{article.updated_at.strftime "%Y-%m-%d"}
source_url: "#{article.source_url}"
author: "#{article.author.name}"
---
  EOS

  File.open("#{RAILS_ROOT}/jekyll/_posts/#{filename}", "w") do |f|
    f << front_matter
    f.puts
    f << article.body_source
  end


end

 #=> ["permalink", "is_html", "created_at", "title", "body_source", "body", "updated_at", "source_url", "id", "user_id", "author_id"]
#
