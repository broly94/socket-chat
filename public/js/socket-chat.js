var socket = io();
// Se obtiene los parametros de la url y se guarda en una variable
var params = new URLSearchParams(window.location.search);
//Validamos que venga el parametro nombre en la url
if(!params.has('nombre') || !params.has('sala')) {
    if(nombre === '' || sala === ''){
        window.location = 'index.html';
        throw new Error('El nombre y la sala son necesarios')
    }
}
//Guardamos el nombre que viene como valor en la url
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}
//Cuando se conecta un usuario
socket.on('connect', () => {
    console.log('Conectado al servidor');
    //Emite un mensaje y le manda al servidor el nombre obtenido por url
    //Espera una res del servidor como un callback que es la informacion que devuelve el servidor
    socket.emit("entrarChat", usuario, (res) => {
        console.log('Usuarios conectados', res)
    })
});

// Cuando se desconecta se envia por consola desde el cliente que se desconecto
socket.on('disconnect',() => {
    console.log('Perdimos conexión con el servidor');
});

// Cuando se desconecta del servidor emite un mensaje desde el cliente
socket.on("crearMensaje", respuesta => {
  console.log(respuesta);
});

//Escuchar cambios de usuarios
//Cuando un usuario entra o sale del chat
socket.on('listaPersonas', (personas) => {
    console.log(personas);
})

//Mensaje privado mediante id de cada usuario
socket.on('mensajePrivado', mensaje => {
    console.log(mensaje);
})

