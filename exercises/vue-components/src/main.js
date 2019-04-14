const app = new Vue({
    el: '#app',
    data: {
        title: "Ajax Vue Example w/ Fetch API",
        result: {
            q: "???",
            a: "!!!"
        },
        copyrightName: "Dan Singer",
        copyrightYear: "2019"
    },
    // Lifecycle Hook
    created() {
        this.search();
    },
    methods: {
        search() {
            //if (! this.term.trim()) return;
            fetch("http://igm.rit.edu/~acjvks/courses/2018-fall/330/php/get-a-joke.php")
                .then(response => {
                    if (!response.ok) {
                        throw Error(`ERROR: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(json => {
                    console.log(json);
                    this.result = json;
                })
        } // end search
    } // end methods
});