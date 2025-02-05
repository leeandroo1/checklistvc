// URL del script de Google Apps Script
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxub8jnT4eMDYQnzzDmfNpneQuopU3VrG7Wdk3DjEu7nvaBSZL1kXI3PBqI7VWtT4YR/exec';

// Captura el parámetro id_sala de la URL
const urlParams = new URLSearchParams(window.location.search);
const idSala = urlParams.get('id_sala');

// Elemento donde se mostrará la información
const salaInfo = document.getElementById('sala-info');

if (idSala) {
    // Carga la información de la sala desde Google Sheets
    fetch(`${scriptUrl}?id_sala=${idSala}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                salaInfo.innerHTML = `<p>${data.error}</p>`;
            } else {
                // Muestra la información de la sala
                salaInfo.innerHTML = `
                    <h2>Información de la Sala ${data[1]}</h2>
                    <p><strong>Fecha de Revisión:</strong> ${data[2]}</p>
                    <p><strong>Responsable:</strong> ${data[3]}</p>
                    <p><strong>Estado de Conectividad:</strong> ${data[5]}</p>
                    <p><strong>Estado de Conectividad Tablet:</strong> ${data[6]}</p>
                    <p><strong>Observaciones:</strong> ${data[12]}</p>
                `;
            }
        })
        .catch(error => {
            salaInfo.innerHTML = '<p>Error al cargar la información. Inténtelo de nuevo más tarde.</p>';
            console.error(error);
        });
} else {
    salaInfo.innerHTML = '<p>Error: No se proporcionó un ID de sala.</p>';
}