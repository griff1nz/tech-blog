const editPost = async(e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    console.log(window.location.pathname)
    const response = await fetch(`${window.location.pathname}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to edit post');
    }
}


document.querySelector('#editpost').addEventListener('submit', editPost);