class Dialog {
  constructor(map, data = []) {
    this.map = map;
    this.data = data;
    this.index = 0;
    document.querySelector('#dialog #right').addEventListener('click', this.advance.bind(this));
    document.querySelector('#dialog #left').addEventListener('click', this.goback.bind(this));
    this.render();
  }

  init() {
    this.index = 0;
    this.show();
  }

  show() {
    document.querySelector('#dialog').style.display = 'flex';
  }

  hide() {
    document.querySelector('#dialog').style.display = 'none';
  }

  advance() {
    console.log('advance clicked')
    if (this.index < this.data.length - 1) {
      this.index++;
      this.render();
    }
  }

  goback() {
    console.log('goback clicked')
    if (this.index > 0) {
      this.index--;
      this.render();
    }
  }

  render() {
    const data = this.data[this.index];
    document.querySelector('#test').innerHTML = data.properties.description;
    document.querySelector('#image').src = data.properties.imageSrc;
    this.map.flyTo({
      center: data.geometry.coordinates,
      zoom: 8
    });
  }

}

module.exports = Dialog;
