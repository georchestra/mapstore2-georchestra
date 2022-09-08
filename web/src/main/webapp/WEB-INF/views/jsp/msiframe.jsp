<%@ page language="java" contentType="text/html; charset=UTF-8" isELIgnored="false" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Redirection vers Mapstore</title>
  <style type="text/css">
    html, body {
      height: 100%;
      margin:  0;
    }
    
    #wrapper {
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      font-family: 'Courier New', monospace;
    }
    
    #error {
      display: none;
      border: 1px solid;
      margin: 10px 0px;
      padding: 15px 10px 15px 50px;
      background-repeat: no-repeat;
      background-position: 10px center;
      color: #D8000C;
      background-color: #FFBABA;
    }
    
    .lds-facebook {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-facebook div {
      display: inline-block;
      position: absolute;
      left: 8px;
      width: 16px;
      background: #fcf;
      animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook div:nth-child(1) {
      left: 8px;
      animation-delay: -0.24s;
    }
    .lds-facebook div:nth-child(2) {
      left: 32px;
      animation-delay: -0.12s;
    }
    .lds-facebook div:nth-child(3) {
      left: 56px;
      animation-delay: 0;
    }
    @keyframes lds-facebook {
      0% {
        top: 8px;
        height: 64px;
      }
      50%, 100% {
        top: 24px;
        height: 32px;
      }
    }
  </style>
  <script type="text/javascript">
    function sendErrorsMessage(message) {
      document.getElementById("load").style.display = "none";
      document.getElementById("error").innerHTML = message;
      document.getElementById("error").style.display = "block";
    };
    
    function redirectPost(url, data) {
      var form = document.createElement('form');
      document.body.appendChild(form);
      form.method = 'post';
      form.action = url;
      for (var name in data) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = data[name];
        form.appendChild(input);
      }
      form.submit();
    };
    
    var baseUrl = "/mapstore/";
    
    <c:choose>
        <c:when test="${not empty defaultContext}">
            var defaultContext = "${defaultContext}";
        </c:when>
        <c:otherwise>
            var defaultContext = null;
        </c:otherwise>
    </c:choose>
  </script>
</head>
<body>
  <div id="wrapper">
    <div id="load">
      <div class="lds-facebook"><div></div><div></div><div></div></div>
      <p>Chargement...</p>
    </div>
    <div id="error"></div>
  </div>
  <script type="text/javascript">
    //Init variables
    var errorMessages = [];
    var map = {};
    map.layers = [];
    var actions = [];
  
    var qd = {};
    location.search.substr(1).split("&").forEach(function(item) {qd[item.split("=")[0]] = item.split("=")[1]});
  
    var contextUrl = null, mapContext = null, catalogsContext = null;
    var urls = [];
  
    if( !qd.c ) {
      if( defaultContext != null ) {
        contextUrl = "../../#/context/"+defaultContext;
        urls.push(baseUrl+"rest/geostore/misc/category/name/CONTEXT/resource/name/"+defaultContext);
      } else {
        contextUrl = "../../#/";
        urls.push(baseUrl+"configs/config.json");
        urls.push(baseUrl+"configs/localConfig.json");
      }
    } else if( qd.c.match(/[^a-zA-Z0-9]/) ) {
      throw "Le nom de contexte fourni n'est pas valide !";
    } else {
      contextUrl = "../../#/context/"+qd.c;
      urls.push(baseUrl+"rest/geostore/misc/category/name/CONTEXT/resource/name/"+qd.c);
    }
  
    var requests = urls.map(function(url){
      return fetch(url).then(function(response) {
        if( response.url.endsWith(".json") ) {
          return response.json();
        }
        return response.text();
      });
    });
  
    Promise.all(requests).then((results) => {
      results.forEach(response => {
        if( typeof response == "string" ) {
          let xml = new window.DOMParser().parseFromString(response, "text/xml");
          let context = JSON.parse(xml.querySelector("data data").innerHTML);
          mapContext = context.mapConfig.map;
          catalogsContext = context.mapConfig.catalogServices;
        } else if( response.map ) {
          mapContext = response.map;
        } else if( response.initialState.defaultState.catalog.default ) {
          catalogsContext = response.initialState.defaultState.catalog.default;
        } else {
          // Error !
          throw "Unknown fetched file format !";
        }
      });
      
      if( !mapContext || !catalogsContext || !catalogsContext.selectedService || !catalogsContext.services ) {
        throw "Missing configuration element(s) !";
      }
      
      var defaultCatalog = catalogsContext.selectedService;
      var catalogsList = catalogsContext.services;

      // Retrieving background layers
      var backgroundsLayers = [];
      mapContext.layers.forEach(l => {
        if( l.group == "background" ) backgroundsLayers.push(l);
      });

      // Get x and y
      if( !isNaN(parseFloat(qd.x)) && !isNaN(parseFloat(qd.y)) ) {
        map.center = {x: parseFloat(qd.x), y: parseFloat(qd.y), crs: mapContext.projection};
      } else if( qd.x || qd.y ) {
        throw "The x or y values are invalid ! (Only numbers)";
      }

      // Retrieve zoom
      if( !isNaN(parseInt(qd.z)) ) {
        map.zoom = parseInt(qd.z);
      } else if( qd.z ) {
        throw "The z value is invalid ! (Only number)";
      }

      // Retrieve background to select
      if( !isNaN(parseInt(qd.lb)) ) {
        if( parseInt(qd.lb) > backgroundsLayers.length ) {
          throw "The background number (lb) is invalid ! Maximum : "+backgroundsLayers.length+".";
        }
    
        backgroundsLayers.forEach((bg,index) => {
          if( index == parseInt(qd.lb) ) {
            bg.visibility = true;
          } else {
            bg.visibility = false;
          }
          map.layers.push(bg);
        });
      } else if( qd.lb ) {
        throw "The lb value is invalid ! (Only number)";
      }

      // Retrieve layers to load
      if( qd.layers ) {
        var layers = qd.layers.split(',');
        layers.forEach(l => {
          let params = l.split('*');
          let layer = {};
          layer.title = params[0];
          layer.name = params[0];
          var catalog;
          if(params.length>1 && params[1]) {
            catalog = catalogsList[params[1]];
            if( !catalog ) {
              throw "The catalog id is invalid ! No corresponding catalog in context.";
            }
          } else {
            catalog = catalogsList[defaultCatalog];
          }
          layer.type = catalog.type;
          layer.url = catalog.url;
          layer.visibility = true;
    
          if(params.length>2 && params[2]) {
            layer.style = params[2];
          }
    
          if(params.length>3 && params[3]) {
            layer.params = {};
            layer.params.cql_filter = decodeURIComponent(params[3]);
          }
    
          map.layers.push(layer);
        });
      }

      // Retrieving search param
      if( qd.s ) {
        var explode = qd.s.split('*');
        if( explode.length == 2 ) {
          let action = {type: "SEARCH:SEARCH_WITH_FILTER", layer: explode[0], cql_filter: decodeURIComponent(explode[1])};
          actions.push(action);
        }
      }
    
      var postParameters = {version: 2, map: map};
      redirectPost(baseUrl+"rest/config/setParams", {map: JSON.stringify(postParameters), page: contextUrl, actions: JSON.stringify(actions)});
    }).catch(function(err) {
      console.log(err);
      sendErrorsMessage("Error retrieving context's configuration : "+err);
    });
  </script>
</body>
</html>
