const inputButton = document.getElementById('commentButton');

// Only render delete button if the logged in user is actual commenter
const renderDelButton = async () => {
  const deleteButton = document.querySelectorAll('.col-3 button');
  const response = await fetch('/user');
  const user = await response.json();

  deleteButton.forEach( async button => {
    if ( button.getAttribute('data-id') ){
      
        console.log(user.user_id, button.getAttribute('data-id'));
        if(user.user_id == button.getAttribute('data-id')){
          button.style.display = 'grid';
          button.addEventListener('click', delButtonHandler);
        }

    }
  });
}

// Creating a comment after clicking the button
const handleClick = async () => {
    event.preventDefault();
    const text = document.getElementById('commentInput').value.trim();
    const blogPost_id = inputButton.getAttribute('data-id');
    if(text){
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text, blogPost_id }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            // If successful, alert the user
            document.location.reload();
          } else {
            alert(response.statusText);
          }
    }
}

// Deleting a comment
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id2')) {
    const id = event.target.getAttribute('data-id2');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete Comment!');
    }
  }
};





inputButton.addEventListener('click', handleClick);
window.addEventListener('load', renderDelButton);