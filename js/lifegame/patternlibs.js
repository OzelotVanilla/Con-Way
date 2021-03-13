export var patternlibs = {

  regist(name, generator) {
    this[name] = generator;
  },

  load(marker) {
    var reader = new XMLHttpRequest();
    request.open("get", "patternlibs.json");
    request.send(null);
    request.onload = function () {
      if (request.status == 200) {
        var cache = JSON.parse(request.responseText);
        for (theName in cache) {
          if (cache.hasOwnProperty(theName) && typeof (cache[theName])) {
            function injected(space, x, y) {
              for (var dx = 0; dx < this.pattern.length; dx++) {
                var column = this.pattern[dx];
                for (var dy = 0; dy < column.length; dy++) {
                  if (column[dy] == 1) {
                    space.set(x + dx, y + dy, true);
                  }
                }
              }
            }
            injected.pattern = cache[theName];
            patternlibs.regist(theName, injected);
          }
        }
      }
    }
    marker();
  }

}


