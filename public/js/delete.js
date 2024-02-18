const deletePost = async(e) => {
    e.preventDefault();
    const response = await fetch(`${window.location.pathname}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to delete post');
    }
}


document.querySelector('#yes').addEventListener('click', deletePost);