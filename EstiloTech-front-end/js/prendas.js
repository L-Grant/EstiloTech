function obtenerMarcaPorId(marca_id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/marcas?id=' + marca_id, true);

    xhr.onload = function () {
        if (this.status === 200) {
            const marca = JSON.parse(this.responseText);
            callback(marca.nombre);  
        } else {
            console.error('Error al obtener la marca:', this.statusText);
            callback('Marca desconocida');
        }
    };

    xhr.onerror = function () {
        console.error('Error al obtener la marca:', this.statusText);
        callback('Marca desconocida');
    };

    xhr.send();
}

function obtenerTodasLasPrendas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/prendas', true);

    xhr.onload = function () {
        if (this.status === 200) {

            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();
            try {
                const prendas = JSON.parse(cleanedText);

                document.querySelector('#prenda-table tbody').innerHTML = '';

                prendas.forEach(prenda => {
                    obtenerMarcaPorId(prenda.marca_id, function(marcaNombre) {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${prenda.nombre}</td>
                            <td>${prenda.talla}</td>
                            <td>${prenda.color}</td>
                            <td>$${prenda.precio}</td>
                            <td>${marcaNombre}</td>
                            <td>${prenda.stock}</td>
                            <td>
                                <button onclick="mostrarFormActualizarPrenda(${prenda.prenda_id}, '${prenda.nombre}', '${prenda.talla}', '${prenda.color}', ${prenda.precio}, ${prenda.stock}, ${prenda.marca_id})">Actualizar</button>
                                <button onclick="eliminarPrenda(${prenda.prenda_id})">Eliminar</button>
                            </td>
                        `;
                        document.querySelector('#prenda-table tbody').appendChild(tr);
                    });
                });
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Error al obtener las prendas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error al obtener las prendas:', this.statusText);
    };

    xhr.send();
}

function guardarPrenda(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL + '/prendas', true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            obtenerTodasLasPrendas();
        } else {
            console.error('Error al guardar el libro:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para agregar la prenda');
    };

    xhr.send(JSON.stringify(data));
}

function cargarMarcas(selectedMarcaId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/marcas', true);

    xhr.onload = function () {
        if (this.status === 200) {
            const marcas = JSON.parse(this.responseText);
            const select = document.getElementById('id_marca');
            marcas.forEach(marca => {
                const option = document.createElement('option');
                option.value = marca.marca_id;
                option.textContent = marca.nombre;
                if (marca.marca_id === selectedMarcaId) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        } else {
            console.error('Error al obtener las marcas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener las marcas');
    };

    xhr.send();
}


function cargarMarcasUpdate(selectedMarcaId, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/marcas', true);

    xhr.onload = function () {
        if (this.status === 200) {
            const marcas = JSON.parse(this.responseText);
            const select = document.getElementById('update-id_marca');
            
            select.innerHTML = ''; 

            marcas.forEach(marca => {
                const option = document.createElement('option');
                option.value = marca.marca_id;
                option.textContent = marca.nombre;

                if (marca.marca_id === selectedMarcaId) {
                    option.selected = true;
                }

                select.appendChild(option);
            });

            callback();
        } else {
            console.error('Error al obtener las marcas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener las marcas');
    };

    xhr.send();
}


function actualizarPrenda(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', API_URL + '/prendas?id=' + data.id_prenda, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Prenda actualizada exitosamente');
            obtenerTodasLasPrendas();
        } else {
            console.error('Error al actualizar la prenda:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Error en la solicitud');
    };
    xhr.send(JSON.stringify(data));
}


function eliminarPrenda(prenda_id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_URL + '/prendas?id=' + prenda_id, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Prenda eliminada exitosamente');
            obtenerTodasLasPrendas();
        } else {
            console.error('Error al eliminar el prenda:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Error en la solicitud');
    };
    xhr.send();
}

function mostrarFormActualizarPrenda(prenda_id, nombre, talla, color, precio, stock, marca_id) {
    const formCrearPrenda = document.getElementById('agregar-prenda-form');
    if (formCrearPrenda) {
        formCrearPrenda.style.display = 'none'; 
    }

    cargarMarcasUpdate(marca_id, function() {

        const form = document.getElementById('update-prenda-form');
        
        form.querySelector('#update-id_prenda').value = prenda_id;
        form.querySelector('#update-nombre').value = nombre;
        form.querySelector('#update-talla').value = talla;
        form.querySelector('#update-color').value = color;
        form.querySelector('#update-precio').value = precio;
        form.querySelector('#update-cantidad_stock').value = stock;
        
        form.style.display = 'block';
    });
}


// Función para cargar todas las marcas
function obtenerTodasLasMarcas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/marcas', true);

    xhr.onload = function () {
        if (this.status === 200) {

            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim(); 
            try {
                const marcas = JSON.parse(cleanedText);

                const tbody = document.querySelector('#marcas-table tbody');
                tbody.innerHTML = '';

                marcas.forEach(marca => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${marca.nombre}</td>
                        <td>${marca.descripcion}</td>
                        <td>
                            <button onclick="mostrarFormActualizarMarca(${marca.marca_id}, '${marca.nombre}', '${marca.descripcion}')">Actualizar</button>
                            <button onclick="eliminarMarca(${marca.marca_id})">Eliminar</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Error al obtener las marcas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener las marcas:', this.statusText);
    };

    xhr.send();
}

function guardarMarca(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL + '/marcas', true); 

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            obtenerTodasLasMarcas(); 
        } else {
            console.error('Error al guardar la marca:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para agregar la marca'); 
    };

    xhr.send(JSON.stringify(data));
}

function actualizarMarca(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', API_URL + '/marcas?id=' + data.id_marca, true);  

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('Marca actualizada exitosamente');
            obtenerTodasLasMarcas();
        } else {
            console.error('Error al actualizar la marca:', xhr.statusText);  
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para actualizar la marca'); 
    };

    xhr.send(JSON.stringify(data));
}


// Mostrar formulario para actualizar una marca
function mostrarFormActualizarMarca(marca_id, nombre, descripcion) {
    const formCrearMarca = document.getElementById('agregar-marca-form');
    if (formCrearMarca) {
        formCrearMarca.style.display = 'none'; 
    }

    const form = document.getElementById('update-marca-form');
    form.querySelector('#update-id_marca').value = marca_id;
    form.querySelector('#update-nombre').value = nombre;
    form.querySelector('#update-descripcion').value = descripcion;
    form.style.display = 'block';
}

// Eliminar marca
function eliminarMarca(marca_id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_URL + '/marcas?id=' + marca_id, true);

    xhr.onload = function () {
        if (this.status === 200) {
            console.log('Marca eliminada');
            obtenerTodasLasMarcas();
        } else {
            console.error('Error al eliminar la marca:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para eliminar la marca');
    };

    xhr.send();
}

// Ventas
function obtenerTodasLasVentas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/ventas', true); 

    xhr.onload = function () {
        if (this.status === 200) {
            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();  
            try {
                const ventas = JSON.parse(cleanedText);

                const tbody = document.querySelector('#ventas-table tbody'); 
                tbody.innerHTML = '';  

                ventas.forEach(venta => {
                    obtenerClientePorId(venta.cliente_id, function(clienteNombre) {
                        obtenerPrendaPorId(venta.prenda_id, function(prendaNombre) {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `
                                <td>${venta.venta_id}</td>
                                <td>${venta.fecha_venta}</td>
                                <td>${clienteNombre}</td>
                                <td>${prendaNombre}</td>
                                <td>${venta.cantidad}</td>
                                <td>$${venta.subtotal}</td>
                                <td>
                                    <button onclick="eliminarVenta(${venta.venta_id})">Eliminar</button>
                                </td>
                            `;
                            tbody.appendChild(tr);
                        });
                    });
                });
            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Error al obtener las ventas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener las ventas:', this.statusText);
    };

    xhr.send();
}

function obtenerClientePorId(cliente_id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/clientes?id=' + cliente_id, true); 

    xhr.onload = function () {
        if (xhr.status === 200) {
            const cliente = JSON.parse(xhr.responseText);
            callback(cliente.nombre + ' ' + cliente.apellido_1 + ' ' + cliente.apellido_2); 
        } else {
            console.error('Error al obtener cliente:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener cliente:', xhr.statusText);
    };

    xhr.send();
}

function obtenerPrendaPorId(prenda_id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/prendas?id=' + prenda_id, true);  

    xhr.onload = function () {
        if (xhr.status === 200) {
            const prenda = JSON.parse(xhr.responseText);
            callback(prenda.nombre);  
        } else {
            console.error('Error al obtener prenda:', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener prenda:', xhr.statusText);
    };

    xhr.send();
}



// Eliminar venta
function eliminarVenta(venta_id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', API_URL + '/ventas?id=' + venta_id, true);

    xhr.onload = function () {
        if (this.status === 200) {
            console.log('Venta eliminada');
            obtenerTodasLasVentas();
        } else {
            console.error('Error al eliminar la venta:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para eliminar la venta');
    };

    xhr.send();
}