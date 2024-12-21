const loadCategory = () =>{
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(res => res.json())
  .then(data => displayCategory(data.categories))
  .catch(e => console.error(e))
}

const loadVideo = (search = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
  .then(res => res.json())
  .then(data => displayVideos(data.videos))
  .catch(e => console.error(e));
}

// load category videos
function loadCategoryVideo(id){
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => {
    removeActiveClass()
    const btnColor = document.getElementById(`btn-${id}`);
    btnColor.classList.add('active');
    displayVideos(data.category);
  })
  .catch(e => console.error(e));
}


const loadDetails = async (videoId) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`);
  const data = await res.json();
  displayDetails(data.video)
}
const displayDetails = (video) =>{
  // const modalContainer = document.getElementById('modalContent');
  // modalContainer.innerHTML =`
  // <h3>asofgdhag</h3>
  // `;
  // systemOne 
  document.getElementById('showModalData').click();
  // system two 
  // document.getElementById('displayModal').showModal();
}
// active class remove
function removeActiveClass(){
  const removeClass = document.getElementsByClassName('btn-category');
  for (const reClass of removeClass) {
    reClass.classList.remove('active');
  }
}

function getTime(time){
  const hours = parseInt(time /3600);
  let remainingTime = time % 3600;
  const minute = parseInt(remainingTime /60);
  remainingTime = remainingTime % 60
  return `${hours}h ${minute}min ${remainingTime} ago`;
}


const displayCategory =(categories) =>{
  const category = document.getElementById('category-Container');
  categories.forEach( item =>{
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML =`
    <button id="btn-${item.category_id}" onclick = "loadCategoryVideo(${item.category_id})"  class="btn btn-category">${item.category}</button>
    `
    category.append(buttonContainer)
  });
}

const displayVideos = (videos) => {
  const sectionContainer = document.getElementById('videoSectionContainer');
  sectionContainer.innerHTML = '';
  if (videos.length == 0) {
    sectionContainer.classList.remove('grid');
    sectionContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-3 justify-center items-center">
      <img src="assets/Icon.png" alt="photo">
      <h3 class="text-xl font-bold text-center">No Content Here</h3>
    </div>
    `
    return;
  } else {
    sectionContainer.classList.add('grid');
  }

  videos.forEach(videoItem => {
    const div = document.createElement('div');
    div.classList = 'card card-compact';
    div.innerHTML =`
    <figure class="h-[200px] relative" >
    <img class="object-cover h-full w-full";
      src="${videoItem.thumbnail}"
      alt="Shoes" />
      ${videoItem.others.posted_date?.length == 0? '':`<span class="absolute bg-black text-white p-1 rounded-md bottom-2 right-2"> ${getTime(videoItem.others.posted_date)} </span> `};
  </figure>
  <div class=" py-3 flex gap-2">
  <div>
  <img class="object-cover h-10 w-10 rounded-full";
      src="${videoItem.authors[0].profile_picture}"
      alt="Shoes" />
  </div>
  <div>
  <h2 class="card-title"> ${videoItem.title}</h2>
  <div class=" flex items-center gap-2">
    <p>${videoItem.authors[0].profile_name}</p>
    ${videoItem.authors[0].verified == true ? '<img class="object-cover h-5 w-5 " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt=""></img>': ''}
  </div>
  <p>${videoItem.others.views}</p>

  <p> <button onclick="loadDetails('${videoItem.video_id}')" class="btn bg-green-500">Details</button></p>
  
  </div>
  </div>
  `;
  sectionContainer.append(div);
  });
}

  document.getElementById('search').addEventListener('input', (e) =>{
    loadVideo(e.target.value);
  })

loadCategory()
loadVideo()


// {
//   "category_id": "1001",
//   "video_id": "aaab",
//   "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//   "title": "Midnight Serenade",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//           "profile_name": "Noah Walker",
//           "verified": false
//       }
//   ],
//   "others": {
//       "views": "543K",
//       "posted_date": ""
//   },
//   "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }

// let challenge = "accepted"; 
// if (challenge === "accepted") {
//   console.log("Every challenge is a new opportunity");
// } else {
//   console.log("Do not be afraid, progress begins with courage!");
// }




// {
//   "category_id": "1001",
//   "video_id": "aaaa",
//   "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//   "title": "Shape of You",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//       }
//   ],
//   "others": {
//       "views": "100K",
//       "posted_date": "16278"
//   },
//   "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }