// setup firebase app and firestore database
const firebaseConfig = {
       apiKey: "AIzaSyBPiVe3iSofGMP6MEty3dlv10MO1bKFGsU",
       authDomain: "madlibs-a107e.firebaseapp.com",
       projectId: "madlibs-a107e",
       storageBucket: "madlibs-a107e.appspot.com",
       messagingSenderId: "294362686214",
       appId: "1:294362686214:web:38ff691b110e9792fdf487"};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log("firebase setup complete!");

var storyName = document.getElementById("storyName").value;

function createMadLib() {
  var adjective1 = document.getElementById("adjective1").value;
  var adjective2 = document.getElementById("adjective2").value;
  var adjective3 = document.getElementById("adjective3").value;
  var adjective4 = document.getElementById("adjective4").value;
  var noun1 = document.getElementById("noun1").value;
  var noun2 = document.getElementById("noun2").value;
  var noun3 = document.getElementById("noun3").value;
  var noun4 = document.getElementById("noun4").value;
  var noun5 = document.getElementById("noun5").value;
  var large_number = document.getElementById("large_number").value;
  var verb = document.getElementById("verb").value;
  var verb_ing = document.getElementById("verb_ing").value;
  var color = document.getElementById("color").value;
  var name_place = document.getElementById("name_place").value;

  document.getElementById("madlib").innerHTML= "Yoda is a Jedi "+ noun1 +" who trained Jedi for " + large_number + " years on how to use the force. He is known for his " + adjective1 + " size, " + color +" skin and " + adjective2 + " way of pronouncing words. In the movie Star Wars: A " + adjective3 + " Hope, Luke Skywalker " + verb + "s Yoda after " + verb_ing +" his " + noun2 + " into a " + noun3 + " on a " + adjective4 + " planet called " + name_place + ". Yoda helps Luke to become a Jedi " + noun4 + ". Yoda remains a " + noun5 + " to Luke, training him to use The Force to defeat Vader and the Empire.";

  var madlib = document.getElementById("madlib").innerHTML;
  console.log("story: " + madlib);  
  var storyData = {
    timestamp: Date.now(),
    story: madlib,
    adjective1: adjective1,
    adjective2: adjective2,
    adjective3: adjective3,
    adjective4: adjective4,
    noun1: noun1,
    noun2: noun2,
    noun3: noun3,  
    noun4: noun4,
    noun5: noun5,
    large_number: large_number,
    verb: verb,
    verb_ing: verb_ing,
    color: color,
    name_place: name_place,
  };
  var storyJSON = JSON.stringify(storyData);
  console.log("storyJSON: " + storyJSON);
  return storyData;
}



function saveMadLib() {
  console.log ("saveMadLib called");
  var storyData = createMadLib();
  db.collection("madlib").doc(storyData.storyName).set(storyData);
  alert(storyData.storyName + "save to database!");}

