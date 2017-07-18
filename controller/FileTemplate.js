'use babel';

export let FileTemplate =

          {
              ".php":`<?php
                        echo "hello world";
                      ?>`,

              ".java":`
                        import java.util.*;
                        import java.io.*;
                        public class ClassName{

                        }`,

              ".html":`
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <meta charset="utf-8">
                            <title></title>
                          </head>
                          <body>

                          </body>
                        </html>`,

              ".js":`

                      (function(){

                          console.log("hello world");

                      })();`,


              ".py":`
                      print "hello world"

                    `




          };
