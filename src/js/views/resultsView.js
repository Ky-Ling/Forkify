import View from "./view.js";
import previewView from "./previewView.js";


class resultsView extends View {
    _parentElement = document.querySelector(".results");
    _errMessage = "No recipes for your query! Please try again";
    _message = "";

    _generateMarkUp() {
        return this._data.map(result => previewView.render(result, false)).join("");
    };
}


export default new resultsView();