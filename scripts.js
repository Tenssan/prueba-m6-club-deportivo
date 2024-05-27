$(document).ready(function () {
    $('#addSport').hide();
    $('#sportsTable').hide();
    $('#sportsTableTitle').hide();
});

function showAddSport() {
    $('#addSport').show();
    $('#sportsTable').hide();
    $('#sportsTableTitle').hide();
}

function getData() {
    $('#addSport').hide();
    $('#sportsTable').show();
    $('#sportsTableTitle').show();
    $('#cuerpo').html('');
    axios.get('/sports').then((response) => {
        const deportes = response.data;
        deportes.forEach((d, i) => {
            $('#cuerpo').append(`
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${d.name}</td>
                <td>${d.price}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick='preEdit("${d.name}", "${d.price}")' data-toggle="modal" data-target="#exampleModal">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick='eliminar("${d.name}")'>Eliminar</button>
                </td>
            </tr>
            `);
        });
    });
}

function preEdit(name, price) {
    $('#nombreModal').val(name);
    $('#precioModal').val(price);
}

function agregar() {
    const name = $('#nombre').val().trim();
    const price = $('#precio').val().trim();
    
    if (!name || !price) {
        alert('Nombre y precio son requeridos.');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('El nombre solo debe contener letras del alfabeto.');
        return;
    }

    if (name.length > 50) {
        alert('El nombre del deporte no debe exceder 50 caracteres.');
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert('El precio debe ser un número positivo.');
        return;
    }

    if (price.length > 10) {
        alert('El precio no debe exceder 10 caracteres.');
        return;
    }

    axios.get('/sports').then((response) => {
        const deportes = response.data;
        if (deportes.some(d => d.name.toLowerCase() === name.toLowerCase())) {
            alert('Ya existe un deporte con ese nombre.');
            return;
        }

        axios.post('/sports', { name, price })
            .then((response) => {
                alert(response.data);
                getData();
                $('#nombre').val('');
                $('#precio').val('');
            })
            .catch((error) => {
                alert('Error: ' + error.response.data);
            });
    });
}

function edit() {
    const name = $('#nombreModal').val().trim();
    const price = $('#precioModal').val().trim();

    if (!price) {
        alert('El precio es requerido.');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('El nombre solo debe contener letras del alfabeto.');
        return;
    }

    if (name.length > 50) {
        alert('El nombre del deporte no debe exceder 50 caracteres.');
        return;
    }

    if (isNaN(price) || price <= 0) {
        alert('El precio debe ser un número positivo.');
        return;
    }

    if (price.length > 10) {
        alert('El precio no debe exceder 10 caracteres.');
        return;
    }

    axios.put(`/sports/${name}`, { price })
        .then((response) => {
            alert(response.data);
            getData();
        })
        .catch((error) => {
            alert('Error: ' + error.response.data);
        });
    $('#exampleModal').modal('hide');
}


function eliminar(name) {
    if (!confirm('¿Estás seguro de que deseas eliminar este deporte?')) {
        return;
    }
    
    axios.delete(`/sports/${name}`)
        .then((response) => {
            alert(response.data);
            getData();
        })
        .catch((error) => {
            alert('Error: ' + error.response.data);
        });
}
