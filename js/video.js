const loadCategory = () =>{
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then(res => res.json())
  .then(data => displayCategory(data.categories))
  .catch(e => console.error(e))
}

const loadVideo = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(res => res.json())
  .then(data => displayVideos(data.videos))
  .catch(e => console.error(e));
}

// load category videos
function loadCategoryVideo(id){

  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => displayVideos(data.category))
  .catch(e => console.error(e));
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
    <button onclick = "loadCategoryVideo(${item.category_id})"  class="btn">${item.category}</button>
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
  </div>
  </div>
  `;
  sectionContainer.append(div);
  });
}

loadCategory()
loadVideo()





// let challenge = "accepted"; 
// if (challenge === "accepted") {
//   console.log("Every challenge is a new opportunity");
// } else {
//   console.log("Do not be afraid, progress begins with courage!");
// }






// {
//   "category_id": "1001",
//   "video_id": "aaad",
//   "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//   "title": "Smells Like Teen Spirit",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//           "profile_name": "Oliver Harris",
//           "verified": true
//       }
//   ],
//   "others": {
//       "views": "5.4K",
//       "posted_date": "1672656000"
//   },
//   "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }