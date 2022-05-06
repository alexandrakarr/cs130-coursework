/*
    Hints: 
    1. Attach click event handlers to all four of the 
       buttons (#default, #ocean, #desert, and #high-contrast).
    2. Modify the className property of the body tag 
       based on the button that was clicked.
*/

const setDefault = () => {
   console.log("Setting theme to default")
   document.querySelector("body").className = " ";
}
const setDesert = () => {
   console.log("Setting theme to desert")
   document.querySelector("body").className = "desert";

}
const setOcean = () => {
   console.log("Setting theme to ocean")
   document.querySelector("body").className = "ocean";

}
const setHighContrast = () => {
   console.log("Setting theme to high contrast")
   document.querySelector("body").className = "high-contrast";
}

document.querySelector("#default").addEventListener("click", setDefault)
document.querySelector("#desert").addEventListener("click", setDesert)
document.querySelector("#ocean").addEventListener("click", setOcean)
document.querySelector("#high-contrast").addEventListener("click", setHighContrast)