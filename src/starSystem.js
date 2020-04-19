class StarSystem {
  constructor(x, y, generateFullSystem) {
    this.x = x;
    this.y = y;
    this.seed = ((x & 0xffff) << 16) | (y & 0xffff);
    this.rnd = new Rnd(this.seed);

    this.exists = this.rnd.int(0, 20) == 1;

    if (!this.exists) return;

    this.diameter = this.rnd.flt(10, 40);
    this.color = palette[this.rnd.int(0, 7)];

    if (!generateFullSystem) return;

    this.isFullSystem = true;
    this.distanceFromStar = this.rnd.flt(6.0, 20.0);
    this.nPlanets = this.rnd.int(0, 10);
    this.planets = [];

    for (let i = 0; i < this.nPlanets; i++) {
      this.planets.push({
        distance: this.distanceFromStar + this.rnd.flt(2.0, 50.0),
        diameter: this.rnd.flt(4.0, 20.0),
        type: planetTypes[Math.max(this.rnd.int(0, 3), 0)]
      });
    }
  }
}
