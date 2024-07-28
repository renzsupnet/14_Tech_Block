const inputButton = document.getElementById('commentButton');

const handleClick = async () => {
    event.preventDefault();
    const text = document.getElementById('commentInput').value.trim();
    
    if(text){
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ text }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            // If successful, alert the user
            alert('Added comment successfully!');
            document.location.reload();
          } else {
            alert(response.statusText);
          }
    }
}

inputButton.addEventListener('click', handleClick);