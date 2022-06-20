let button = document.querySelector('button')
let list = document.querySelector('ul')
let search =document.querySelector("[type='search']")

//For Search query that decided not to use//

//===========Fetch used to fill database===========//
 button.addEventListener('click',getMangaData)
 search.addEventListener('keypress',event=>{
    if (event.key === "Enter") getMangaData()
 })

function getMangaData (e){

   list.innerHTML = ''
   fetch("https://api.jikan.moe/v4/manga?q="+search.value.replace(/[ ]/g,'%20'))
 .then(response => response.json()).then(data=>{
   console.log(data)
   data.data.forEach(x=>{
     let listItem = document.createElement('li')
     listItem.style.backgroundImage = `url(${Object.values(x.images)[0].image_url})`
     listItem.className = `card`
     let link = document.createElement('a')
     link.target = '_blank'
     link.href = x.url
     let title = document.createElement('h2')
     let titleContent = document.createTextNode(x.title)
     title.appendChild(titleContent)
     link.appendChild(title)
     listItem.appendChild(link)
     let star = document.createElement('i')
     star.className = "fas fa-star"
     //========Listener to add Collection Items=======//
     // star.addEventListener('click', addMangaToCollection)
     star.addEventListener('click', addToFavs,{once:true})
     listItem.appendChild(star)
     let synopsis =document.createElement('p')
     let synText = document.createTextNode(x.synopsis)
     synopsis.appendChild(synText)
     listItem.appendChild(synopsis)
     list.appendChild(listItem)
   })
 })
 .catch(err => {
 	console.log(err);
 });
 
}

//function I use to strip API data//
 function addMangaToCollection(e){
   let name = e.target.parentElement.children[0].children[0].innerHTML
   let listItem = e.target.parentElement.innerHTML
     fetch('/collectManga', {
       method: 'put',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         'name': name,
         'listItem': listItem,
       })
     })
    e.target.color = "aqua"
 }

function addToFavs (e){
let child = e.target.parentElement
let parent = e.target.parentElement.parentElement

let prefix = child.outerHTML.split("Add to").join("Remove from")

console.log("working")
  fetch('/collectFavs', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'favs': `${prefix.split("fa-star").join("fa-ban")}`,
    })
  })
    e.target.style.color = "aqua"
}

document.querySelectorAll("li i").forEach(element=>element.addEventListener("click",addToFavs,{once:true}))
