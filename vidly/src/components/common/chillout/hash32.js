// Javascript implementation(s) of Java’s String.hashCode() method

const hashCode1 = str =>
  [].reduce.call(
    str,
    function(hash, i) {
      var chr = i.charCodeAt(0);
      hash = (hash << 5) - hash + chr;
      return hash | 0;
    },
    0
  );

const hashCode2 = function(s) {
  return s.split("").reduce(function(a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

const hashCode3 = s =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

export default hashCode1;
export { hashCode2, hashCode3 };
