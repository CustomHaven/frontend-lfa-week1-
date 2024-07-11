require('dotenv').config()
const fruitForm = document.querySelector("#inputSection form")
const fruitList = document.querySelector("#fruitSection ul")
const fruitNutrition = document.querySelector("#nutritionSection p")

// process.env.API = https://pixabay.com/api/?key=API


fruitForm.addEventListener("submit", extractFruit)

fruitList.addEventListener("click", (e) => {
  for (let i = 0; i <= lis.length; i++) {
    if (e.target === lis[i].lastChild || e.target === lis[i].firstChild || e.target === lis[i]) {
      lis[i].remove()
    }
  }
})


function extractFruit(e) {
  e.preventDefault()
  fetchFruitData(e.target[0].value)
  e.target[0].value = ""
}


async function fetchFruitData(fruit) {
  try {
    const response = await fetch(`${process.env.API}&q=${fruit}+fruit&image_type=photo`)
    if (response.ok) {
      const data = await response.json()
      const hitsData = data.hits[0]
      const img = hitsData["previewURL"]
      addFruit(hitsData, fruit, img)
    } else {
      throw "Error: http status code = " + response.status
    }
   } catch (err) {
    console.log(err)
  }
}

const lis = []

let totalLikes = 0 

function addFruit(fruit, fruitName, fruitImg) {
  const li = document.createElement("li")
  const img = document.createElement("img")
  const p = document.createElement("p")
  img.src = fruitImg
  p.textContent = fruitName + " likes " + fruit["likes"]
  fruitList.appendChild(li)
  console.log(fruitName)
  li.appendChild(p)
  li.appendChild(img)
  lis.push(li)

  totalLikes += fruit["likes"]
  fruitNutrition.textContent = "Total Likes: " + totalLikes
}



