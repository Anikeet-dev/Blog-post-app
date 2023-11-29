const blogForm = document.querySelector('#blog-form');
const inputTitle = document.querySelector('#blogTitle');
const inputAuthor = document.querySelector('#blogAuthor');
const inputContent = document.querySelector('#blogContent');
const blogsList = document.querySelector('#blogs');

blogForm.addEventListener('submit', onSubmit);

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:5000/get-blogs");
        console.log('Received Blogs:', response.data);
        displayBlogs(response.data);
    } catch (err) {
        console.error('Error fetching blogs:', err);
    }
});


async function onSubmit(e) {
    e.preventDefault();

    if (!inputTitle.value || !inputAuthor.value || !inputContent.value) {
        alert('Please enter all fields!');
    } else {
        const blogDetails = {
            blogTitle: inputTitle.value,
            blogAuthor: inputAuthor.value,
            blogContent: inputContent.value
        };

        try {
            const response = await axios.post("http://localhost:5000/createBlog", blogDetails);
            console.log('Blog post created successfully:', response.data);

            const updatedBlogsResponse = await axios.get("http://localhost:5000/get-blogs");
            console.log('Updated Blogs:', updatedBlogsResponse.data);
            displayBlogs(updatedBlogsResponse.data);

            clearInputs();
        } catch (err) {
            console.error('Error creating blog post:', err);
        }
    }
}

function displayBlogs(blogs) {
    blogsList.innerHTML = '';

    if (Array.isArray(blogs)) {
        blogs.forEach(blog => {
            const blogItem = document.createElement('li');
            
            const collapsibleButton = document.createElement('button');
            collapsibleButton.classList.add('collapsible');
            collapsibleButton.innerText = blog.blogTitle;

            

            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');
            
            const authorHeader = document.createElement('h6');
            authorHeader.innerText = 'AUTHOR: ' + blog.blogAuthor;

            const contentParagraph = document.createElement('p');
            contentParagraph.innerHTML = `<h6>CONTENT : > </h6> ${blog.blogContent}`;

            contentDiv.appendChild(authorHeader);
            contentDiv.appendChild(contentParagraph);

            blogItem.appendChild(collapsibleButton);
            blogItem.appendChild(contentDiv);

            blogsList.appendChild(blogItem);
        });
        
        addCollapsibleFunctionality();
    }
}

function addCollapsibleFunctionality() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {

        const anchorBtn = document.createElement('button');
            anchorBtn.classList.add('anchorBtn')
            anchorBtn.innerText = '+';

            coll[i].appendChild(anchorBtn);

        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
                anchorBtn.innerText = "+";
            } else {
                content.style.display = "block";
                anchorBtn.innerHTML = "-";
            }
        });
    }
}

  

function clearInputs() {
    inputTitle.value = '';
    inputAuthor.value = '';
    inputContent.value = '';
}
