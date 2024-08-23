document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('close-modal');
    const viewButtons = document.querySelectorAll('.view-member');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const member = this.closest('.bg-white');
            modalName.textContent = member.querySelector('h2').textContent;
            modalDescription.textContent = member.querySelector('p').textContent;
            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
});