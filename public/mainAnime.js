let button = document.querySelector('button')
let list = document.querySelector('ul')
let search =document.querySelector("[type='search']")
let proxy = "https://cors-anywhere.herokuapp.com/"

//===========Fetch used to fill database===========//
 button.addEventListener('click',getAnimeData)
 search.addEventListener('keypress',event=>{
    if (event.key === "Enter") getAnimeData()
 })

function getAnimeData (e){
    
    if(search.value !==""){
    list.innerHTML = ''
   fetch("https://api.jikan.moe/v4/anime?q="+search.value.replace(/[ ]/g,'%20'))
 .then(response => response.json()).then(data=>{
   console.log(data)
   data.data.forEach(x=>{
     //========Listener to add Collection Items=======//
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
     let filmLink = document.createElement('a')
     filmLink.target = '_blank'
     filmLink.href = "https://www.wcostream.com/"+ x.title.replace(/[ ,':_]+/g,'-')
     let filmIcon = document.createElement('i')
     filmIcon.className = "fas fa-video"
     filmIcon.title="Watch Now!" 
     filmLink.appendChild(filmIcon)
     listItem.appendChild(filmLink)
     let star = document.createElement('i')
     star.className = "fas fa-star"
     star.title="Add to MyFavs!" 
     star.addEventListener('click', addToFavs)
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
 })
 search.value = ""
}
    
}

//function I use to strip API data//
 let addVideoToCollection=e=>{
   let name = e.target.parentElement.children[0].children[0].innerHTML
   let listItem = e.target.parentElement.innerHTML

     fetch('/collectAnime', {
       method: 'put',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         'name': name,
         'listItem': listItem,
       })
     })
 }
 
 
let addToFavs = e=>{
let child = e.target.parentElement
let parent = e.target.parentElement.parentElement

let prefix = child.outerHTML.split("Add to").join("Remove from")
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


document.querySelectorAll('.fa-star').forEach(x=>{
   x.title="Add to MyFavs!" 
   let name = x.parentElement.children[0].children[0].innerHTML
   let uriSafeName = name.replace(/[ ,':_]+/g,'-')
    x.addEventListener('click',addToFavs)
    x.insertAdjacentHTML("beforebegin",`<a title="Watch Now!" class="fas fa-video" target="_blank" href="https://www.wcostream.com/${uriSafeName}"></a>`)
})