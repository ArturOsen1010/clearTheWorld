class Экран {
  constructor(ширина, высота) {
    this.ширина = ширина;
    this.высота = высота;

    this.div = document.createElement("div");
    this.div.style.width = `${this.ширина}px`;
    this.div.style.height = `${this.высота}px`;
    this.div.style.backgroundColor = "#4287f5";
    document.body.appendChild(this.div);

    this.реклама = new Реклама(this.div, 0, 0, this.ширина, this.высота / 2);
    this.карта = new Карта(this.div, 0, this.высота / 2, this.ширина, this.высота / 2);

    this.карта.div.addEventListener('картаЗагружена', () => {
      this.обновитьРазмер();
    });
  }

  обновитьРазмер() {
    let размерКарты = this.карта.получитьРазмерИзображения(this.ширина, this.высота);
    let новыйX = this.ширина - размерКарты.ширина;
    let новыйY = this.высота - размерКарты.высота;
    let новаяШирина = this.ширина;
    let новаяВысота = this.высота - размерКарты.высота;

    this.реклама.изменитьРазмер(0, 0, новаяШирина, новаяВысота);
    this.карта.изменитьРазмер(0, новаяВысота, размерКарты.ширина, размерКарты.высота);
  }
}

class Реклама {
  constructor (parent, x, y, ширина, высота) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.ширина = ширина;
    this.высота = высота;

    this.div = document.createElement("div");
    this.div.style.width = `${this.ширина}px`;
    this.div.style.height = `${this.высота}px`;
    this.div.style.background = "#48f542";
    this.div.style.position = "fixed";
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
    this.parent.appendChild(this.div);

    this.div.addEventListener("click", function() {
      window.location.href = "https://paypal.me/arturOsen";
    });
  }

  изменитьРазмер(x, y, ширина, высота) {
    this.div.style.left = `${x}px`;
    this.div.style.top = `${y}px`;
    this.div.style.width = `${ширина}px`;
    this.div.style.height = `${высота}px`;
    this.div.style.backgroundImage = "url('advert.jpg')";
    this.div.style.backgroundPosition = "center center";
    this.div.style.backgroundRepeat = "no-repeat";
    this.div.style.backgroundSize = "cover";

  }
}

class Карта {
  constructor (parent, x, y, ширина, высота) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.ширина = ширина;
    this.высота = высота;

    this.div = document.createElement("div");
    this.div.style.backgroundColor = "#e042f5";
    this.div.style.position = "fixed";
    this.div.style.width = `${this.ширина}px`;
    this.div.style.height = `${this.высота}px`;
    this.div.style.left = `${this.x}px`;
    this.div.style.top = `${this.y}px`;
    this.parent.appendChild(this.div);

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.ширина;
    this.canvas.height = this.высота;
    this.canvas.style.background = "#917b73";
    this.context = this.canvas.getContext("2d");
    this.div.appendChild(this.canvas);

    this.прошлаяX = 0;
    this.прошлаяY = 0;
    this.canvas.addEventListener("touchmove", (event) => {
      var touch = event.touches[0];
      var x = touch.clientX;
      var y = touch.clientY;

      this.нарисоватьКруг(x, y)
    });

    this.image = new Image();
    this.image.src = 'world.jpg';
    this.image.onload = () => {
      this.div.dispatchEvent(new Event("картаЗагружена"));
    };
  }

  получитьРазмерИзображения (ширина, высота) {
    this.масштаб = this.ширина / this.image.width;
    this.высота = this.image.height * this.масштаб;
    this.image.width = this.ширина;
    this.image.height = this.высота;

    return {
      ширина: this.image.width,
      высота: this.image.height,
    };
  };

  изменитьРазмер(x, y, ширина, высота) {
    this.div.style.left = `${x}px`;
    this.div.style.top = `${y}px`;
    this.div.style.width = `${ширина}px`;
    this.div.style.height = `${высота}px`;

    this.canvas.width = ширина;
    this.canvas.height = высота;

    this.context.drawImage(this.image, 0, 0, ширина, высота);
  }

  нарисоватьКруг (x, y) {
    x = x - parseFloat(this.div.style.left);
    y = y - parseFloat(this.div.style.top);

    if (this.прошлаяX != 0 && this.прошлаяY != 0) {
      this.context.lineWidth = 40;
      this.context.strokeStyle = "#FFFFFF";
      this.context.beginPath();
      this.context.moveTo(this.прошлаяX, this.прошлаяY);
      this.context.lineTo(x, y);
      this.context.stroke();
    }

    this.context.fillStyle = "#FFFFFF";
    this.context.beginPath();
    this.context.arc(x, y, 40 / 2, 0, Math.PI * 2);
    this.context.fill();

    this.прошлаяX = x
    this.прошлаяY = y
  }
}

let экран
window.onload = () => {
  экран = new Экран(window.innerWidth, window.innerHeight)
}