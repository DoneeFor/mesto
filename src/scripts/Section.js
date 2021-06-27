 export default class Section {
  constructor({items, renderer}, elementsList) {
      this._items = items;
      this._renderer = renderer;
      this._elementsList = elementsList;
  }

  rendererItems() {
      this._items.forEach((item) => {
          this._renderer(this, item);
      });
  }

  addItem(element) {
      this._elementsList.prepend(element);
  }
}
