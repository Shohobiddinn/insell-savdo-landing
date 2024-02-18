AOS.init();

let btn = document.getElementById('btn')
let submit = document.getElementById('submit')
let names = document.getElementById('name');
let phone = document.getElementById('phone');
let direction = document.getElementById('direction');
let test = document.getElementById('test');
document.getElementById('phone').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

document.addEventListener("DOMContentLoaded", (event) => {
    let user = localStorage.getItem('target')
    if (user) {
        let success = document.getElementById('success');
        success.classList.remove('hidden');
        let submit = document.getElementById('submit');
        submit.classList.add('hidden');
    } else {
        let success = document.getElementById('success');
        success.classList.add('hidden');
        let submit = document.getElementById('submit');
        submit.classList.remove('hidden');
    }
    // let params = (new URL(document.location)).searchParams;
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let target = params.target;
    console.log(target);
    if (target) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                target: target
            })
        };
        fetch(`https://admin.api-insell.uz/target_router/add_view?token=${target}`,requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
            
    } else console.log('no target query');
    
    if (localStorage.getItem("target")) {
        let target = JSON.parse(localStorage.getItem("target"))
        document.querySelector('#name').value = target.name;
        document.querySelector('#phone').value = target.phone;
        document.querySelector('#direction').value = target.direction;

    }

    function request() {

        if (!localStorage.getItem("target")) {
            var name = document.querySelector('#name').value;
            var phone = document.querySelector('#phone').value;
            var direction = document.querySelector('#direction').value;
            var token = "6698677486:AAH1mJZP41dpd66ckpswmhBjx24Quha6fc4";
            var chat_id = "1057006280";
            var chat_id2 = "5782208274";
            var url = `https://api.telegram.org/bot${token}/sendMessage`;
            let message = `<b>Insell Ariza!</b>\n`;
            message += `<b>Ism: </b>${name}\n`;
            message += `<b>Telefon raqam: </b>${phone}\n`;
            message += `<b>Yo'nalish: </b>${direction}`;

            axios
                .post(url, {
                    chat_id: chat_id,
                    parse_mode: "html",
                    text: message,
                })
                .then((res) => {

                    axios
                        .post(url, {
                            chat_id: chat_id2,
                            parse_mode: "html",
                            text: message,
                        })
                        .then((res) => {
                            localStorage.setItem("target", JSON.stringify({
                                name: name,
                                phone: phone,
                                direction: direction
                            }))
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-right",
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener("mouseenter", Swal.stopTimer);
                                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                                },
                            });
                            let success = document.getElementById('success');
                            success.classList.remove('hidden');
                            let submit = document.getElementById('submit');
                            submit.classList.add('hidden');
                            return Toast.fire({
                                icon: 'success',
                                title: "Siz ro'yhatdan o'tdinggiz",
                            });
                        }).catch(error => {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-right",
                                showConfirmButton: false,
                                timer: 1500,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener("mouseenter", Swal.stopTimer);
                                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                                },
                            });
                            let success = document.getElementById('success');
                            success.classList.remove('hidden');
                            let submit = document.getElementById('submit');
                            submit.classList.add('hidden');
                            return Toast.fire({
                                icon: 'error',
                                title: "Xatolik yuz berdi",
                            });
                            console.error('Error fetching data:', error);
                        });

                })
        }
    }
    function post() {
        let data = {
            name: document.querySelector('#name').value,
            number: document.querySelector('#phone').value,
            field: document.querySelector('#direction').value,
            token: target
        };
        axios.post('https://admin.api-insell.uz/reaching/create', data).then((res) => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });
            let success = document.getElementById('success');
            success.classList.remove('hidden');
            let submit = document.getElementById('submit');
            submit.classList.add('hidden');
            return Toast.fire({
                icon: 'success',
                title: "Siz ro'yhatdan o'tdinggiz",
            });
        }).catch(error => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-right",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });
            let success = document.getElementById('success');
            success.classList.remove('hidden');
            let submit = document.getElementById('submit');
            submit.classList.add('hidden');
            return Toast.fire({
                icon: 'error',
                title: "Xatolik yuz berdi",
            });
        });


    }



    submit.addEventListener("click", (evt) => {
        evt.preventDefault();
        var name = document.querySelector('#name').value;
        var phone = document.querySelector('#phone').value;
        var direction = document.querySelector('#direction').value;
        if (name && phone && direction) {
            request();
            post();
        }

    });

});





ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map('map', {
        center: [40.386515, 71.783323],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter());

    myMap.geoObjects.add(myPlacemark);

    myPlacemark.events
        .add('mouseenter', function (e) {
            e.get('target').options.set('preset', 'islands#redIcon');
        })
        .add('mouseleave', function (e) {
            e.get('target').options.unset('preset');
        });
}


let iframe_modal = document.getElementById('iframe_modal');
let iframe = document.getElementById('iframe');
let exampleModal = document.getElementById('exampleModal');

exampleModal.addEventListener('click', () => {
    if (!exampleModal.className.includes('show')) {

    }
});
iframe_modal.addEventListener('click', () => {

    iframe.src = 'https://www.youtube.com/embed/0Upayzo8pmU?si=xBqVw9i0VkUMipFc';

})
window.addEventListener('click', (event) => {
    console.log(event.target.className, 'log');
    if (event.target.className.includes('modal modal-xl fade') || event.target.className.includes('btn')) {
        iframe.src = " ";
    }
})





// https://admin.api-insell.uz/reaching/create
// async function post() {
//     let data = {
//         name: names.value,
//         number: phone.value,
//         field: direction.value,
//         token: token
//     }
//     console.log(data);
//     axios.post('https://api-insell.uz/target', data)
//         .then(response => {

//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: "top-right",
//                 showConfirmButton: false,
//                 timer: 1500,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                     toast.addEventListener("mouseenter", Swal.stopTimer);
//                     toast.addEventListener("mouseleave", Swal.resumeTimer);
//                 },
//             });
//             localStorage.setItem('user', JSON.stringify(response.data))
//             let success = document.getElementById('success');
//             success.classList.remove('hidden');
//             let submit = document.getElementById('submit');
//             submit.classList.add('hidden');
//             return Toast.fire({
//                 icon: 'success',
//                 title: "Siz ro'yhatdan o'tdinggiz",
//             });

//         })
//         .catch(error => {
//             const Toast = Swal.mixin({
//                 toast: true,
//                 position: "top-right",
//                 showConfirmButton: false,
//                 timer: 1500,
//                 timerProgressBar: true,
//                 didOpen: (toast) => {
//                     toast.addEventListener("mouseenter", Swal.stopTimer);
//                     toast.addEventListener("mouseleave", Swal.resumeTimer);
//                 },
//             });
//             return Toast.fire({
//                 icon: 'error',
//                 title: "Xatolik yuz berdi",
//             });
//             console.error('Error fetching data:', error);
//         });
// }
// submit.addEventListener('click', (event) => {
//     event.preventDefault()
//     if (phone.value && names.value && direction.value) {
//         post();

//     }
// });


