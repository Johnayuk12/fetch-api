
let text_api_button =  document.getElementById('getText');

let title = document.getElementById('title');
let description = document.getElementById('description');

let buttonSub  =document.querySelector('.button')

//  getting the output tag from the html to display on the window
let apiOutput =  document.getElementById('output');


// getting the button for fetching from the server
let newsButton =  document.getElementById('getNews');

// newsButton.addEventListener('click',getNews);

// this make the api to be fetched once the window loads
window.addEventListener('load', getNews)

// function for getting api
function getNews()
{
    fetch('http://127.0.0.1:8000/myApp/all')
    .then((res) => res.json())
    .then((data) => {
        let news_output = '';
        data.data.forEach(function(news){
          news_output+= `

        <div class="card col-md-6  mb-3 p-5 border " >
          <div class="card-body" data-id = ${news.id} >
            <h5 class="card-title title">${news.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${news.created_at}</h6>
            <p class="description">${news.description}</p>
            <a href="#" id="del"  class="card-link btn btn-danger">Delete</a>
            <a href="#" id="edit" class="card-link btn btn-primary">Edit</a>
          </div>
        </div>
       
        `;

      });
      apiOutput.innerHTML = news_output;
      
      console.log(data.links)
    })

  .catch((err) => console.log(err))  
}



apiOutput.addEventListener('click',(e) => {
// console.log(e.target.id)
e.preventDefault();
let delNewsButton = e.target.id == 'del';
let editNewsButton = e.target.id == 'edit';


    let id = e.target.parentElement.dataset.id;


  if (delNewsButton) {
    fetch(`http://127.0.0.1:8000/myApp/deletePost/${id}`,{
      method:"DELETE",
      // headers:{
      //   'Accept':'application/json, text/plain, */*',
      //   'Content-Type':'application/json,',
      // },
      })
    //  .then((res) => res.json())
     .then(()=> location.reload())
  }

  if (editNewsButton) {
    let edt = e.target.parentElement;

    let header = edt.querySelector('.title').textContent;
    let main = edt.querySelector('.description').textContent;

    // console.log(header,main)

    title.value = header;
    description.value = main;
    // console.log(a)
  }

  buttonSub.addEventListener('click',(e) => {
    e.preventDefault()
    // console.log('hey')
    fetch(`http://127.0.0.1:8000/myApp/updatePost/${id}`,{

      method:'PATCH',
      headers:{
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        title:title.value,
        description:description.value
      })
      
    })
    .then((res) => res.json())
    .then(()=> location.reload())
    .then((data) => console.log(data))
     console.log(id);

  })

});

// getting the form from the html page
let postNewsForm =  document.getElementById('addNews');

postNewsForm.addEventListener('submit', addNews)  

// function for posting to the server

function addNews(e)
{
    e.preventDefault();

   

     fetch('http://127.0.0.1:8000/myApp/createPost', {
            method:'POST',
            headers:{
              'Accept':'application/json, text/plain, */*',
              'Content-Type':'application/json',
            },
            body:JSON.stringify({
              title:title.value,
              description:description.value
            })
     })
     .then((res) => res.json())
     .then((data) => console.log(data))
}


// this a javascript method for checking for the classname or list of an html tag to work on it
  // window.onclick =function(e)
  // {
  //   if(e.target.classList.contains("del")){
  //     let item = e.target.parentNode.parentNode.childNodes[1].textContent;
      
  //     console.log(item)
  //     deleteNews(item)
  //   }

  //   if(e.target.classList.contains("edit")){
  //     let item = e.target.parentNode.parentNode.childNodes[1].textContent;
      
  //       $('#exampleModalCenter').modal('show');
      
  //     let title = document.getElementById('title').value;
  //     let description = document.getElementById('description').value;
  //     let updatedPost = {
  //       title,
  //       description
  //   }

  //     console.log(item)
  //     console.log(updatedPost);

     
  //   }

  //   if(e.target.classList.contains('editNews')){
  //     // let item = e.target.parentNode.parentNode.childNodes[1].textContent;
  //     let updatedPost = {
  //       title,
  //       description
  //   }
     
  //     console.log(item)
  //     updatePost(updatedPost)
  //   }
  // }


   



  // function fo deleting an item from the server
  // function deleteNews(item)
  // {
  //   fetch(`http://127.0.0.1:8000/myApp/deletePost/${item}`,{
  //     method:"DELETE",
  //     // headers:{
  //     //   'Accept':'application/json, text/plain, */*',
  //     //   'Content-Type':'application/json,',
  //     // },
  //     })
      
  //     .then((data) => {
  //         return data;
  //     })
  // }

   function updatePost(post){

    fetch(`http://127.0.0.1:8000/myApp/updatePost/${post}`,{
      method:'PUT',
      headers:{
        'Accept':'application/json, text/plain, */*',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(post)
      
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
     console.log(post);
     
   }