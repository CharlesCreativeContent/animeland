document.querySelectorAll(".fa-ban").forEach(element=>element.addEventListener("click",e=>{
let card = e.target.parentElement
let favsElement = e.target.parentElement.parentElement

let favsList = e.target.parentElement.parentElement.innerHTML
let favs = favsList.split(card.outerHTML).join("")
favsElement.innerHTML = favs
console.log("card: ",card)
console.log("card.outerHTML: ",card.outerHTML)
console.log("favsList: ",favsList)
console.log("favs: ",favs)
    let body = {
    "favs": favs,
    }
fetch('/updateFavs', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
}).then(data=>console.log(data)).catch(err => {
 	console.log(err);
 })
    
}))