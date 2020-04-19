const randomFnGenerators = {
  mulberry32: seed => () => {
    var t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
};

class Rnd {
  constructor(seed, alg = 'mulberry32') {
    this.rndFn = randomFnGenerators[alg](seed);
  }

  flt(min, max) {
    return min + this.rndFn() * (max - min);
  }

  int(min, max) {
    return Math.floor(this.flt(min, max));
  }
}
