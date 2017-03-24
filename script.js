// TODO maybe ghc, man, vi, vim, emacs, su, sudo

// process user input
function handleInput() {
  // get relevant objects
  var inputField = document.getElementById("cmd");
  var outputField = document.getElementById("output");
  // get user input
  var inputText = inputField.value;
  // assign appropriate output
  var outputText;
  
  // pwd
  if (inputText.slice(0, 3) == "pwd") {
    outputText = "/coding";
  }
  
  // echo (simplified version)
  else if (inputText == "echo") {
    outputText = "<br>";
  }
  else if (inputText.slice(0, 5) == "echo ") {
    // remove outer double quotes or single quotes
    var last = inputText.length - 1;
    if (inputText.charAt(5) == "\"" && inputText.charAt(last) == "\"" && 5 != last) {
      outputText = inputText.slice(6, last);
    }
    else if (inputText.charAt(5) == "'" && inputText.charAt(last) == "'" && 5 != last) {
      outputText = inputText.slice(6, last);
    }
    else {
      outputText = inputText.slice(5);
    }
  }
  
  // cd: currently not supported to change directory
  // of course this is no true cd implementation and not perfect
  else if (inputText.slice(0, 3) == "cd ") {
    if (inputText.slice(3) == "../coding" || inputText.slice(3) == "."){
      outputText = "<br>";
    }
    else if (inputText.slice(3) == ".." || inputText.slice(3) == "./..") {
      outputText = "cd: " + inputText.slice(3) + ": Permission Denied"
    }
    else {
      outputText = "-bash: cd: " + inputText.slice(3) + ": No such file or directory";
    }
  }
  
  // ls
  // of course this is no true ls implementation and not perfect
  else if (inputText.slice(0, 2) == "ls") {
    if (inputText.length == 2) {
      // plain ls
      outputText = "fizzbuzz.hs<br>fizzbuzz";
    }
    else {
      // get flags
      var afterFlags = 3;
      var flags = "";
      if (inputText.charAt(3) == "-") {
        var i = 4;
        while (inputText.charAt(i) != " " && i < inputText.length) {
          ++i;
        }
        afterFlags = i + 1;
        flags = inputText.slice(4, i);
      }
      // apply ls
      if (inputText.slice(afterFlags) == "../coding" || inputText.slice(afterFlags) == "." || inputText.slice(afterFlags) == ""){
        if (flags.search("l") != -1) {
          if (flags.search("a") != -1) {
            // -la
            outputText = "total 21896<br>"
                       + "drwxr-xr-x   5 vanHavel  staff       170 23 Mar 22:55 .<br>"
                       + "drwxr-xr-x  10 vanHavel  staff       340 23 Mar 22:42 ..<br>"
                       + "-rwxrwxr-x@  1 vanHavel  staff        71  3 Mar  2014 .quine.py<br>"
                       + "-rwxr-xr-x   1 vanHavel  staff  11198968 23 Mar 22:54 fizzbuzz<br>"
                       + "-rw-r--r--@  1 vanHavel  staff       273 23 Mar 22:54 fizzbuzz.hs";
          }
          else {
            // -l
            outputText = "total 21888<br>"
                       + "-rwxr-xr-x  1 vanHavel  staff  11198968 23 Mar 22:54 fizzbuzz<br>"
                       + "-rw-r--r--@ 1 vanHavel  staff       273 23 Mar 22:54 fizzbuzz.hs";
          }
        }
        else {
          if (flags.search("a") != -1) {
            // -a
            outputText = ".<br>..<br>.quine.py<br>fizzbuzz.hs<br>fizzbuzz";
          }
          else {
            // no flags
            outputText = "fizzbuzz.hs<br>fizzbuzz";
          }
        }
      }
      else if (inputText.slice(3) == ".." || inputText.slice(3) == "./..") {
        outputText = "ls: " + inputText.slice(3) + ": Permission Denied"
      }
      else {
        outputText = "-bash: ls: " + inputText.slice(3) + ": No such file or directory";
      }
    }
  }
  
  // cat
  else if (inputText == "cat") {
    outputText = "<br>";
  }
  else if (inputText.slice(0, 4) == "cat ") {
    if (inputText.slice(4) == ".quine.py") {
      outputText = "x=\"\"\"print('x='+'\"'*3+x+'\"'*3+';'+x)\"\"\";print('x='+'\"'*3+x+'\"'*3+';'+x)";
    }
    else if (inputText.slice(4) == "fizzbuzz.hs") {
      outputText = "main = print . join $ map fizzbuzz [1..50]<br>"
                 + "  where join = foldl1 (\ x y -> x ++ \" \" ++ y)<br>" 
                 + "<br>"
                 + "fizzbuzz :: Int -> String<br>"
                 + "fizzbuzz i | i `mod` 15 == 0 = \"fizzbuzz\"<br>"
                 + "           | i `mod`  5 == 0 = \"buzz\"<br>"
                 + "           | i `mod`  3 == 0 = \"fizz\"<br>"
                 + "           | otherwise       = show i";
    }
    else if (inputText.slice(4) == "fizzbuzz") {
      outputText = "z2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUz2cUzvZR_info_dsp_ghczmprim_GHCziClasses_CZCZL";
    }
    else {
      outputText = "cat: " + inputText.slice(4) + ": No such file or directory";
    }
  }
  
  // python
  else if (inputText == "python") {
    outputText = "Python 2.7.10 (default, Jul 30 2016, 19:40:32)";
  }
  else if (inputText.slice(0, 7) == "python ") {
    if (inputText.slice(7) == ".quine.py" || inputText.slice(7) == "./.quine.py") {
      outputText = "x=\"\"\"print('x='+'\"'*3+x+'\"'*3+';'+x)\"\"\";print('x='+'\"'*3+x+'\"'*3+';'+x)";
    }
    else {
      outputText = "python: can't open file '" + inputText.slice(7) + "': [Errno 2] No such file or directory";
    }
  }
  
  // python3
  else if (inputText == "python3") {
    outputText = "Python 3.6.0 (default, Dec 24 2016, 08:01:42)";
  }
  else if (inputText.slice(0, 8) == "python3 ") {
    if (inputText.slice(8) == ".quine.py" || inputText.slice(8) == "./.quine.py") {
      outputText = "x=\"\"\"print('x='+'\"'*3+x+'\"'*3+';'+x)\"\"\";print('x='+'\"'*3+x+'\"'*3+';'+x)";
    }
    else {
      outputText = "python3: can't open file '" + inputText.slice(8) + "': [Errno 2] No such file or directory";
    }
  }
  
  // run
  else if (inputText == "./fizzbuzz" || inputText == "fizzbuzz") {
    outputText = "\"1 2 fizz 4 buzz fizz 7 8 fizz buzz 11 fizz 13 14 fizzbuzz 16 17 fizz 19 buzz fizz 22 23 fizz"
               + " buzz 26 fizz 28 29 fizzbuzz 31 32 fizz 34 buzz fizz 37 38 fizz buzz 41 fizz 43 44 fizzbuzz 46 47 fizz 49 buzz\"";
  }
  else if (inputText == "./.quine.py" || inputText == ".quine.py") {
    outputText = "-bash: "+ inputText + ": must be executed by python interpreter";
  }
  
  // default cases: print error messages
  else if (inputText.charAt(0) == "/" 
      || inputText.slice(0, 2) == "./"
      || inputText.slice(0, 3) == "../") 
  {
    outputText = "-bash: " + inputText + ": no such file or directory"
  }
  else {
    outputText = "-bash: " + inputText + ": command not found";
  }
  
  //never display empty text
  if (outputText == "") {
    outputText = "<br>";
  }
  // put output in text field
  outputField.innerHTML = outputText;
}