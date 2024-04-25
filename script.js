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
  var storyName = document.getElementById("storyName").value;

  document.getElementById("story").innerHTML= "Yoda is a Jedi "+ noun1 +" who trained Jedi for " + large_number + " years on how to use the force. He is known for his " + adjective1 + " size, " + color +" skin and " + adjective2 + " way of pronouncing words. In the movie Star Wars: A " + adjective3 + " Hope, Luke Skywalker " + verb + "s Yoda after " + verb_ing +" his " + noun2 + " into a " + noun3 + " on a " + adjective4 + " planet called " + name_place + ". Yoda helps Luke to become a Jedi " + noun4 + ". Yoda remains a " + noun5 + " to Luke, training him to use The Force to defeat Vader and the Empire.";

  var madlibs = document.getElementById("story").innerHTML;
  console.log("story: " + madlibs);  
  var storyData = {
    timestamp: Date.now(),
    story: madlibs,  
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
    storyName: storyName,
  };
  var storyJSON = JSON.stringify(storyData);
  console.log("storyJSON: " + storyJSON);
  return storyData;
}

function saveMadLib() {
  console.log("saveMadLib() called");
  var storyData = createMadLib();
  db.collection("madlib").doc(storyData.storyName).set(storyData);
  alert(storyData.storyName + "save to database!");
}

function retrieveMadLib() {
  console.log("retrieveMadLib() called");
  var storyName = prompt("Enter the name of the story you want to look up:");
  db.collection("madlib")
  .doc(storyName)
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      var storyData = doc.data();
      document.getElementById("story").innerHTML = storyData.story;
    } 
    else {
      console.log("No such document!"); 
      document.getElementById("story").innerHTML = "Story not found!";
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
    document.getElementById("story").innerHTML = "Story not found!";
  });
}

function editMadLib() {
  console.log("editMadLib() called");
  var storyName = prompt("Enter the name of the story you want to edit:");
  db.collection("madlib")
  .doc(storyName)
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      var storyData = doc.data();

      document.getElementById("adjective1").value = storyData.adjective1;
      document.getElementById("adjective2").value = storyData.adjective2;
      document.getElementById("adjective3").value = storyData.adjective3;
      document.getElementById("adjective4").value = storyData.adjective4;

      document.getElementById("noun1").value = storyData.noun1;
      document.getElementById("noun2").value = storyData.noun2;
      document.getElementById("noun3").value = storyData.noun3;
      document.getElementById("noun4").value = storyData.noun4;
      document.getElementById("noun5").value = storyData.noun5;
    
      document.getElementById("large_number").value = storyData.large_number;
      document.getElementById("verb").value = storyData.verb;
      document.getElementById("verb_ing").value = storyData.verb_ing;
      document.getElementById("color").value = storyData.color;
      document.getElementById("name_place").value = storyData.name_place;
      document.getElementById("storyName").value = storyData.storyName;

      document.getElementById("story").innerHTML = storyData.story;
    } else {
      console.log("No such document!");
      document.getElemenById("story").innerHTML = "Story not found!";
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
    document.getElementById("story").innerHTML = "Story not found!";
  });
}

function deleteMadLib() {
  console.log("deleteMadLib() called");
  var storyName = prompt("Enter the name of the story you want to delete:");
  db.collection("madlib")
  .doc(storyName)
  .get()
  .then((doc) => {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      var storyData = doc.data();
      document.getElementById("story").innerHTML = storyData.storyName + " successfully deleted!";
      db.collection("madlib").doc(storyName).delete();
    } else {
      console.log("No such document!");
      document.getElementById("story").innerHTML = "Story not found!";
    }
  })
  .catch((error) => {
    console.log("Error getting document:", error);
    document.getElementById("story").innerHTML = "Story not found!";  
  });
}