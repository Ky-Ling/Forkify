import View from "./view.js";
import previewView from "./previewView.js";


class bookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list");
    _errMessage = "No bookmark yet. Find a nice recipe and bookmark it.";
    _message = "";

    addHandlerRender(handler) {
        window.addEventListener("load", handler);
    };

    _generateMarkUp() {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join("");
    };
}


export default new bookmarksView();