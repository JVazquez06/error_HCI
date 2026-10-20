// Script interactivo para la réplica de Software Shop
$(document).ready(function() {
    // 1. Tooltips Bootstrap
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // 2. Base de datos de ciudades para autocompletado con indicativos telefónicos
    var listaCiudades = [
        { id: "1", value: "Bogotá, Colombia", nombre: "Bogotá", indicativo: "+57 (1)" },
        { id: "2", value: "Medellín, Colombia", nombre: "Medellín", indicativo: "+57 (4)" },
        { id: "3", value: "Cali, Colombia", nombre: "Cali", indicativo: "+57 (2)" },
        { id: "4", value: "Barranquilla, Colombia", nombre: "Barranquilla", indicativo: "+57 (5)" },
        { id: "5", value: "Bucaramanga, Colombia", nombre: "Bucaramanga", indicativo: "+57 (7)" },
        { id: "6", value: "Cartagena, Colombia", nombre: "Cartagena", indicativo: "+57 (5)" },
        { id: "7", value: "Ciudad de México, México", nombre: "Ciudad de México", indicativo: "+52 (55)" },
        { id: "8", value: "Guadalajara, México", nombre: "Guadalajara", indicativo: "+52 (33)" },
        { id: "9", value: "Monterrey, México", nombre: "Monterrey", indicativo: "+52 (81)" },
        { id: "10", value: "Puebla, México", nombre: "Puebla", indicativo: "+52 (222)" },
        { id: "11", value: "Lima, Perú", nombre: "Lima", indicativo: "+51 (1)" },
        { id: "12", value: "Arequipa, Perú", nombre: "Arequipa", indicativo: "+51 (54)" },
        { id: "13", value: "Santiago, Chile", nombre: "Santiago", indicativo: "+56 (2)" },
        { id: "14", value: "Valparaíso, Chile", nombre: "Valparaíso", indicativo: "+56 (32)" },
        { id: "15", value: "Buenos Aires, Argentina", nombre: "Buenos Aires", indicativo: "+54 (11)" },
        { id: "16", value: "Córdoba, Argentina", nombre: "Córdoba", indicativo: "+54 (351)" },
        { id: "17", value: "Rosario, Argentina", nombre: "Rosario", indicativo: "+54 (341)" },
        { id: "18", value: "Quito, Ecuador", nombre: "Quito", indicativo: "+593 (2)" },
        { id: "19", value: "Guayaquil, Ecuador", nombre: "Guayaquil", indicativo: "+593 (4)" },
        { id: "20", value: "Cuenca, Ecuador", nombre: "Cuenca", indicativo: "+593 (7)" },
        { id: "21", value: "São Paulo, Brasil", nombre: "São Paulo", indicativo: "+55 (11)" },
        { id: "22", value: "Rio de Janeiro, Brasil", nombre: "Rio de Janeiro", indicativo: "+55 (21)" },
        { id: "23", value: "Caracas, Venezuela", nombre: "Caracas", indicativo: "+58 (212)" },
        { id: "24", value: "Montevideo, Uruguay", nombre: "Montevideo", indicativo: "+598 (2)" },
        { id: "25", value: "San José, Costa Rica", nombre: "San José", indicativo: "+506" },
        { id: "26", value: "Ciudad de Panamá, Panamá", nombre: "Ciudad de Panamá", indicativo: "+507" },
        { id: "27", value: "Madrid, España", nombre: "Madrid", indicativo: "+34 (91)" },
        { id: "28", value: "Barcelona, España", nombre: "Barcelona", indicativo: "+34 (93)" }
    ];

    if ($.fn.autocomplete) {
        $(".ciudad_nombre").autocomplete({
            minLength: 1,
            delay: 100,
            source: function(request, response) {
                var term = request.term.toLowerCase();
                var matches = $.grep(listaCiudades, function(item) {
                    return item.value.toLowerCase().indexOf(term) >= 0;
                });
                response(matches);
            },
            select: function(event, ui) {
                $('.ciudad_nombre').val(ui.item.value);
                $('.ciudad_ID').val(ui.item.id);
                $('.ciudad_indicativo').val(ui.item.indicativo);
                return false;
            }
        });
    }

    // 3. Drawer de Cotizar
    $("#desplegable_Cotizar").on("click", function(e) {
        e.preventDefault();
        $(".despliegue").fadeIn(200).css("display", "block");
    });

    $("#cerrar_Desplegable_Cotizar").on("click", function(e) {
        e.preventDefault();
        $(".despliegue").fadeOut(200);
    });

    // 4. Modal / Lightbox de Solicitud
    $("#cerrar_Solicitud_Lightbox").on("click", function(e) {
        e.preventDefault();
        $(".lightbox-solicitud").fadeOut(200);
    });

    // 5. Modal / Lightbox de Confirmación Cotización
    $("#cerrar_lightbox_Cotizacion").on("click", function(e) {
        e.preventDefault();
        $(".lightbox-confirma").fadeOut(200);
    });

    // =========================================================================
    // 6. Validación de Formulario - Heurística 9 de Jakob Nielsen (2024):
    // "Help users recognize, diagnose, and recover from errors"
    // =========================================================================

    // Reglas de diagnóstico y sugerencias constructivas de recuperación por campo
    var reglasValidacion = {
        tipo_entidad: function(valor) {
            if (!valor || valor === "") {
                return "Por favor, selecciona un tipo de entidad (ej. Académica, Corporativa).";
            }
            return null;
        },
        entidad: function(valor) {
            if (!valor) {
                return "Por favor, ingresa el nombre de tu entidad o empresa.";
            }
            if (valor.length < 2) {
                return "El nombre de la entidad debe tener al menos 2 caracteres.";
            }
            return null;
        },
        nombre: function(valor) {
            if (!valor) {
                return "Por favor, ingresa tu nombre.";
            }
            if (valor.length < 2) {
                return "El nombre debe tener al menos 2 letras.";
            }
            var regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
            if (!regexLetras.test(valor)) {
                return "El nombre solo debe contener letras (sin números ni caracteres especiales).";
            }
            return null;
        },
        apellido: function(valor) {
            if (!valor) {
                return "Por favor, ingresa tu apellido.";
            }
            if (valor.length < 2) {
                return "El apellido debe tener al menos 2 letras.";
            }
            var regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
            if (!regexLetras.test(valor)) {
                return "El apellido solo debe contener letras (sin números ni caracteres especiales).";
            }
            return null;
        },
        ciudad: function(valor) {
            if (!valor) {
                return "Por favor, ingresa tu ciudad de residencia.";
            }
            var ciudadID = $('#ciudadID').val();
            var coincide = listaCiudades.some(function(item) {
                return item.value.toLowerCase() === valor.toLowerCase() || item.nombre.toLowerCase() === valor.toLowerCase();
            });
            if (!ciudadID && !coincide && valor.length > 0) {
                return "Por favor, selecciona una ciudad de la lista sugerida para vincular tu indicativo.";
            }
            return null;
        },
        celular: function(valor) {
            if (!valor) {
                return "Por favor, ingresa un número de teléfono o celular de contacto.";
            }
            if (/[a-zA-Z]/.test(valor)) {
                return "El teléfono no debe contener letras. Ingresa solo números.";
            }
            var digitos = valor.replace(/\D/g, '');
            if (digitos.length < 7 || digitos.length > 15) {
                return "Ingresa un número telefónico válido (entre 7 y 15 dígitos numéricos).";
            }
            return null;
        },
        ext: function(valor) {
            if (valor && !/^\d{1,6}$/.test(valor)) {
                return "La extensión debe contener solo números (ejemplo: 104).";
            }
            return null;
        },
        e_mail: function(valor) {
            if (!valor) {
                return "Por favor, ingresa tu correo electrónico.";
            }
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (!emailRegex.test(valor)) {
                if (valor.indexOf('@') === -1) {
                    return "Falta el símbolo '@' en tu correo (ejemplo: usuario@empresa.com).";
                }
                var partes = valor.split('@');
                if (!partes[1] || partes[1].indexOf('.') === -1) {
                    return "Falta el dominio después del '@' (ejemplo: usuario@empresa.com).";
                }
                return "Ingresa un correo electrónico con formato válido (ejemplo: nombre@dominio.com).";
            }
            return null;
        }
    };

    // 1. RECONOCER Y DIAGNOSTICAR: Resalta visualmente el campo y muestra el mensaje explicativo
    function mostrarErrorCampo(campoId, mensaje) {
        var input = $('#' + campoId);
        var contenedor = input.closest('.campo-contenedor');
        var errorSpan = $('#error-' + campoId);

        contenedor.removeClass('es-valido').addClass('tiene-error');
        input.attr('aria-invalid', 'true');
        errorSpan.html('<i class="fa-solid fa-circle-exclamation"></i> ' + mensaje).addClass('visible');
    }

    // 2. RECUPERARSE: Limpia el error y muestra confirmación visual de validez
    function limpiarErrorCampo(campoId) {
        var input = $('#' + campoId);
        var contenedor = input.closest('.campo-contenedor');
        var errorSpan = $('#error-' + campoId);

        contenedor.removeClass('tiene-error');
        input.removeAttr('aria-invalid');
        errorSpan.text('').removeClass('visible');

        var valor = input.val() ? input.val().trim() : '';
        if (valor && reglasValidacion[campoId] && !reglasValidacion[campoId](valor)) {
            contenedor.addClass('es-valido');
        } else {
            contenedor.removeClass('es-valido');
        }
    }

    // Validación individual de un campo
    function validarCampo(campoId, mostrarInmediato) {
        var input = $('#' + campoId);
        if (!input.length) return true;

        var valor = input.val() ? input.val().trim() : '';
        var validador = reglasValidacion[campoId];

        if (validador) {
            var error = validador(valor);
            if (error) {
                if (mostrarInmediato) {
                    mostrarErrorCampo(campoId, error);
                }
                return false;
            } else {
                limpiarErrorCampo(campoId);
                return true;
            }
        }
        return true;
    }

    // 3. RECUPERACIÓN EN TIEMPO REAL: Los errores se corrigen en cuanto el usuario escribe
    var camposAValidar = ['tipo_entidad', 'entidad', 'nombre', 'apellido', 'ciudad', 'celular', 'ext', 'e_mail'];

    camposAValidar.forEach(function(campoId) {
        var selector = '#' + campoId;

        // Validar al perder el foco (blur)
        $(selector).on('blur', function() {
            var valor = $(this).val() ? $(this).val().trim() : '';
            if (valor !== '' || $(this).prop('required')) {
                validarCampo(campoId, true);
            }
        });

        // Al editar (input/change): si tiene error, validar inmediatamente para retirar el error en cuanto sea válido
        $(selector).on('input change', function() {
            var contenedor = $(this).closest('.campo-contenedor');
            if (contenedor.hasClass('tiene-error') || contenedor.hasClass('es-valido')) {
                validarCampo(campoId, true);
            }
            if ($('.campo-contenedor.tiene-error').length === 0) {
                $('#error').slideUp(200);
            }
        });
    });

    // Limpiar error de ciudad al seleccionar autocompletado
    $(".ciudad_nombre").on("autocompleteselect", function(event, ui) {
        setTimeout(function() {
            limpiarErrorCampo('ciudad');
        }, 50);
    });

    function mostrarExito() {
        var exitoHtml = '<div id="mensaje-exito" style="background:#e8f8f0; border:1px solid #27ae60; color:#27ae60; padding:18px 24px; border-radius:8px; text-align:center; font-weight:bold; font-size:16px; margin:20px 0;">' +
                        '<i class="fa-solid fa-circle-check" style="font-size:24px; display:block; margin-bottom:8px;"></i>' +
                        '¡Registro exitoso! Gracias por registrarte en Software Shop. Hemos recibido tu información correctamente.' +
                        '</div>';
        $('#form-registro').slideUp(300, function() {
            $('.w-form').append(exitoHtml);
        });
    }

    // Envío del formulario con diagnóstico y enfoque en el primer error
    $("#boton-formulario-registro").on("click", function(e) {
        e.preventDefault();

        var esFormularioValido = true;
        var primerCampoInvalido = null;

        camposAValidar.forEach(function(campoId) {
            var esValido = validarCampo(campoId, true);
            if (!esValido) {
                esFormularioValido = false;
                if (!primerCampoInvalido) {
                    primerCampoInvalido = $('#' + campoId);
                }
            }
        });

        var errorAlert = $('#error');
        var errorTextoGeneral = $('#error-texto-general');

        if (!esFormularioValido) {
            errorTextoGeneral.text("Por favor, revisa y corrige los campos marcados en rojo antes de continuar.");
            errorAlert.slideDown(250);

            // Guiar al usuario desplazando y enfocando el primer campo con error
            if (primerCampoInvalido && primerCampoInvalido.length) {
                $('html, body').animate({
                    scrollTop: primerCampoInvalido.offset().top - 140
                }, 300, function() {
                    primerCampoInvalido.focus();
                });
            }
            return;
        }

        errorAlert.slideUp(200);

        if (typeof grecaptcha !== 'undefined' && grecaptcha.execute) {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LffdwQsAAAAAK6_p97UO1FbhjXUus21Lmeldrfs', { action: 'validarUsuario' })
                    .then(function(token) {
                        mostrarExito();
                    })
                    .catch(function() {
                        mostrarExito();
                    });
            });
        } else {
            mostrarExito();
        }
    });

    // 7. Toggle menú responsive (mobile)
    $(".bar.nav-bar-menu").on("click", function() {
        var menu = $(this).siblings(".nav-menu-responsive-left");
        menu.toggle();
    });

    // 8. Prevención de submit en Enter según el script original
    $("form").keypress(function(e) {
        if (e.which === 13) {
            return false;
        }
    });
});
