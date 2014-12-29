task :default => [:compile]

task :compile do
  sh("kmyacc src/lambda.jsy; mv src/lambda.js .");
  sh("java -jar lib/yuicompressor.jar --type js lambda.js > lambda.min.js")
end 