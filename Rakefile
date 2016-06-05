# Github pages publishing.
require "jekyll"
require "reduce"
require 'tmpdir'

desc "Publish Github pages site"
task :publish do
# Compile the Jekyll site using the config.
Jekyll::Site.new(Jekyll.configuration({
  "source"      => ".",
  "destination" => "_site",
  "config" => "_config.yml"
})).process

origin = 'git@github.com:raymondcolebaugh/raymondcolebaugh.github.io.git'

Dir.mktmpdir do |tmp|
  cp_r "_site/.", tmp
  Dir.chdir tmp

  system "git init"
  system "git add . && git commit -m 'Site updated at #{Time.now.utc}'"
  system "git remote add origin #{origin}"
  system "git push origin master --force"
end
end

