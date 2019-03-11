module.exports = function solveSudoku(matrix) {
  a = matrix;
  // METHOD ODINOCHEK !!!
  function checkRow(a,i,j) {
    var arr1 = [];
    for (var k = 1; k <= 9; k++) {
      if (a[i].indexOf(k) == -1) arr1.push(k);
    }
    return arr1;
  }
  function checkCol(a,i,j) {
    var arr1 = [];
    var is;
    for (var k = 1; k <= 9; k++) {
      is = false;
      for (var x = 0; x < 9; x++) {
        if (a[x][j] == k ) is = true;
      }
      if (is == false)  arr1.push(k);
      is = false; 
    }
    return arr1;
  }
  function checkArray (a,imin,jmin,imax,jmax) {
    var arr2 = [];
    var arr1 = [];
    for (var i = imin; i < imax; i++) {
      for (var j = jmin; j < jmax; j++) {
        if (a[i][j] != 0) arr2.push(a[i][j]);
      }
    }
    var is = false;
    for (var k = 1; k <= 9; k++) {
      is = false;
      for (i = 0; i < arr2.length; i++) {
        if (arr2[i] == k) is = true;
      }
      if ( is == false) arr1.push(k);
    }
    return arr1;
  }
  function checkTheSame(ar1,ar2,ar3) {
    var arr = ar1.concat(ar2);
    arr = arr.concat(ar3);
    var k = 0;
    var matches = [];
    for (var e = 1; e <= 9; e++) {
      k = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == e) k++;
      }
      if (k == 3) matches.push(e);
    }
    //console.log('sovpadeniya massiv = '+matches);
    return (matches.length == 1) ? matches[0] : 0;
  }
  function zeroTest(a) {
    var array;
    for ( var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
       if (a[i][j] == 0) {
          //console.log('nolik na pozicii i = '+i+' j = '+j);
          if (i < 3) {
            if (j < 3) {
              array = checkArray(a,0,0,3,3);
            }
            if (j > 2 && j < 6) {
              array = checkArray(a,0,3,3,6)
            }
            if (j > 5) {
              array = checkArray(a,0,6,3,9)
            }
          }
          if (i > 2 && i < 6) {
            if (j < 3) {
              array = checkArray(a,3,0,6,3);
            }
            if (j > 2 && j < 6) {
              array = checkArray(a,3,3,6,6)
            }
            if (j > 5) {
              array = checkArray(a,3,6,6,9)
            }
          }
          if (i > 5) {
            if (j < 3) {
              array = checkArray(a,6,0,9,3);
            }
            if (j > 2 && j < 6) {
              array = checkArray(a,6,3,9,6)
            }
            if (j > 5) {
              array = checkArray(a,6,6,9,9)
            }
          }
         if (checkTheSame(checkRow(a,i,j),checkCol(a,i,j),array) != 0) { 
           a[i][j] = checkTheSame(checkRow(a,i,j),checkCol(a,i,j),array); return true;
          } 
          
        }
      }
    }
    return false;
  }
  var odinochkiMethod = true;
  while (odinochkiMethod) {
    odinochkiMethod = zeroTest(a);
  }
  /*for (i = 0; i < 9; i++) {
    console.log(a[i].join(' '));
  }*/
  // KONEC METHODA ODINOCHEK
  
  // METHOD PODSTANOVOK
  
    // proverka cho v ryadke net takoi cifri:
    function checkRow2(a,i,j,k) {
      var exist = false;
        if (a[i].indexOf(k) != -1) exist = true;
      return exist;
    }
    function checkColumn2(a,i,j,k) {
      var exist = false;
      for (var x = 0; x < 9; x++) {
        if (k == a[x][j]) exist = true;
      }
      return exist;
    }
    function checkArray2(a,i,j,k) {
      exist = false;
      function insideCheckArray(a,imin,jmin,imax,jmax,k) {
        for (var i = imin; i < imax; i++) {
          for (var j = jmin; j < jmax; j++) {
            if (a[i][j] == k) return true;
          }
        }
        return false;
      }
      if (i < 3) {
        if (j < 3) {
          exist = insideCheckArray(a,0,0,3,3,k);
        }
        if (j > 2 && j < 6) {
          exist = insideCheckArray(a,0,3,3,6,k)
        }
        if (j > 5) {
          exist = insideCheckArray(a,0,6,3,9,k)
        }
      }
      if (i > 2 && i < 6) {
        if (j < 3) {
          exist = insideCheckArray(a,3,0,6,3,k);
        }
        if (j > 2 && j < 6) {
          exist = insideCheckArray(a,3,3,6,6,k)
        }
        if (j > 5) {
          exist = insideCheckArray(a,3,6,6,9,k)
        }
      }
      if (i > 5) {
        if (j < 3) {
          exist = insideCheckArray(a,6,0,9,3,k);
        }
        if (j > 2 && j < 6) {
          exist = insideCheckArray(a,6,3,9,6,k)
        }
        if (j > 5) {
          exist = insideCheckArray(a,6,6,9,9,k)
        }
      }
      return exist;
    }
    function findZero(a,i,j) {
      var arr = [];
      for (x = i; x < 9; x++) {
        for (y = j; y < 9; y++) {
          if (a[x][y] == 0) {
            arr.push(x); arr.push(y);
            return arr;
          }
        }
      }
      for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
          if (a[x][y] == 0) {
            arr.push(x); arr.push(y);
            return arr;
          }
        }
      }
      return 0;
    }
    i = 0;
    j = 0;
    var count = 0;
    function podstanovka(a,i,j) {
      count++;
      if (count > 30000) return false; // ogranochenie na last test
      if (findZero(a,i,j) == 0) return true;
      arr = findZero(a,i,j);
      i = arr[0];
      j = arr[1];
      for (var k = 1; k <= 9; k++) {
        if (checkRow2(a,i,j,k) == false && checkColumn2(a,i,j,k) == false && checkArray2(a,i,j,k) == false) {
          a[i][j] = k;
          if (podstanovka(a,i,j) == true) return true;
          a[i][j] = 0;
        }
      }
      return false;
    }
  podstanovka(a,0,0);
return a;
  
}
