//#### FUNCION PARA RENDERIZAR USUARIOS ####

//Referencias
var divUsuarios = document.getElementById("divUsuarios");
var formEnviar = document.getElementById("formEnviar");
var txtMensaje = document.getElementById("txtMensaje");
var divChatBox = document.getElementById("divChatbox");
var params = new URLSearchParams(window.location.search);
var nombre = params.get("nombre");
var sala = params.get("sala");

//Renderizar usuarios
const renderizarUsuarios = (personas) => {
  var html = "";
  html += `<li>
    <a 
    href="javascript:void(0)" 
    class="active"
    > Chat de <span>${params.get("sala")}</span></a>
    </li>`;

  personas.map((persona) => {
    html += `<li>
        <a data-id='${persona.id}' href="javascript:void(0)" class="users"><img data-id='${persona.id}' src="assets/images/users/1.jpg"
        alt="user-img" class="img-circle users"> <span data-id='${persona.id}' class="users">${persona.nombre}</br><small
        class="text-success users">online</small></span></a>
        </li>`;

    divUsuarios.innerHTML = html;
  });
};

//Renderizar mensajes
const renderizarMensajes = (mensaje, yo) => {
  var html = "";
  let fecha = new Date(mensaje.fecha);
  let hora = `${fecha.getHours()} : ${fecha.getMinutes()}`;
  
  var adminClass = 'info';
  if(mensaje.nombre === 'Administrador'){
    adminClass = "danger";
  }

  if (!yo) {
    html += `
    <li>
      <div class="chat-img">
        ${mensaje.nombre !== 'Administrador' ? '<img src="assets/images/users/1.jpg" alt="user" />' : ''}
      </div>
      <div class="chat-content">
        <h5>${mensaje.nombre}</h5>
       <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
      </div>
      <div class="chat-time">${hora}</div>
    </li>
  `;
  } else {
    html += `
    <li class="reverse animated fadeIn">
      <div class="chat-content">
        <h5>${mensaje.nombre}</h5>
      <div class="box bg-light-inverse">${mensaje.mensaje}</div>
      </div>
      <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
      <div class="chat-time">${hora}</div>
    </li>
    `;
  }

  divChatBox.insertAdjacentHTML("beforeend", html);
};

//EFECTO SCROLL
const scrollBottom = () => {
  var xH = divChatBox.scrollHeight;
  divChatBox.scrollTo(0, xH);
}


//Obtener el id del usuario al clickearlo
document.body.addEventListener("click", function (event) {
  if (event.target.className == "users") {
    let id = event.target.dataset.id;
    if (id) {
      console.log(id);
    }
  }
});

//Enviar mensajes
formEnviar.addEventListener("submit", (e) => {
  e.preventDefault();

  if (txtMensaje.value.trim().length === 0) {
    return;
  } else {
    const mensaje = txtMensaje.value;
    socket.emit(
      "crearMensaje",
      {
        nombre,
        mensaje,
      },
      (mensaje) => {
        formEnviar.reset();
        txtMensaje.focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
      }
    );
  }
});
