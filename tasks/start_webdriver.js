/*
 * grunt-start-webdriver
 * https://github.com/mbriggs/grunt-start-webdriver
 *
 * Copyright (c) 2014 Matt Briggs
 * Licensed under the MIT license.
 */

'use strict';
var spawn = require("child_process").spawn;

function exec(command){
  var child = spawn('/bin/sh', ['-c', command], {
    cwd: process.cwd(),
    stdio: [process.stdin]
  });

  var encoding = "utf8";

  child.stdout.setEncoding(encoding);
  child.stderr.setEncoding(encoding);

  return child;
}

function destruct(process, grunt){
  return function(){
    process.stdout.destroy();
    process.stderr.destroy();

    grunt.fatal('selenium terminated unexpectedly');
  }
}

module.exports = function (grunt) {

  grunt.registerMultiTask('webdriver', '_only_ starts the selenium webdriver', function () {
    var defaultCommand = "webdriver-manager start";
    var taskComplete = this.async();

    var options = this.options({
      startCommand: defaultCommand,
      debug: false
    });

    if(options.startCommand == defaultCommand)
       grunt.log.writeln("no startCommand found, using webdriver-manager (from protractor)");

    var selenium = exec(options.startCommand);
    grunt.log.writeln('launching webdriver...');

    selenium.addListener('exit', destruct(selenium, grunt));
    selenium.addListener('close', destruct(selenium, grunt));

    selenium.stdout.addListener('data', function(out){
      if(options.debug) grunt.log.write('SELENIUM: ' + out);

      if(out.match(/Started org\.openqa\.jetty\.jetty\.Server/)){
        grunt.log.write('selenium initialized');
        taskComplete();
      }
    });

    selenium.stderr.addListener('data', function(err){
      if(options.debug) grunt.log.error(err);
    });
  });
};
