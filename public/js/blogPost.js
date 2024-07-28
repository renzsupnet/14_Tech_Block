const inputButton = document.getElementById('commentButton');

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

inputButton.addEventListener('click', handleClick);