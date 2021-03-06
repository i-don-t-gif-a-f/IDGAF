
// function onSuccess(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

//     var id_token = googleUser.getAuthResponse().id_token;
//     app.verifyUser()
// }
// function onFailure(error) {
//     console.log(error);
// }
// function renderButton() {
//     gapi.signin2.render('my-signin2', {
//         'scope': 'profile email',
//         'width': 250,
//         'height': 50,
//         'longtitle': true,
//         'theme': 'light',
//         'onsuccess': onSuccess,
//         'onfailure': onFailure,
//         'text': 'helo'
//     });
// }
// function disconnectGoogle(googleUser) {
//     console.log('disconnecting..')
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log('User signed out.');
//         renderButton()
//     });
// }

function alert(type, msg) {
    let color = ''
    if (type === 'error') {
        color = '#d43838'
    } else {
        color = '#008148'
    }
    $('#modal-alert').iziModal({
        attached: 'bottom',
        title: msg,
        headerColor: color,
        width: 400,
        timeout: 10000,
        pauseOnHover: true,
        timeoutProgressbar: true,
    });
    $('#modal-alert').iziModal('open');
}

const url = "http://localhost:3000";

let app = new Vue({
    el: "#app",
    data: {
        position: '',
        searchOnScreen: '',
        showSearch: false,
        searchOnScreen: '',
        found: []
    },
    computed: {

    },
    created() {
        axios
            .get('http://localhost:3000/posts')
            .then(allpost => {

                this.position = 'list-post'
            })
            .catch(err => {
                console.log(err)
            })

    },
    methods: {
        move(position) {
            this.position = position
        },
        submitSearch(search) {
            if (search === '') {
                this.position = "null"
            } else {
                let split = search.split(' ')
                let result = ''
                split.map((e, i) => {
                    if (e !== "") {
                        if (i !== split.length - 1) {
                            result += `#${e.toLowerCase()} `
                        } else {
                            result += `#${e.toLowerCase()}`
                        }
                    }
                    
                    this.searchOnScreen = result
                    axios.get(`http://localhost:3000/tags?q=${this.searchOnScreen.slice(1)}`)
                        .then(({ data }) => {
                            this.found = data
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    this.position = "searched-post"
                    this.showSearch = true
                })

            }
        },
        sukses() {
            this.position = 'list-post'
            alert('success', 'added new post')
        }
    }
});