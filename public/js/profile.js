const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#tip-name').value.trim();
    const description = document.querySelector('#tip-desc').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/tips`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create tip');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/tip/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete tip');
      }
    }
  };
  
  document
    .querySelector('.new-tip-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.tip-list')
    .addEventListener('click', delButtonHandler);
  