var Zen = {};

var _ = {
  each: function(obj, iteratee, context) {
    var k, results, v;
    results = [];
    for (k in obj) {
      v = obj[k];
      results.push(iteratee(v, k));
    }
    return results;
  }
};

module.exports = function(s){
	Zen.frags = {};
	Zen.fragIndex = 0;
	
	var _s;
	_s = _bracket(s, Zen);
	_s = _getStack(_s, Zen);

	_.each(Zen.frags, function(r, k){
		if(!/\{\d+\}/.test(k)) return;
		Zen.frags[k.replace(/\{|\}/g, '')] = _getFrag(r);
	});

	return frag(_s).join('').replace(/(\&nbsp;)|(\{\s+\})/g, '');
};

// zen-coding
function frag(s){
	var arr = s.split('+'), ret = [];
	_.each(arr, function(v, i){
		if(/\{\d+\}/.test(v)){
			if(~v.indexOf('*')){
				v = v.split('*');
				var ss = _getPH(v[0]), sss = '';
				for(var m=0; m<v[1]; m++){ sss+=ss; }
				ret[i] = sss;
			} else {
				ret[i] = _getPH(v);
			}
		} else {
			ret[i] =_getFrag(v);
		}
	});

	return ret;
}

function _attrs(str){
	if(!str) return '';

	var arr, sid, clas = [], o = {}, s = [];
		arr = str.match(/(\#[\w\-\d]+)|(\.[\w\-\d]+)|(\[[^\]]+\])/g);
	if(arr){
		_.each(arr, function(me){
			if(me.charAt(0)==='['){
				s.push(me.replace(/\[|\]/g, ''));
			} else if(me.charAt(0)==='.' && o[me]===undefined){
				clas.push(me.slice(1));
				o[me] = true;
			} else {
				sid = sid || me.slice(1); // The first effective
			}
		});
	}

	if(sid) s.push('id="'+sid+'"');
	if(clas.length) s.push('class="'+clas.join(' ')+'"');
	return s.join(' ');
}

function _tag(str, ph){
	if(!str) return '';
	if(/\<[^\>]+\>/.test(str)) return str;
	if(/[\+\*\>\{]/.test(str)) return _getFrag(str);

	var tag = str.match(/^[^\W]+/), s,
		attrs = _attrs(str);
		attrs = attrs? ' '+attrs : '';
		ph = ph || '&nbsp;';
	if(!tag) tag = 'div';
	s = '<'+tag+attrs+(/img|input|br|hr/i.test(tag)? ' />' : '>'+ph+'</'+tag+'>');
	return s;
}

function _sibling(str){
	if(!str) return '';
	var arr = str.split('+'), s = '';
	_.each(arr, function(v){
		s += _tag(v);
	});
	return s;
}

function _repeat(str){
	if(!str) return '';
	var arr = str.split('*'), s = '';
	for(var i=0; i<(arr[1] || 0); i++){
		s += _tag(arr[0]);
	}
	return s;
}

function _stack(str){
	if(!str) return '';
	var arr = str.split('>');
	var s = '&nbsp;';
	_.each(arr, function(v){
		s = s.replace(/\&nbsp;/g, _tag(v));
	});
	return s;
}

function _bracket(str, Zen){
	if(!str) return '';
	if(!/\([^\(\)]+\)/.test(str)) return str;

	var arr = str.match(/\([^\(\)]+\)/g);
	_.each(arr, function(f){
		var key = '{'+Zen.fragIndex+'}';
		if(Zen.frags[f]===undefined){
			Zen.frags[key] = f.replace(/\(|\)/g, '');
		}
		str = str.split(f).join(key);
		Zen.fragIndex++;
	});

	if(/\([^\(\)]+\)/.test(str)) return _bracket(str, Zen);
	return str;
}

function _getStack(str, Zen){
	if(!str) return '';
	if(str.indexOf('>')<0) return str;

	var reg = /[^\>\+]+\>[^\>]+$/,
		last = str.match(reg);
	if(last){
		var key = '{'+Zen.fragIndex+'}', f = last[0];
		if(Zen.frags[f]===undefined){
			Zen.frags[key] = f;
		}
		str = str.replace(reg, key);
		Zen.fragIndex++;
	}

	if(~str.indexOf('>')) return _getStack(str, Zen);
	return str;
}

function _getFrag(str){
	if(~str.indexOf('>')) return _stack(str);
	if(~str.indexOf('+')) return _sibling(str);
	if(~str.indexOf('*')) return _repeat(str);
	if(str.indexOf('{')<0) return _tag(str);
	return str;
}

function _getPH(str){
	var arr = str.split(/\{|\}/g), ret = [];
	
	_.each(arr, function(v, i){
		if(!v){
			ret[i] = '';
		} else if(!isNaN(v)){
			var ph = Zen.frags[v];
			ret[i] = ph? _getPH(ph) : '{'+v+'}';
		} else {
			ret[i] = v;
		}
	});
	return ret.join('');
}
