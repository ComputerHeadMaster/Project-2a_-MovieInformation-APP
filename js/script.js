//

  let teatteriID;
  
  //Mitä näytetään sivustolle
  function nayElokuvat() {

    //vaihtoehdot teattereille
    document.getElementById("cinema");
    switch (document.getElementById("cinema").value) {
      case "Pääkaupunkiseutu":
          teatteriID = 1014;
         break;
      case "Espoo":
         teatteriID = 1012;
         break;
      case "Espoo: OMENA":
         teatteriID = 1039;
         break;
      case "Espoo: SELLO":
         teatteriID = 1038;
         break;
      case "Helsinki":
         teatteriID = 1002;
         break;
      case "Helsinki: ITIS":
         teatteriID = 1045;
         break;
      case "Helsinki: KINOPALATSI":
         teatteriID = 1031;
         break; 
      case "Helsinki: MAXIM":
         teatteriID = 1032;
         break;
      case "Helsinki: TENNISPALATSI":
         teatteriID = 1033;
         break;
      case "Vantaa: FLAMINGO":
         teatteriID = 1013;
         break;
      case "Jyväskylä: FANTASIA":
         teatteriID = 1015;
         break;
      case "Kuopio: SCALA":
         teatteriID = 1016;
         break;
      case "Lahti: KUVAPALATSI":
         teatteriID = 1017;
         break;
      case "Lappeenranta: STRAND":
         teatteriID = 1041;
         break;     
      case "Oulu: PLAZA":
         teatteriID = 1018;
         break; 
      case "Pori: PROMENADI":
         teatteriID = 1019;
         break;
      case "Tampere":
         teatteriID = 1021;
         break; 
      case "Tampere: CINE ATLAS":
         teatteriID = 1034;
         break;    
      case "Tampere: PLEVNA":
         teatteriID = 1035;
         break; 
      case "Turku ja Raisio":
         teatteriID = 1047;
         break;
      case "Turku: KINOPALATSI":
         teatteriID = 1022;     
         break;
      case "Raisio: LUXE MYLLY":
         teatteriID = 1046;
         break; 
            default:
            teatteriID = null;
            document.getElementById("cinema").value = "";
        }      
        lataaXML();
  }
  
  
  
  function lataaXML(){
   //Muodostetaan yhteys API:n 
    let url = "https://www.finnkino.fi/xml/Schedule/?area=" + teatteriID;
   

  // luodaan uusi objecti
    let xhttp = new XMLHttpRequest();

  //Suoritetaan functio, jos pyyntö on onnistunut
    xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200) {
      //
      //document.getElementById("elokuvat").innerHTML = this.responseText;
       console.log(this.responseText);
       tulostaXML(this);
       }
    }

    xhttp.open("GET", url, true);
  //Lähetetään pyyntö
    xhttp.send();     
      
  }
//Mitä tulostetaan sivulle
  function tulostaXML(xml){
    var i;
    var xmlData = xml.responseXML;
    var x = xmlData.getElementsByTagName("Show");
    var out = "<table>";
  
    //taulukkon teko  
    for(i=0; i<x.length; i++){
      out += 
        "<tr><td ><img class='kuva' src='" + x[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'></img>" + 
        "</a></td><td class='otsikko'><a href='"+ x[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue + "' target='_blank'>"+ 
        x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +
        "</a></td><td class='paiva'>" + x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue.slice(5,10) + " " +
        x[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue.slice(11,16) +
        "<td> Kesto: "+ x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue + " min <br>" +
        x[i].getElementsByTagName("TheatreAndAuditorium")[0].childNodes[0].nodeValue +
        "</td></tr>";

    } 
    document.getElementById("elokuvat").innerHTML = out;
  }