/*FORMULARIO CONTACTO*/

document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        Swal.fire({
            title: 'Gracias por tu mensaje, nos contactaremos contigo!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
        formulario.reset();
    });
    });

    /* FORMULARIO CONTACTO

    document.addEventListener('DOMContentLoaded', function () {
        var formulario = document.getElementById('formulario');
        formulario.addEventListener('submit', function (event) {
            event.preventDefault();
    
            var formData = new FormData(formulario);
            var requestData = {};
    
            for (var [key, value] of formData.entries()) {
                requestData[key] = value;
            }
    
            fetch('URL_DEL_SERVICIO_DE_CORREO', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(function (response) {
                if (response.ok) {
                    Swal.fire({
                        title: 'Gracias por tu mensaje, nos contactaremos contigo!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire({
                        title: 'Hubo un error al enviar el mensaje',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
            .catch(function (error) {
                Swal.fire({
                    title: 'Hubo un error al enviar el mensaje',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    
            formulario.reset();
        });
    });
   





/*FORMULARIO EVENTOS*/

document.addEventListener('DOMContentLoaded', function () {
    var formulario2 = document.getElementById('formulario2');
    formulario2.addEventListener('submit', function (event) {
        event.preventDefault();

        var numeroInvitadosInput = document.getElementById('nro de personas');
        var numeroInvitados = parseInt(numeroInvitadosInput.value);

        var promesaVerificacion = new Promise(function(resolve, reject) {
            if (numeroInvitados < 30) {
                resolve();
            } else {
                reject();
            }
        });

        promesaVerificacion.then(function() {
            Swal.fire({
                title: 'Gracias por tu mensaje, nos contactaremos contigo!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
            });
        }).catch(function() {
            Swal.fire({
                title: 'Gracias por tu mensaje pero no tenemos capacidad para esa cantidad de invitados :(!',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
            });
        });

        formulario2.reset();
    });
});





/* CARRITO DE COMPRAS*/

let carrito = []
window.addEventListener('load', function () {
    carrito = obtenerCarritoLocalStorage();

    mostrarCarrito();
})


const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const vaciarCarritoButton = document.querySelector('.vaciar-carrito');
const pagarAhoraButton = document.querySelector('.pagar-ahora');


botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', function () {
        const contenedorProducto = this.parentNode;
        const nombre = contenedorProducto.querySelector('p').textContent;
        const precio = contenedorProducto.querySelector('a').textContent;
        const productoEnCarrito = carrito.find((producto) => producto.nombre === nombre);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }
        guardarCarritoLocalStorage(carrito);
        mostrarCarrito();
        calcularTotal();
    })
});

function obtenerCarritoLocalStorage() {
    const carritoJSON = localStorage.getItem('carrito');
    return carritoJSON ? JSON.parse(carritoJSON) : [];
}

function guardarCarritoLocalStorage(carrito) {
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', carritoJSON);
}


function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '';

    carrito.forEach((item) => {
        const productoHTML =
            `<div>
    <p>${item.nombre} ${obtenerCantidadProducto(item)} ${item.precio}</p>
    </div>`;
        carritoContainer.innerHTML += productoHTML;
        calcularTotal();
    });
}
function obtenerCantidadProducto(item) {
    let count = 0;
    carrito.forEach((producto) => { if (producto.nombre === item.nombre) { count += producto.cantidad; } });
    if (count > 1) { return `${count}x`; } else { return '' }
}

function calcularTotal() {
    let total = 0;
    carrito.forEach((producto) => {
        const precioNumerico = parseFloat(producto.precio.replace('$', ''));
        total += precioNumerico * producto.cantidad;
    });
    const totalElement = document.getElementById('total');
    totalElement.textContent = 'Total $' + total;
}

function vaciarCarrito() {
    carrito.length = 0;
    mostrarCarrito();
    calcularTotal();
}

vaciarCarritoButton.addEventListener('click', vaciarCarrito);
pagarAhoraButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (carrito.length === 0) { Swal.fire('No hay nada para comprar en el carrito!'); } else { Swal.fire('Gracias por tu compra!'); vaciarCarrito(); }

});


/*API DE CLIMA*/

const apiKey = 'd09dba8f585873677960d0673f845c66';
const latitud = -34.9011;
const longitud = -56.1645;

document.addEventListener('DOMContentLoaded', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&lang=es&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {

            const temperaturaKelvin = data.main.temp;
            const temperaturaCelsius = temperaturaKelvin - 273.15;

            const estadoClima = data.weather[0].description;


            const temperaturaElement = document.getElementById('temperatura');
            temperaturaElement.textContent = `${temperaturaCelsius.toFixed(1)} °C`;

            const estadoClimaElement = document.getElementById('estado-clima');
            estadoClimaElement.textContent = estadoClima;
        })
        .catch(error => {
            console.log('Hubo un error:', error);
        });
})


