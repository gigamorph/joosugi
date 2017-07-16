// joosugi v0.2.1-8-ga07e3c5 built Sun Jul 16 2017 11:13:24 GMT-0400 (EDT)


/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Anno;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Anno(oaAnnotation) {
  return new Annotation(oaAnnotation);
}

var Annotation = function () {
  function Annotation(oaAnnotation) {
    _classCallCheck(this, Annotation);

    this.oaAnnotation = oaAnnotation;
  }

  _createClass(Annotation, [{
    key: 'hasTags',
    value: function hasTags(tags) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var annoTag = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var tag = _step2.value;

              if (tag === annoTag) {
                return true;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'addTarget',


    /**
     * Add target ("on" attribute) to annotation
     */
    value: function addTarget(target) {
      var anno = this.oaAnnotation;

      anno.on = this._makeArray(anno.on);
      anno.on.push(target);
    }
  }, {
    key: 'addInverseTarget',
    value: function addInverseTarget(annotation) {
      var anno = this.oaAnnotation;

      anno.targetedBy = this._makeArray(anno.targetedBy);
      anno.targetedBy.push(annotation);
    }
  }, {
    key: '_makeArray',
    value: function _makeArray(object) {
      if (typeof object === 'null' || typeof object === 'undefined') {
        return [];
      }
      if (object instanceof Array) {
        return object;
      }
      return [object];
    }
  }, {
    key: '_getTextResource',
    value: function _getTextResource() {
      var resources = this._makeArray(this.oaAnnotation.resource);

      var items = resources.filter(function (item) {
        return item['@type'] === 'dctypes:Text';
      });
      if (items.length > 0) {
        if (items.length > 1) {
          console.log('WARNING Annotation#_getTextResource too many text items:', items.length);
        }
        return items[0];
      } else {
        return null;
      }
    }
  }, {
    key: 'id',
    get: function get() {
      return this.oaAnnotation['@id'];
    }
  }, {
    key: 'layerId',
    get: function get() {
      return this.oaAnnotation.layerId;
    }

    /**
     * @returns {Array} IDs of layers associated with the annotation
     */

  }, {
    key: 'layers',
    get: function get() {
      return this.oaAnnotation.layers;
    }

    /**
     * Returns content of first text (non-tag) resource it finds from the annotation.
     */

  }, {
    key: 'bodyText',
    get: function get() {
      var textResource = this._getTextResource();
      return textResource ? textResource.chars : null;
    },
    set: function set(s) {
      var textResource = this._getTextResource();
      if (textResource) {
        textResource.chars = s;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'bodyStyle',
    get: function get() {
      var textResource = this._getTextResource();
      return textResource ? textResource.style : null;
    }

    /**
     * Is Mirador implementation of tags IIIF non-conforming?
     */

  }, {
    key: 'tags',
    get: function get() {
      var resources = this._makeArray(this.oaAnnotation.resource);
      var tags = [];

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = resources[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;

          if (item['@type'] === "oa:Tag") {
            tags.push(item.chars);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return tags;
    }
  }, {
    key: 'targets',
    get: function get() {
      return this._makeArray(this.oaAnnotation.on);
    }
  }, {
    key: 'targetedBy',
    get: function get() {
      return this._makeArray(this.oaAnnotation.targetedBy);
    }
  }]);

  return Annotation;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _annotationWrapper = __webpack_require__(0);

var _annotationWrapper2 = _interopRequireDefault(_annotationWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  logger: { debug: function debug() {}, info: function info() {}, error: function error() {} },

  setLogger: function setLogger(logger) {
    this.logger = logger;
  },

  /**
   * @param {object} target "on" attribute of an annotation
   * @returns {boolean} true if the target is a canvas fragment, not another annotation
   */
  targetIsAnnotationOnCanvas: function targetIsAnnotationOnCanvas(target) {
    return target['@type'] !== 'oa:Annotation';
  },

  hasTargetOnCanvas: function hasTargetOnCanvas(annotation) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _annotationWrapper2.default)(annotation).targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var target = _step.value;

        if (this.targetIsAnnotationOnCanvas(target)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  },

  hasTags: function hasTags(annotation, tags) {
    var annoTags = this.getTags(annotation);

    for (var i = 0; i < tags.length; ++i) {
      var found = false;
      for (var j = 0; j < annoTags.length; ++j) {
        if (tags[i] === annoTags[j]) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  },

  // For an annotation that targets other annotation(s), follow the
  // "on" relations recursively until no more targets are found.
  findTransitiveTargetAnnotations: function findTransitiveTargetAnnotations(annotation, annotationMap) {
    this.logger.debug('annoUtil.findTransitiveTargetAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
    var $anno = (0, _annotationWrapper2.default)(annotation);
    var targetAnnos = $anno.targets.map(function (target) {
      var annoId = target.full;
      return annotationMap[annoId];
    }).filter(function (anno) {
      return anno !== undefined && anno !== null;
    });

    if (targetAnnos.length === 0) {
      return [];
    }

    var result = targetAnnos;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = targetAnnos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var targetAnno = _step2.value;

        var tempResult = this.findTransitiveTargetAnnotations(targetAnno, annotationMap);
        result = result.concat(tempResult);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return result;
  },

  // For an annotation that targets other annotation(s), follow the
  // "on" relations recursively until no more targets are found.
  findTransitiveTargetingAnnotations: function findTransitiveTargetingAnnotations(annotation, annotationMap) {
    this.logger.debug('annoUtil.findTransitiveTargetingAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
    var $anno = (0, _annotationWrapper2.default)(annotation);
    var targetingAnnos = $anno.targetedBy;

    targetingAnnos = targetingAnnos.filter(function (anno) {
      var annoInMap = annotationMap[anno['@id']];
      return annoInMap !== undefined && annoInMap !== null;
    });

    if (targetingAnnos.length === 0) {
      return [];
    }
    var result = targetingAnnos;

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = targetingAnnos[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var targetingAnno = _step3.value;

        var tempResult = this.findTransitiveTargetingAnnotations(targetingAnno, annotationMap);
        result = result.concat(tempResult);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return result;
  },

  findTargetAnnotationsOnCanvas: function findTargetAnnotationsOnCanvas(annotation, annotationMap) {
    var _this = this;

    var allTargetAnnos = this.findTransitiveTargetAnnotations(annotation, annotationMap);
    return allTargetAnnos.filter(function (anno) {
      return _this.targetIsAnnotationOnCanvas(anno);
    });
  },

  /**
   * Find annotations from "annotationsList" that belong to the same TOC node
   * and which belong to the layer with "layerId".
   */
  findTocSiblings: function findTocSiblings(annotation, annotationsList, layerId, toc) {
    var node = toc.findNodeForAnnotation(annotation);
    if (!node) {
      return [];
    }
    return annotationsList.filter(function (currentAnno) {
      return currentAnno.layerId === layerId && toc.findNodeForAnnotation(currentAnno) === node;
    });
  },

  /**
   * XXX this version of mergeTargets will probably have to be removed
   * because SVG to SVG merge will likely turn out to be illegal against
   * the IIIF spec. The selector SVG of a target should always contains
   * a single path and if multiple targets exist for an annotation,
   * the "on" field should be an array of targets.
   *
   * Merge annotation's target ("on" attribute) with a new "on" attribute (sourceTarget).
   */
  mergeTargetsOld: function mergeTargetsOld(annotation, sourceTarget) {
    var destTarget = annotation.on;
    var destCanvasId = destTarget.full;
    var sourceCanvasId = sourceTarget.full;

    if (destTarget instanceof Array) {
      // (destination) annotation has (possibly) multiple targets
      var targetsWithSameCanvasId = destTarget.filter(function (on) {
        return on.full === sourceCanvasId;
      });
      if (targetsWithSameCanvasId.length === 1) {
        // there's a destination target on the same canvas as the source target
        var target = targetsWithSameCanvasId[0];
        target.selector.value = svgUtil.mergeSvgs(target.selector.value, sourceTarget.selector.value);
      } else if (targetsWithSameCanvasId.length === 0) {
        // there's no existing target on the same canvas
        annotation.on.push(sourceTarget);
      } else {
        throw 'multiple targets on same canvas';
      }
    } else {
      // (destination) annotation has a single target
      var destTargetId = destTarget.full;
      if (destCanvasId === sourceCanvasId) {
        destTarget.selector.value = svgUtil.mergeSvgs(destTarget.selector.value, sourceTarget.selector.value);
      } else {
        annotation.on = [destTarget, sourceTarget];
      }
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _annotationWrapper = __webpack_require__(0);

var _annotationWrapper2 = _interopRequireDefault(_annotationWrapper);

var _annotationUtil = __webpack_require__(1);

var _annotationUtil2 = _interopRequireDefault(_annotationUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = { debug: function debug() {
    return null;
  }, info: function info() {
    return null;
  }, error: function error() {
    return null;
  } };

/**
 * A tag based table-of-contents structure for annotations.
 *
 * Builds a structure (annoHiercrchy) of annotations
 * so they can be accessed and manipulated
 * according to the pre-defined TOC tags hierarchy (spec).
 */

var AnnotationToc = function () {
  function AnnotationToc(spec, annotations, options) {
    _classCallCheck(this, AnnotationToc);

    this.options = Object.assign({
      logger: null
    }, options || {});

    if (this.options.logger) {
      logger = this.options.logger;
    }

    /*
     * Spec is a JSON passed from outside (an array of arrays).
     * It defines the tags to be used to define the hiearchy.
     * It is different from "ranges" because
     * it is used to define a strucutre of annotations in a single canvas
     * while ranges are used to define a structure of canvases in a sequence.
     * For example, the first array could list tags for sections of a story
     * and the second one could list tags for sub-sections.
     */
    this.spec = spec;

    this.annotations = annotations;
    this._annoMap = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = annotations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var anno = _step.value;

        this._annoMap[anno['@id']] = anno;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.tagWeights = {}; // for sorting

    /**
     * This can be considered the output of parse,
     * while "this.spec" and "annotations" are the input.
     *
     * Each node is an object:
     * {
     *   spec: AN_OBJECT, // spec object from this.spec, with label, short, tag attributes
     *   annotation: AN_OBJECT, // annotation
     *   layerIds: A_SET, // set of layer IDs for annotations that belong to this node or its children
     *   cumulativeLabel: A_STRING, // concatenation of short labels inherited from the parent nodes
     *   cumulativeTags: [], // list of tags for this node and its ancestors
     *   childNodes: AN_OBJECT, // child TOC nodes as a hashmap on tags
     *   childAnnotations: AN_ARRAY, // non-TOC-node annotations that targets this node
     *   isRoot: A_BOOL, // true if the node is the root
     *   weight: A_NUMBER // for sorting
     * }
     */
    this.annoHierarchy = null;

    /**
     * Annotations that do not belong to the ToC structure.
     */
    this._unassigned = [];

    this.annoToNodeMap = {}; // key: annotation ID, value: node in annoHierarchy;
    this.init();
  }

  _createClass(AnnotationToc, [{
    key: 'init',
    value: function init(annotations) {
      logger.debug('AnnotationToc#init spec: ', this.spec);

      this.annoHierarchy = this.newNode(null, null); // root node

      this.initTagWeights();
      this.parse(this.annotations);
    }

    /**
     * Find the node corresponding to the sequence of tags.
     * @param {...string} tags
     * @returns {object} a TOC node
     */

  }, {
    key: 'getNode',
    value: function getNode() {
      var tags = Array.from(arguments);
      var node = this.annoHierarchy;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = tags[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var tag = _step2.value;

          if (!node) {
            break;
          }
          node = node.childNodes[tag];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return node === this.annoHierarchy ? null : node;
    }
  }, {
    key: 'findNodeForAnnotation',
    value: function findNodeForAnnotation(annotation) {
      var targetAnno = this._findFinalTargetAnnotationsOnCanvas(annotation);
      return targetAnno ? this.annoToNodeMap[targetAnno['@id']] : null;
    }

    /**
     * Assign weights to tags according to their position in the array.
     */

  }, {
    key: 'initTagWeights',
    value: function initTagWeights() {
      var _this = this;
      //jQuery.each(this.spec.nodeSpecs, function(rowIndex, row) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.spec.nodeSpecs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var row = _step3.value;

          //jQuery.each(row, function(index, nodeSpec) {
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = row.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var _step4$value = _slicedToArray(_step4.value, 2),
                  index = _step4$value[0],
                  nodeSpec = _step4$value[1];

              _this.tagWeights[nodeSpec.tag] = index;
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'parse',
    value: function parse() {
      // First pass
      var remainingAnnotations = this.addTaggedAnnotations(this.annotations);
      // Second pass
      this.addRemainingAnnotations(remainingAnnotations);
    }

    /**
     * Build a TOC structure
     * @return An array of annotations that are NOT assigned to a TOC node.
     */

  }, {
    key: 'addTaggedAnnotations',
    value: function addTaggedAnnotations(annotations) {
      var _this = this;
      var remainder = [];

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = annotations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var annotation = _step5.value;

          var $anno = (0, _annotationWrapper2.default)(annotation);
          var tags = $anno.tags;
          var success = _this.buildChildNodes(annotation, tags, 0, _this.annoHierarchy);

          if (!success) {
            remainder.push(annotation);
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return remainder;
    }
  }, {
    key: 'addRemainingAnnotations',
    value: function addRemainingAnnotations(annotations) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = annotations[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var annotation = _step6.value;

          var targetAnno = this._findFinalTargetAnnotationOnCanvas(annotation);
          if (targetAnno) {
            var node = this.annoToNodeMap[targetAnno['@id']];
            if (targetAnno && node) {
              node.childAnnotations.push(annotation);
              this.registerLayerWithNode(node, annotation.layerId);
            } else {
              logger.error('AnnotationToc#addRemainingAnnotations not covered by ToC');
              this._unassigned.push(annotation);
            }
          } else {
            logger.error('AnnotationToc#addRemainingAnnotations orphan', annotation);
            this._unassigned.push(annotation);
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    }
  }, {
    key: '_findFinalTargetAnnotationOnCanvas',
    value: function _findFinalTargetAnnotationOnCanvas(annotation) {
      var annos = _annotationUtil2.default.findTargetAnnotationsOnCanvas(annotation, this._annoMap);
      if (annos.length > 1) {
        logger.warning('AnnotationToc#_findFinalTargetAnnotationOnCanvas foudn more than one targets:', annos);
      }
      return annos[0];
    }

    /**
     * Recursively builds the TOC structure.
     * @param {object} annotation Annotation to be assigned to the parent node
     * @param {string[]} tags
     * @param {number} rowIndex Index of this.annoHierarchy
     * @param {object} parent Parent node
     * @return {boolean} true if the annotation was set to be a TOC node, false if not.
     */

  }, {
    key: 'buildChildNodes',
    value: function buildChildNodes(annotation, tags, rowIndex, parent) {
      var currentNode = null;

      if (rowIndex >= this.spec.nodeSpecs.length) {
        // no more levels to explore in the TOC structure
        if (parent.isRoot) {
          // The root is not a TOC node
          return false;
        } else {
          // Assign the annotation to parent (a TOC node)
          parent.annotation = annotation;
          this.annoToNodeMap[annotation['@id']] = parent;
          this.registerLayerWithNode(parent, annotation.layerId);
          return true;
        }
      }

      var nodeSpec = this.tagInSpecs(tags, this.spec.nodeSpecs[rowIndex]);

      if (nodeSpec) {
        // one of the tags belongs to the corresponding level of the pre-defined tag hierarchy
        var tag = nodeSpec.tag;
        var annoHierarchy = this.annoHierarchy;

        if (!parent.childNodes[tag]) {
          parent.childNodes[tag] = this.newNode(nodeSpec, parent);
        }

        currentNode = parent.childNodes[tag];

        if (parent.isRoot) {
          currentNode.cumulativeLabel = currentNode.spec.short;
        } else {
          currentNode.cumulativeLabel = parent.cumulativeLabel + this.spec.shortLabelSeparator + currentNode.spec.short;
        }
        return this.buildChildNodes(annotation, tags, rowIndex + 1, currentNode);
      } else {
        // no matching tags so far
        if (parent.isRoot) {
          return false;
        } else {
          parent.annotation = annotation;
          this.registerLayerWithNode(parent, annotation.layerId);
          this.annoToNodeMap[annotation['@id']] = parent;
          return true;
        }
      }
    }

    /**
     * A tag object is an object in this.tagHierarcy that represents a tag.
     *
     * @param {string[]} tags List of tags
     * @param {object[]} nodeSpecs List of node specs
     * @return {object} The "node spec" object if one of the objects in nodeSpecs represents one of the tags; null if not.
     */

  }, {
    key: 'tagInSpecs',
    value: function tagInSpecs(tags, nodeSpecs) {
      var match = null;
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = tags[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var tag = _step7.value;
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = nodeSpecs[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var nodeSpec = _step8.value;

              if (tag === nodeSpec.tag) {
                match = nodeSpec;
                break;
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }

          if (match) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7.return) {
            _iterator7.return();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      return match;
    }
  }, {
    key: 'newNode',
    value: function newNode(nodeSpec, parent) {
      if (!parent) {
        // root node
        return {
          isRoot: true,
          childNodes: {}
        };
      } else {
        var tags = parent.isRoot ? [nodeSpec.tag] : parent.cumulativeTags.concat([nodeSpec.tag]);
        return {
          spec: nodeSpec,
          annotation: null,
          layerIds: new Set(),
          cumulativeLabel: '',
          cumulativeTags: tags,
          childNodes: {},
          childAnnotations: [],
          weight: this.tagWeights[nodeSpec.tag]
        };
      }
    }
  }, {
    key: 'getNodeFromTags',
    value: function getNodeFromTags(tags) {
      var node = this.annoHierarchy;

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = tags[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var tag = _step9.value;

          node = node.childNodes[tag];
          if (!node) {
            break;
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9.return) {
            _iterator9.return();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return !node || node.isRoot ? null : node;
    }

    /**
     * Return an array of tags for the node to which the annotation belongs
     * @param {string} annotationId
     */

  }, {
    key: 'getTagsFromAnnotationId',
    value: function getTagsFromAnnotationId(annotationId) {
      var tags = [];

      this.walk(function (node) {
        var annotations = (node.annotation ? [node.annotation] : []).concat(node.childAnnotations);

        var _iteratorNormalCompletion10 = true;
        var _didIteratorError10 = false;
        var _iteratorError10 = undefined;

        try {
          for (var _iterator10 = annotations[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
            var anno = _step10.value;

            if (anno['@id'] === annotationId) {
              tags = node.cumulativeTags;
              return true;
            }
          }
        } catch (err) {
          _didIteratorError10 = true;
          _iteratorError10 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion10 && _iterator10.return) {
              _iterator10.return();
            }
          } finally {
            if (_didIteratorError10) {
              throw _iteratorError10;
            }
          }
        }
      });
      return tags;
    }

    /**
     * @param {object} annotation
     * @param {string[]} tags
     */

  }, {
    key: 'matchHierarchy',
    value: function matchHierarchy(annotation, tags) {
      var node = this.getNodeFromTags(tags);
      return node ? this.matchNode(annotation, node) : false;
    }
  }, {
    key: 'matchNode',
    value: function matchNode(annotation, node) {
      var _this = this;
      var matched = false;

      if (!node.annotation) {
        logger.error('AnnotationToc#matchNode no annotation assigned to node', node.spec);
      }

      if (node.annotation && node.annotation['@id'] === annotation['@id']) {
        return true;
      }
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = node.childAnnotations[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var anno = _step11.value;

          if (anno['@id'] === annotation['@id']) {
            matched = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11.return) {
            _iterator11.return();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = Object.values(node.childNodes)[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var childNode = _step12.value;

          if (_this.matchNode(annotation, childNode)) {
            matched = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12.return) {
            _iterator12.return();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }

      return matched;
    }
  }, {
    key: 'registerLayerWithNode',
    value: function registerLayerWithNode(node, layerId) {
      node.layerIds.add(layerId);
    }
  }, {
    key: 'unassigned',
    value: function unassigned() {
      return this._unassigned;
    }
  }, {
    key: 'numUnassigned',
    value: function numUnassigned() {
      return this._unassigned.length;
    }

    /**
     * Traverses the Toc structure and calls visitCallback() for each node.
     * @param {function} visitCallback
     */

  }, {
    key: 'walk',
    value: function walk(visitCallback) {
      this.visit(this.annoHierarchy, visitCallback);
    }
  }, {
    key: 'visit',
    value: function visit(node, callback) {
      var _this = this;
      var sortedTags = Object.keys(node.childNodes).sort(function (a, b) {
        return _this.tagWeights[a] - _this.tagWeights[b];
      });

      var _iteratorNormalCompletion13 = true;
      var _didIteratorError13 = false;
      var _iteratorError13 = undefined;

      try {
        for (var _iterator13 = sortedTags[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
          var tag = _step13.value;

          var childNode = node.childNodes[tag];
          var stop = callback(childNode);
          if (!stop) {
            _this.visit(childNode, callback);
          }
        }
      } catch (err) {
        _didIteratorError13 = true;
        _iteratorError13 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion13 && _iterator13.return) {
            _iterator13.return();
          }
        } finally {
          if (_didIteratorError13) {
            throw _iteratorError13;
          }
        }
      }
    }
  }]);

  return AnnotationToc;
}();

exports.default = AnnotationToc;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _annotationWrapper = __webpack_require__(0);

var _annotationWrapper2 = _interopRequireDefault(_annotationWrapper);

var _annotationToc = __webpack_require__(2);

var _annotationToc2 = _interopRequireDefault(_annotationToc);

var _annotationUtil = __webpack_require__(1);

var _annotationUtil2 = _interopRequireDefault(_annotationUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = null;

var AnnotationExplorer = function () {
  function AnnotationExplorer(options) {
    _classCallCheck(this, AnnotationExplorer);

    this.options = jQuery.extend({
      dataSource: null,
      tocSpec: null,
      logger: { debug: function debug() {
          return null;
        }, info: function info() {
          return null;
        }, error: function error() {
          return null;
        } }
    }, options);
    logger = this.options.logger;
    logger.debug('AnnotationExplorer#constructor options:', options);
    this.AnnotationToc = null;
  }

  _createClass(AnnotationExplorer, [{
    key: 'getLayers',
    value: function getLayers() {
      return this.options.dataSource.getLayers();
    }

    /**
     * Options: {
     *   canvasId: <string>, // required
     *   layerId: <string> // optional
     * }
     *
     * @param {object} options
     */

  }, {
    key: 'getAnnotations',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(options) {
        var annotations;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                logger.debug('AnnotationExplorer#getAnnotations options:', options);
                _context.next = 3;
                return this.options.dataSource.getAnnotations(options);

              case 3:
                annotations = _context.sent;

                this._generateInverseTargets(annotations);
                logger.debug('AnnotationExplorer#getAnnotations annotations:', annotations);
                return _context.abrupt('return', annotations);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAnnotations(_x) {
        return _ref.apply(this, arguments);
      }

      return getAnnotations;
    }()
  }, {
    key: 'createAnnotation',
    value: function createAnnotation(annotation) {
      return this.options.dataSource.createAnnotation(annotation);
    }
  }, {
    key: 'updateAnnotation',
    value: function updateAnnotation(annotation) {
      return this.options.dataSource.updateAnnotation(annotation);
    }
  }, {
    key: 'deleteAnnotation',
    value: function deleteAnnotation(annotationId) {
      logger.debug('AnnotationExplorer#deleteAnnotation annotationId:', annotationId);
      var promise = this.options.dataSource.deleteAnnotation(annotationId);
      return promise;
    }
  }, {
    key: 'updateAnnotationListOrder',
    value: function updateAnnotationListOrder(canvasId, layerId, annoIds) {
      logger.debug('AnnotationExplorer#updateAnnotationListOrder');
      return this.options.dataSource.updateAnnotationListOrder(canvasId, layerId, annoIds);
    }
  }, {
    key: 'getAnnotationToc',
    value: function getAnnotationToc() {
      return this.annotationToc;
    }
  }, {
    key: 'reloadAnnotationToc',
    value: function reloadAnnotationToc(spec, annotations) {
      this.annotationToc = new _annotationToc2.default(spec, annotations);
      logger.debug('AnnotationExplorer#reloadAnnotationToc toc:', this.annotationToc.annoHierarchy);
    }
  }, {
    key: '_generateInverseTargets',
    value: function _generateInverseTargets(annotations) {
      var annoMap = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = annotations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var anno = _step.value;

          annoMap[anno['@id']] = (0, _annotationWrapper2.default)(anno);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = annotations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _anno = _step2.value;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _annotationWrapper2.default)(_anno).targets[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var target = _step3.value;

              var targetId = target.full;
              if (annoMap[targetId]) {
                annoMap[targetId].addInverseTarget(_anno);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return AnnotationExplorer;
}();

exports.default = AnnotationExplorer;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _annotationWrapper = __webpack_require__(0);

var _annotationWrapper2 = _interopRequireDefault(_annotationWrapper);

var _annotationExplorer = __webpack_require__(3);

var _annotationExplorer2 = _interopRequireDefault(_annotationExplorer);

var _annotationToc = __webpack_require__(2);

var _annotationToc2 = _interopRequireDefault(_annotationToc);

var _annotationUtil = __webpack_require__(1);

var _annotationUtil2 = _interopRequireDefault(_annotationUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.joosugi = {
  AnnotationExplorer: _annotationExplorer2.default,
  AnnotationToc: _annotationToc2.default,
  AnnotationWrapper: _annotationWrapper2.default,
  annotationUtil: _annotationUtil2.default
};

/***/ })
/******/ ]);