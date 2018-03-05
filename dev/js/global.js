window.IBBC = {};

IBBC.W = window;
IBBC.D = document;
IBBC.E = IBBC.D.documentElement;
IBBC.G = IBBC.D.getElementsByTagName('body')[0];
IBBC.X = IBBC.W.innerWidth || IBBC.E.clientWidth || IBBC.G.clientWidth;
IBBC.Y = IBBC.W.innerHeight || IBBC.E.clientHeight || IBBC.G.clientHeight;

IBBC.isIE10 = false;
IBBC.isIE11 = false;
IBBC.isFirefox = false;
IBBC.isSafari = false;

IBBC.paths = {
  dev: '',
  dist: ''
};


