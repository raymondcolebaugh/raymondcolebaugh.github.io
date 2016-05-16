# Github pages publishing.
require "jekyll"
require "reduce"
require 'tmpdir'

namespace :site do

  desc "Publish Github pages site"
  task :publish => :minify do
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

  # thanks http://davidensinger.com/2013/08/how-i-use-reduce-to-minify-and-optimize-assets-for-production/
  desc "Minify _site/"
  task :minify do
      puts "\n## Compressing static assets"
      original = 0.0
      compressed = 0
      Dir.glob("_site/**/*.*") do |file|
          case File.extname(file)
          when ".css", ".gif", ".html", ".jpg", ".jpeg", ".js", ".png", ".xml"
              puts "Processing: #{file}"
              original += File.size(file).to_f
              min = Reduce.reduce(file)
              File.open(file, "w") do |f|
                  f.write(min)
              end
              compressed += File.size(file)
          else
              puts "Skipping: #{file}"
          end
      end
      puts "Total compression %0.2f\%" % (((original-compressed)/original)*100)
  end
end

