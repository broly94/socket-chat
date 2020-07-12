document.addEventListener('DOMContentLoaded', () => {
    const nombre = document.getElementById("nombre");
    const sala = document.getElementById("sala");
    document.getElementById("submit").addEventListener("click", (e) => {
      e.preventDefault();
      if(nombre.value === '' || sala.value === '') {
          alert('El nombre y la sala son necesarios');
          window.localtion = 'index.html'
      } else {
        window.location = `chat.html?nombre=${nombre.value}&sala=${sala.value}`
      }
    });
})
