// This file is required by the index.html file and will
// be executed in the computational process for that window.

window.quitApp = function(){
  const electron = require('electron');
  const remote = electron.remote;
  if (process.platform !== 'darwin') { remote.app.exit(); }
}

window.tableClear = function (){
  var elems = document.getElementsByTagName("table");
  var matches = [];
  for (var i=0, m=elems.length; i<m; i++) {
      if (elems[i].id && elems[i].id.indexOf("tblRand") != -1) {
          matches.push(elems[i]);
      }
  }
  for(var i=1 ; i<matches.length+1;i++ ){
    var tableR = document.getElementById('tblRand' +i);
    tableR.parentNode.removeChild(tableR);
  }
  document.getElementById('cntTbls').value=0;
}

window.randomGen = function() {
  var rand = Math.floor(Math.random() * 1786) + 5878;
  var array = new Uint32Array(2);
  var cntL = parseInt(document.getElementById("cntLen").value,10) ;
  document.getElementById('RandomValue').innerHTML=randomString(cntL);
}

window.randomString = function(len, an){
    an = an&&an.toLowerCase();
    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
    for(;i++<len;){
      var r = Math.random()*(max-min)+min <<0;
      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
    }
    return str;
}
window.tableCreate =   function (row,col){
    var cntTbl = parseInt(document.getElementById("cntTbls").value,10) ;
    var body = document.body,
        tbl  = document.createElement('table');
    tbl.id='tblRand'+ ++cntTbl;
    document.getElementById('cntTbls').value=cntTbl;
    tbl.setAttribute("border-collapse", "collapse");
    tbl.setAttribute("class", "tblRandZ");
    tbl.style.width  = '100px';
    tbl.style.border = '1px solid black;';

      for(var i = 0; i < row; i++){
          var tr = tbl.insertRow();
          for(var j = 0; j < col; j++){
            /* if(i == 2 && j == 1){
                  break;
              } else {
                */
                  var td = tr.insertCell();
                  var cntL = parseInt(document.getElementById("cntLen").value,10) ;
                  td.appendChild(document.createTextNode(randomString(cntL)));
                  td.style.border = '1px solid';
                  /*if(i == 1 && j == 1){
                      td.setAttribute('rowSpan', '2');
                  }*/
              //}
          }
      }
      body.appendChild(tbl);
      body.appendChild(document.createElement('p'));
  }
