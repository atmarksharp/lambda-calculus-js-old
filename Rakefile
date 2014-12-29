task :default => [:compile]

task :compile do
  filename = 'lambda-calculus';
  sh("kmyacc src/#{filename}.jsy; mv src/#{filename}.js .");
  sh("java -jar lib/yuicompressor.jar --type js #{filename}.js > #{filename}.min.js")
end 