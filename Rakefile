# Github pages publishing.
require "jekyll"
require 'tmpdir'

desc "Publish Github pages site"
task :publish => :test do
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

desc "Execute unit tests"
task :test do
  sh "bundle exec jekyll build"
  sh "./script/cibuild"
end

desc "Clean rendered site and asset cache"
task :clean do
  sh "ls -d .asset-cache _site && rm -rf .asset-cache _site"
end
