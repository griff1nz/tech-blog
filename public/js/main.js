const commentHandler = () => {
    document.querySelector('#comment-add').style.display = 'none';
    document.querySelector('#comment').style.display = 'inline';
    document.querySelector('#cancel').style.display = 'inline';
}
const addComment = async(e) => {
    e.preventDefault();
    const content = document.querySelector('#comment-field').value;
    const response = await fetch(`${window.location.pathname}/comments`, {
        method: 'POST', 
        body: JSON.stringify({ content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        location.reload();
    }
    else {
        alert('Failed to post comment');
    }
}
document.querySelector('#comment-add').addEventListener('click', commentHandler);
document.querySelector('#comment').addEventListener('submit', addComment);

document.querySelector('#cancel').addEventListener('click', function() {
    document.querySelector('#comment').style.display = 'none';
    document.querySelector('#comment-add').style.display = 'inline';
    document.querySelector('#cancel').style.display = 'none';
})