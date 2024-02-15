const createPost = async(e) => {
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const response = await fetch('/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to create post');
    }
}


document.querySelector('#newpost').addEventListener('submit', createPost);