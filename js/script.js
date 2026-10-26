


if ('serviceWorker' in navigator) {
  if (location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('service-worker.js')
        .then(function (reg) {
          console.log('[SW] Registrado con éxito:', reg.scope);
        })
        .catch(function (err) {
          console.warn('[SW] Error al registrar:', err);
        });
    });
  } else {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
      console.log('[SW] Modo local: service worker desactivado y caché limpia.');
    });
    if (window.caches) {
      caches.keys().then(function (keys) {
        keys.forEach(function (k) { caches.delete(k); });
      });
    }
  }
}




// --------------------------- splash -------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const splash = document.getElementById('splash');
  const sobre = document.querySelector('.splash__sobre');

  if (sobre && splash) {
    sobre.addEventListener('click', function () {
      splash.classList.add('oculto');
      splash.addEventListener('transitionend', function () {
        splash.style.display = 'none';
      });
    });
  }
});
// ----------------- musica --------------------

// Selección de elementos usando solo guiones bajos en las variables por consistencia
const audio_elemento = document.getElementById('audio_elemento');
const btn_play = document.getElementById('btn_play');
const icono_play = document.getElementById('icono_play');
const icono_pause = document.getElementById('icono_pause');
const barra_progreso = document.getElementById('barra_progreso');
const btn_anterior = document.getElementById('btn_anterior');
const btn_siguiente = document.getElementById('btn_siguiente');
const titulo_estado = document.getElementById('titulo_estado');

// Guardamos el texto original para mantenerlo fijo
const texto_titulo_original = "Toca play para reproducir la canción";
let esta_reproduciendo = false;

// Función para alternar Play / Pause
function alternar_reproduccion() {
    if (esta_reproduciendo) {
        pausar_musica();
    } else {
        reproducir_musica();
    }
}

function reproducir_musica() {
    esta_reproduciendo = true;
    audio_elemento.play();

    // Cambiar iconos
    icono_play.style.display = 'none';
    icono_pause.style.display = 'block';

    // Clase para ajustar estilos CSS si es necesario
    btn_play.classList.add('reproduciendo');
    // NO se modifica el titulo_estado.innerText aquí.
}

function pausar_musica() {
    esta_reproduciendo = false;
    audio_elemento.pause();

    // Cambiar iconos
    icono_play.style.display = 'block';
    icono_pause.style.display = 'none';

    btn_play.classList.remove('reproduciendo');
    // NO se modifica el titulo_estado.innerText aquí.
}

// Actualizar la barra de progreso mientras suena
audio_elemento.addEventListener('timeupdate', (e) => {
    const { duration, currentTime } = e.target;
    if (duration) {
        const porcentaje_progreso = (currentTime / duration) * 100;
        barra_progreso.value = porcentaje_progreso;

        // Actualizar visualmente el "relleno" de la barra antes del thumb
        const valor = barra_progreso.value;
        barra_progreso.style.background = `linear-gradient(to right, #ffffff ${valor}%, #4d4d4d ${valor}%)`;
    }
});

// Permitir arrastrar la barra para cambiar el tiempo
barra_progreso.addEventListener('input', (e) => {
    const duration = audio_elemento.duration;
    if (duration) {
        audio_elemento.currentTime = (e.target.value * duration) / 100;
    }
});

// Botones de Adelantar y Retroceder (Simulación de 10 segundos)
btn_siguiente.addEventListener('click', () => {
    audio_elemento.currentTime += 10;
});

btn_anterior.addEventListener('click', () => {
    audio_elemento.currentTime -= 10;
});

// Event listener principal del botón Play
btn_play.addEventListener('click', alternar_reproduccion);

// Cuando termina la canción
audio_elemento.addEventListener('ended', () => {
    pausar_musica();
    // Aseguramos que se mantenga el texto original en caso de que un error lo haya modificado
    titulo_estado.innerText = texto_titulo_original;
    barra_progreso.value = 0;
    barra_progreso.style.background = '#4d4d4d';
});

// Manejo de errores si no existe el archivo
audio_elemento.addEventListener('error', () => {
    // El título solo cambia en caso de error, el único cambio de texto permitido
    titulo_estado.innerText = "Error: assets/musica.mp3 no encontrado";
    titulo_estado.style.color = "#ff5555";
});


// ----------------------- temporizador ---------------------------------
// Configura aquí la fecha objetivo usando el formato de texto en inglés
// Ejemplo: "Month Day, Year HH:MM:SS" -> "July 1, 2026 22:00:00"
const fecha_objetivo = new Date("november 1, 2026 12:30:00").getTime();

const actualizar_temporizador = () => {
    const ahora = new Date().getTime();
    const diferencia = fecha_objetivo - ahora;

    if (diferencia < 0) {
        // Si la fecha ya pasó
        document.getElementById("dias").innerText = "00";
        document.getElementById("horas").innerText = "00";
        document.getElementById("minutos").innerText = "00";
        return;
    }

    // Cálculos matemáticos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    // const segundos = Math.floor((diferencia % (1000 * 60)) / 1000); // Si agregas segundos

    // Actualizar DOM con ceros a la izquierda
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
};

// Ejecutar inmediatamente y luego cada 1 segundo
actualizar_temporizador();
setInterval(actualizar_temporizador, 1000);




// ------------------- fotos ----------------------

var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 4,
        depth: 3,
        modifier: 50,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 2000, // Time between slides in milliseconds (e.g., 3 seconds)
        disableOnInteraction: false, // Set to true to stop autoplay on user interaction (e.g., dragging)
    },
    loop: true, // Enable infinite loop
});

// Inicializar AOS (Animate On Scroll)
AOS.init();


// ------------------- Playlist WhatsApp -------------------

const NUMERO_WHATSAPP = '543865532093';

const btn_enviar = document.querySelector('.playlist .contenedor__button');
const inputs_playlist = document.querySelectorAll('.playlist .input__item');

if (btn_enviar && inputs_playlist.length >= 2) {
    btn_enviar.addEventListener('click', () => {
        const nombre = inputs_playlist[0].value;
        const cancion = inputs_playlist[1].value;

        if (nombre.trim() === "" || cancion.trim() === "") {
            alert("Por favor, completa tu nombre y la canción.");
            return;
        }

        const mensaje = `Hola! mi nombre es ${nombre} y mi tema recomendado es ${cancion}`;
        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, '_blank');

        inputs_playlist[0].value = "";
        inputs_playlist[1].value = "";
    });
}

// ------------------- Regalos -------------------

const botones_copiar = document.querySelectorAll('.regalos .datos__button');

botones_copiar.forEach(boton => {
    boton.addEventListener('click', () => {
        const contenedor = boton.closest('.datos__cuenta');
        const datos_banco = contenedor ? contenedor.querySelector('.datos__banco') : null;

        if (datos_banco) {
            const texto = datos_banco.innerText;
            navigator.clipboard.writeText(texto).then(() => {
                const texto_original = boton.innerText;
                boton.innerText = "Copiado";
                setTimeout(() => {
                    boton.innerText = texto_original;
                }, 1500);
            }).catch(err => {
                console.error("Error al copiar: ", err);
            });
        }
    });
});


// ------------------ confirmacion --------------------------


// Números de confirmación (Independientes de la playlist)
const NUMERO_CONFIRMACION_TIZIANA = '543865532093';
const NUMERO_CONFIRMACION_TIZIANA2 = '543813598998';

// Variables para almacenar el estado de selección
let seleccionActual = null;

// Referencias a elementos
const siAsistireBtn = document.getElementById('siAsistire');
const noAsistireBtn = document.getElementById('noAsistire');
const nombreInput = document.querySelector('.confirmacion__inputs .confirmacion__input');
const mensajeInput = document.querySelector('.confirmacion__mensaje');
const confirmarBtn = document.getElementById('btnConfirmarAsistencia');
const confirmarBtn2 = document.getElementById('btnConfirmarAsistencia2');

// Función para manejar la selección de asistencia
function manejarSeleccion(seleccion) {
    // Remover clase activa de ambos botones
    siAsistireBtn.classList.remove('active');
    noAsistireBtn.classList.remove('active');

    // Aplicar clase activa al botón seleccionado
    if (seleccion === 'si') {
        siAsistireBtn.classList.add('active');
        seleccionActual = 'si';
    } else if (seleccion === 'no') {
        noAsistireBtn.classList.add('active');
        seleccionActual = 'no';
    }
}

// Event listeners para los botones de asistencia
siAsistireBtn.addEventListener('click', () => {
    manejarSeleccion('si');
});

noAsistireBtn.addEventListener('click', () => {
    manejarSeleccion('no');
});

// Función reutilizable para enviar la confirmación
function enviarConfirmacion(numeroDestino) {
    // Validar que se haya seleccionado una opción y se haya ingresado un nombre
    if (!seleccionActual) {
        alert('Por favor, selecciona si asistirás o no.');
        return;
    }

    const nombre = nombreInput.value.trim();
    if (!nombre) {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    // Mensaje opcional
    const mensajeOpcional = mensajeInput ? mensajeInput.value.trim() : '';

    // Determinar texto según selección
    const asistenciaTexto = seleccionActual === 'si' ? 'si asistiré' : 'no asistiré';

    // Crear mensaje
    let mensaje = `Hola confirmo que ${asistenciaTexto}, mi nombre es ${nombre}`;
    if (mensajeOpcional !== '') {
        mensaje += ` y mi mensaje es ${mensajeOpcional}`;
    }

    // Enviar mensaje a WhatsApp (abrir en nueva pestaña/ventana)
    const urlWhatsApp = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, '_blank');

    // Mostrar mensaje en consola (como solicitaste para facilitar cambios)
    console.log(`Mensaje enviado a ${numeroDestino}: ${mensaje}`);

    // Reiniciar formulario
    resetearFormulario();
}

// Event listener para confirmar a Tiziana
confirmarBtn.addEventListener('click', () => {
    enviarConfirmacion(NUMERO_CONFIRMACION_TIZIANA);
});

// Event listener para confirmar a Tiziana 2
if (confirmarBtn2) {
    confirmarBtn2.addEventListener('click', () => {
        enviarConfirmacion(NUMERO_CONFIRMACION_TIZIANA2);
    });
}

// Función para reiniciar el formulario
function resetearFormulario() {
    // Limpiar selección de botones
    siAsistireBtn.classList.remove('active');
    noAsistireBtn.classList.remove('active');
    seleccionActual = null;

    // Limpiar campos
    nombreInput.value = '';
    if (mensajeInput) {
        mensajeInput.value = '';
    }
}

// Opcional: Permitir deseleccionar botones si se vuelve a hacer clic
siAsistireBtn.addEventListener('dblclick', (e) => {
    e.preventDefault(); // Evitar comportamiento doble clic innecesario
    siAsistireBtn.classList.remove('active');
    if (seleccionActual === 'si') {
        seleccionActual = null;
    }
});

noAsistireBtn.addEventListener('dblclick', (e) => {
    e.preventDefault();
    noAsistireBtn.classList.remove('active');
    if (seleccionActual === 'no') {
        seleccionActual = null;
    }
});

// ---------------------menu----------------------


document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('precio__toggle-btn');
  const mostrarSection = document.getElementById('precio__mostrar');
  const copyCbuBtn = document.getElementById('precio__copy-cbu');
  const copyAliasBtn = document.getElementById('precio__copy-alias');

  // Toggle bank details
  toggleBtn.addEventListener('click', () => {
    mostrarSection.classList.toggle('active');
    toggleBtn.textContent = mostrarSection.classList.contains('active')
      ? 'Ocultar datos bancarios'
      : 'Ver datos bancarios para pagos';
  });

  // Función común para copiar texto (para CBU y Alias)
  const copiarTexto = (button, elementSelector) => {
    const element = document.querySelector(elementSelector);
    if (element) {
      const text = element.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = `¡${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'} Copiado!`;
        setTimeout(() => {
          button.textContent = `Copiar ${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'}`;
        }, 2000);
      });
    } else {
      // Si el elemento no existe, cambia el texto del botón para informar al usuario
      button.textContent = `${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'} no disponible`;
      setTimeout(() => {
        button.textContent = `Copiar ${elementSelector === '.precio__CBU' ? 'CBU' : 'Alias'}`;
      }, 2000);
    }
  };

  // Copy CBU
  if (copyCbuBtn) {
    copyCbuBtn.addEventListener('click', () => {
      copiarTexto(copyCbuBtn, '.precio__CBU');
    });
  }

  // Copy Alias
  if (copyAliasBtn) {
    copyAliasBtn.addEventListener('click', () => {
      copiarTexto(copyAliasBtn, '.precio__alias');
    });
  }

  // Lightbox del menú
  const btnAbrir = document.querySelector('.foto__menu');
  const lightbox = document.getElementById('menuFotoLightbox');
  const btnCerrar = document.getElementById('menuFotoCerrar');
  const overlay = document.querySelector('.menuFoto-overlay');

  // Abrir lightbox
  btnAbrir.addEventListener('click', () => {
    lightbox.style.display = 'block';
    setTimeout(() => lightbox.classList.add('activo'), 10);
  });

  // Cerrar lightbox
  const cerrarLightbox = () => {
    lightbox.classList.remove('activo');
    setTimeout(() => (lightbox.style.display = 'none'), 0);
  };

  btnCerrar.addEventListener('click', cerrarLightbox);
  overlay.addEventListener('click', cerrarLightbox);

  // Prevenir cierre al hacer click en la imagen
  document.querySelector('.menuFoto-imagen').addEventListener('click', (e) => {
    e.stopPropagation();
  });
});

