let container_color_inputs = document.querySelector(".color-container__color-inputs").style;
container_color_inputs.width = "27rem";
let container = document.querySelector(".main_container").style;
let gradient_preview_container = document.querySelector(".main_container__gradient-preview-container").style;
let angle_container = document.querySelector(".color-container__angle").style;
let radius_picker_wrap = document.querySelector(".radius-picker-wrap");
let smile_container = document.querySelector(".smile-container").style;

let gradient_mode = "linearGradient";
animateColorInputs();
// Simple example, see optional options for more configuration.
const color_first = Pickr.create({
    el: "#picker-first",
    theme: "nano", // or 'monolith', or 'nano'

    swatches: [
        "rgba(244, 67, 54, 1)",
        "rgba(233, 30, 99, 0.95)",
        "rgba(156, 39, 176, 0.9)",
        "rgba(103, 58, 183, 0.85)",
        "rgba(63, 81, 181, 0.8)",
        "rgba(33, 150, 243, 0.75)",
        "rgba(3, 169, 244, 0.7)",
        "rgba(0, 188, 212, 0.7)",
        "rgba(0, 150, 136, 0.75)",
        "rgba(76, 175, 80, 0.8)",
        "rgba(139, 195, 74, 0.85)",
        "rgba(205, 220, 57, 0.9)",
        "rgba(255, 235, 59, 0.95)",
        "rgba(255, 193, 7, 1)"
    ],

    default: "#EB8F68",

    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
        }
    }
});

// Simple example, see optional options for more configuration.
const color_second = Pickr.create({
    el: "#picker-second",
    theme: "nano", // or 'monolith', or 'nano'

    swatches: [
        "rgba(244, 67, 54, 1)",
        "rgba(233, 30, 99, 0.95)",
        "rgba(156, 39, 176, 0.9)",
        "rgba(103, 58, 183, 0.85)",
        "rgba(63, 81, 181, 0.8)",
        "rgba(33, 150, 243, 0.75)",
        "rgba(3, 169, 244, 0.7)",
        "rgba(0, 188, 212, 0.7)",
        "rgba(0, 150, 136, 0.75)",
        "rgba(76, 175, 80, 0.8)",
        "rgba(139, 195, 74, 0.85)",
        "rgba(205, 220, 57, 0.9)",
        "rgba(255, 235, 59, 0.95)",
        "rgba(255, 193, 7, 1)"
    ],

    default: "#784DE3",

    components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: false,
            rgba: false,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: false,
            save: true
        }
    }
});

let Degree;
function getValue(value) {
    switch (value) {
        case 'degree':
            return Degree;
        case 'code_color_first':
            return document.getElementById("first-color-code").value;
        case 'code_color_second':
            return document.getElementById("second-color-code").value;
        case 'color_first_stop':
            return document.getElementById("color-first-stop").value;
        case 'color_second_stop':
            return document.getElementById("color-second-stop").value;
    }
}

let linear_gradient_webkit;
let linear_gradient;
let radial_gradient_webkit;
let radial_gradient;


function gradient() {
    linear_gradient_webkit = "-webkit-linear-gradient(" + getValue('degree') + "deg, " + getValue('code_color_first') + " " + getValue('color_first_stop') + "%, " + getValue('code_color_second') + " " + getValue('color_second_stop') + "%)";

    linear_gradient = "linear-gradient(" + getValue('degree') + "deg, " + getValue('code_color_first') + " " + getValue('color_first_stop') + "%, " + getValue('code_color_second') + " " + getValue('color_second_stop') + "%)";

    radial_gradient_webkit = "-webkit-radial-gradient(" + getValue('code_color_first') + " " + getValue('color_first_stop') + "%, " + getValue('code_color_second') + " " + getValue('color_second_stop') + "%)";

    radial_gradient = "radial-gradient(" + getValue('code_color_first') + " " + getValue('color_first_stop') + "%, " + getValue('code_color_second') + " " + getValue('color_second_stop') + "%)";

    if (gradient_mode == "linearGradient") {
        document.querySelector(".background-radius-picker-wrap").style.background = "#fff";
        document.querySelector(".linear-gradient").style.background = linear_gradient_webkit;
    } else {
        document.querySelector(".radial-gradient").style.background = radial_gradient_webkit;
    }
}

function gradientCode(compatibility) {
    if (compatibility == true) {
        if (gradient_mode == "linearGradient") {
            document.querySelector('.js-code').innerHTML = '<span class="blue">background</span>: ' + getValue('code_color_first') + ';<br/><span class="blue">background</span>: ' + linear_gradient + ';<br/><span class="blue">background</span>: ' + linear_gradient_webkit + ';';
        } else if (gradient_mode == "radialGradient") {
            document.querySelector('.js-code').innerHTML = '<span class="blue">background</span>: ' + getValue('code_color_first') + ';<br/><span class="blue">background</span>: ' + radial_gradient + ';<br/><span class="blue">background</span>: ' + radial_gradient_webkit + ';';
        }
    } else {
        if (gradient_mode == "linearGradient") {
            document.querySelector('.js-code').innerHTML = '<span class="blue">background</span>: ' + getValue('code_color_first') + ';<br/><span class="blue">background</span>: ' + linear_gradient + ';';
        } else if (gradient_mode == "radialGradient") {
            document.querySelector('.js-code').innerHTML = '<span class="blue">background</span>: ' + getValue('code_color_first') + ';<br/><span class="blue">background</span>: ' + radial_gradient + ';';
        }
    }
}

function setColor(which) {
    switch (which) {
        case 'first':
            color_first.setColor(getValue('code_color_first'), false);
        case 'second':
            color_second.setColor(getValue('code_color_second'), false);
    }
    gradient();
}

function stopColor(which) {
    switch (which) {
        case 'first':
            if (getValue('color_first_stop') > 100) {
                document.getElementById("color-first-stop").value = 100;
            }
            if (getValue('color_first_stop') < 0) {
                document.getElementById("color-first-stop").value = 0;
            }
        case 'second':
            if (getValue('color_second_stop') > 100) {
                document.getElementById("color-second-stop").value = 100;
            }
            if (getValue('color_second_stop') < 0) {
                document.getElementById("color-second-stop").value = 0;
            }
    }
    gradient();
}


color_first.on("save", (color) => {
    document.getElementById("first-color-code").value = color.toHEXA().toString();
    gradient();
});

color_second.on("save", (color) => {
    document.getElementById("second-color-code").value = color.toHEXA().toString();
    gradient();
});

let toggle_mode_button = document.getElementById("toggle-mode-gradient-button");
let mode_icon = document.querySelector('.mode-icon')
toggle_mode_button.addEventListener("click", function () {
    if (container_color_inputs.width == "27rem") {
        mode_icon.classList.remove("icon-radial-gradient");
        mode_icon.classList.add("icon-linear-gradient");
        gradient_mode = "radialGradient";
        container.marginBottom = "8rem";
        container_color_inputs.width = "70rem";
        gradient_preview_container.transform = "translate(0px, -315px)";
        angle_container.transform = "translate(0px, -165px)";
        radius_picker_wrap.classList.add("radial-gradient");
        gradient();
        document.querySelector(".radius-picker").style.visibility = "hidden";
        radius_picker_wrap.style.width = "20em";
        radius_picker_wrap.style.height = "20em";
        smile_container.marginTop = "-320px";
    } else if (container_color_inputs.width == "70rem") {
        animateColorInputs();
        mode_icon.classList.remove("icon-linear-gradient");
        mode_icon.classList.add("icon-radial-gradient");
        gradient_mode = "linearGradient";
        container.marginBottom = "0rem";
        container_color_inputs.width = "27rem";
        gradient_preview_container.transform = "translate(0px, 0px)";
        angle_container.transform = "translate(0px, 0px)";
        radius_picker_wrap.classList.remove("radial-gradient");
        gradient();
        document.querySelector(".radius-picker").style.visibility = "visible";
        radius_picker_wrap.style.width = "8em";
        radius_picker_wrap.style.height = "8em";
        smile_container.marginTop = "0px";
    }
});

function animateColorInputs() {
    let first_color_picker = document.querySelector('.first-color__color-picker');
    let second_color_picker = document.querySelector('.second-color__color-picker');
    first_color_picker.style.transform = "translateX(-20px) rotateZ(-17deg)";
    second_color_picker.style.transform = "translateX(20px) rotateZ(17deg)";
    setTimeout(function () {
        first_color_picker.style.transform = "translateX(0) rotateZ(0)";
        second_color_picker.style.transform = "translateX(0) rotateZ(0)";
    }, 1500)
}

let close_modal = document.querySelector('.js-back-layer-modal');
let back_layer_modal = document.querySelector('.back-layer-modal');
let code_modal = document.querySelector('.back-layer-modal__code-modal').style;
code_modal.transform = "translate(0px, 566px)";
document.getElementById("show-code-button").addEventListener("click", function () {
    back_layer_modal.classList.add('show');
    setTimeout(function () {
        code_modal.transform = "translate(0px, 0px)";
        back_layer_modal.classList.add('visuallyvisible');
    }, 1)
    showCode();
});

close_modal.addEventListener('click', function () {
    code_modal.transform = "translate(0px, 566px)";
    back_layer_modal.classList.add('visuallyhidden');
    back_layer_modal.classList.remove('visuallyvisible');
    close_modal.addEventListener('transitionend', function (e) {
        back_layer_modal.classList.add('hidden');
        back_layer_modal.classList.remove('show');

    }, {
        capture: false,
        once: true,
        passive: false
    });
}, false);


function copyToClipboard(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

let copy_button = document.querySelector('#copy-button');
copy_button.addEventListener('click', function () {
    let text_code = document.getElementById("code").innerText;
    copyToClipboard(text_code);
    iziToast.info({
        message: 'Code Copied ✌',
        icon: 'icon-copy',
        close: false,
        timeout: 2000,
        transitionIn: 'bounceInRight',
        progressBar: false,
        position: 'bottomLeft'
    });
});


function showCode() {
    let compatibility_el = document.getElementById("Compatibility");
    if (compatibility_el.checked) {
        gradientCode(true);
    } else {
        gradientCode(false);
    }
}


let DegreePicker = function (el, opts) {
    let defaults = {
        /**
         * Degrees step
         * @type {Number}
         */
        step: 1,

        /**
         * Function called after degree update
         * @param  {DOM Element}   self   Picker
         * @param  {Number}   degree
         */
        callback: function (self, degree) { }
    };

    opts = opts || {};

    for (let property in defaults) {
        if (!opts[property]) opts[property] = defaults[property];
    }

    let _ = {
        container: {
            el: null,
            x: null,
            y: null,
            radius: null,
            center: {
                x: null,
                y: null
            }
        },
        handle: {
            el: null,
            x: null,
            y: null,
            size: 0,
            position: function (of) {
                return Math.round(
                    _.container.radius *
                    Math[of === "x" ? "cos" : "sin"](Math.atan2(_.handle.y, _.handle.x))
                );
            }
        },

        degree: {
            el: null,
            value: null,

            get: function () {
                return Math.round(this.value);
            },

            update: function () {
                this.value = (Math.atan2(_.handle.y * -1, _.handle.x) * 180) / Math.PI;

                this.value += this.value < 0 ? 360 : 0;
            },

            set: function (value) {
                value = value > 180 ? value - 360 : value;

                value = (value * Math.PI) / 180;

                _.handle.x = Math.cos(value);

                _.handle.y = -Math.sin(value);

                _.move();
            }
        },

        isDragging: false,

        init: function () {
            _.container.el = document.querySelector(el);
            _.container.x = _.container.el.offsetLeft;
            _.container.y = _.container.el.offsetTop;
            _.container.radius = _.container.el.offsetWidth / 2;
            _.updateElementCenter();

            _.handle.el = _.container.el.children[0];
            _.handle.size = _.handle.el.offsetWidth;

            _.degree.el = _.container.el.children[1];
            _.degree.set(_.container.el.getAttribute("data-degree") || 0);

            // Bind events
            _.handle.el.addEventListener("mousedown", _.onMouseDown);
            window.addEventListener("mouseup", _.onMouseUp);
            window.addEventListener("mousemove", _.onMouseMove);
            window.addEventListener("resize", _.updateElementCenter);
        },

        /* Events
         *************************************/
        onMouseDown: function (event) {
            _.isDragging = true;
            _.updateCoords(event);
            _.move();
        },

        onMouseUp: function () {
            _.isDragging = false;
        },

        onMouseMove: function (event) {
            if (_.isDragging) {
                _.updateCoords(event);
                _.move();
            }
        },

        /* Methods
         *************************************/
        updateElementCenter: function () {
            _.container.center.x = _.container.el.offsetLeft + _.container.radius;
            _.container.center.y = _.container.el.offsetTop + _.container.radius;
        },

        updateCoords: function (e) {
            _.handle.x = e.clientX - _.container.center.x;
            _.handle.y = e.clientY - _.container.center.y;

        },

        move: function () {
            _.degree.update();
            Degree = _.degree.get();
            gradient();
            if (_.degree.get() % opts.step === 0) {
                _.degree.el.innerHTML = _.degree.get();
                _.container.el.setAttribute("data-degree", _.degree.get());

            }

            _.handle.el.style["-webkit-transform"] =
                "translate(" +
                _.handle.position("x") +
                "px, " +
                _.handle.position("y") +
                "px)";
            _.handle.el.style["-moz-transform"] =
                "translate(" +
                _.handle.position("x") +
                "px, " +
                _.handle.position("y") +
                "px)";
            _.handle.el.style["-o-transform"] =
                "translate(" +
                _.handle.position("x") +
                "px, " +
                _.handle.position("y") +
                "px)";
            _.handle.el.style.transform =
                "translate(" +
                _.handle.position("x") +
                "px, " +
                _.handle.position("y") +
                "px)";

            opts.callback(_.container.el, _.degree.get());

        }
    };

    _.init();

    /**
     * Picker API
     */
    return {
        /**
         * Get picker value
         * @return {Number}
         */
        getValue: _.degree.get,

        /**
         * Set value of picker
         * @param {Number} value
         */
        setValue: _.degree.set
    };
};

let picker = new DegreePicker(".js-radius-picker");