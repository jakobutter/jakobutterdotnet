document.querySelectorAll('.colorButton').forEach(button => {
    button.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        document.getElementById('text').style.color = color;
    });
});
