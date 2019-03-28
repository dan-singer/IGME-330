class GiphyResult {
    constructor(result) {
        let smallURL = result.images.original.url;
        if (!smallURL) smallURL = "images/no-image-found.png";
        this.smallURL = smallURL;
        this.url = result.url;
        this.rating = (result.rating ? result.rating : "NA").toUpperCase(); 
        this.line = `<div class='result'><img src='${this.smallURL}' title='${result.id}' />`;
        this.line += `<span><a target='_blank' href='${this.url}'>View on Giphy</a></span>`;
        this.line += `<p>Rating: ${this.rating}</p></div>`;
    }
}
export {GiphyResult};