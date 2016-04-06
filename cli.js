#!/usr/bin/env node
zencode = require( __dirname+"/.")
var data = {}
if( process.argv.length <3 ){
  console.log( "Usage: zencode <string|file>" );
  console.log( "\nexample:\n\t$ zencode 'a>b>div'");
  process.exit()
}

function get(input){
  var obj = input;
  try {
    obj = require('fs').readFileSync( input ).toString()
  }catch(e){ }
  return obj
}
var input = get(process.argv[2]);

console.log( zencode( input ) );
