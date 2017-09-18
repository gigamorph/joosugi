// joosugi v0.3.1-3-ge580d31 built Mon Sep 18 2017 10:44:23 GMT-0400 (EDT)


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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
    key: 'addTag',
    value: function addTag(tag) {
      var resources = this._makeArray(this.oaAnnotation.resource);
      resources.push(this._createTag(tag));
      this.oaAnnotation.resource = resources;
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
    key: '_createTag',
    value: function _createTag(tagString) {
      return {
        '@type': 'oa:Tag',
        chars: tagString
      };
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

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = resources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item['@type'] === "oa:Tag") {
            tags.push(item.chars);
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _annotationWrapper = __webpack_require__(0);

var _annotationWrapper2 = _interopRequireDefault(_annotationWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  logger: { debug: function debug() {}, info: function info() {}, warning: function warning() {}, error: function error() {} },

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

  findAnnotationFromListById: function findAnnotationFromListById(annotationId, annotations) {
    var matched = annotations.filter(function (anno) {
      if (!anno || (typeof anno === 'undefined' ? 'undefined' : _typeof(anno)) !== 'object') {
        logger.error('AnnotationUtil#findAnnotationFromListById invalid annotation', anno);
        return false;
      }
      return anno['@id'] === annotationId;
    });
    if (matched.length > 1) {
      logger.error('AnnotationUtil#findAnnotationFromListById duplicate IDs', matched);
    }
    return matched[0];
  },


  // For an annotation that targets other annotation(s), follow the
  // "on" relations recursively until no more targets are found.
  findTransitiveTargetAnnotations: function findTransitiveTargetAnnotations(annotation, annotationMap) {
    //this.logger.debug('annoUtil.findTransitiveTargetAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
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
    //this.logger.debug('annoUtil.findTransitiveTargetingAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
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

    //this.logger.debug('AnnotationUtil.findTargetAnnotationsOnCanvas anno:', annotation, 'annoMap:', annotationMap);
    var allTargetAnnos = this.findTransitiveTargetAnnotations(annotation, annotationMap);
    return allTargetAnnos.filter(function (anno) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _annotationWrapper2.default)(anno).targets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var target = _step4.value;

          if (_this.targetIsAnnotationOnCanvas(target)) {
            return true;
          }
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

      return false;
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

  findAllAnnotationsForTocNode: function findAllAnnotationsForTocNode(tocNode) {
    var result = [].concat(tocNode.annotations);

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = Object.values(tocNode.childNodes)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var node = _step5.value;

        result = result.concat(this.findAllAnnotationsForTocNode(node));
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

    return result;
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
  }, warning: function warning() {
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

      /**
       * This can be considered the output of parse,
       * while "this.spec" and "annotations" are the input.
       *
       * Each node is an object:
       * {
       *   annotations: [], // annotations that directly belong to this node
       *   canvasAnnotations: [], // annotations that targets a canvas directly
       *   tags: [], // tags for this node
       *   childNodes: AN_OBJECT, // child TOC nodes as a hashmap on tags
       *   isRoot: A_BOOL, // true if the node is the root
       *   isDummy: A_BOOL  // true if the node is just a placeholder for reaching the next level of depth
       * }
       */
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

    this._root = null;

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
      this._root = this._newNode(null, null); // root node
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
      var node = this._root;

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

      return node === this._root ? null : node;
    }
  }, {
    key: 'findNodeForAnnotation',
    value: function findNodeForAnnotation(annotation) {
      return this.getNode.apply(this, annotation.tocTags);
    }
  }, {
    key: 'getNodeFromTags',
    value: function getNodeFromTags(tags) {
      return this.getNode.apply(this, tags);
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
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = node.annotations[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var anno = _step3.value;

            if (anno['@id'] === annotationId) {
              tags = node.tags;
              return true;
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
      var matched = false;

      var annos = node.canvasAnnotations.filter(function (anno) {
        return anno['@id'] === annotation['@id'];
      });
      if (annos.length > 0) {
        return true;
      }

      annos = node.annotations.filter(function (anno) {
        return anno['@id'] === annotation['@id'];
      });
      if (annos.length > 0) {
        return true;
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.values(node.childNodes)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var childNode = _step4.value;

          if (this.matchNode(annotation, childNode)) {
            return true;
          }
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

      return false;
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
      this._visit(this._root, visitCallback, 0);
    }
  }, {
    key: '_visit',
    value: function _visit(node, callback, level) {
      var sortedNodes = Object.values(node.childNodes).sort(function (n0, n1) {
        return n0.weight - n1.weight;
      });

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = sortedNodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var childNode = _step5.value;

          var stop = callback(childNode, level);
          if (!stop) {
            this._visit(childNode, callback, level + 1);
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
    }
  }, {
    key: 'parse',
    value: function parse() {
      this._buildTocTree(this.annotations);
      this._setNodeOrders(this._root);
    }

    // Assign weights to child nodes, recursively

  }, {
    key: '_setNodeOrders',
    value: function _setNodeOrders(node) {
      if (node.childNodes.length === 0) {
        return;
      }

      var pattern = /\d+$/;
      var sortedKeys = Object.keys(node.childNodes).sort(function (tag0, tag1) {
        var num0 = Number(tag0.substring(tag0.match(pattern).index));
        var num1 = Number(tag1.substring(tag1.match(pattern).index));
        return num0 - num1;
      });

      for (var i = 0; i < sortedKeys.length; ++i) {
        var key = sortedKeys[i];
        var childNode = node.childNodes[key];

        childNode.weight = i;
        this._setNodeOrders(childNode);
      }
    }

    /**
     * Build a TOC structure
     * @return An array of annotations that are NOT assigned to a TOC node.
     */

  }, {
    key: '_buildTocTree',
    value: function _buildTocTree(annotations) {
      var remainder = [];

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = annotations[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var annotation = _step6.value;

          var $anno = (0, _annotationWrapper2.default)(annotation);
          var tags = $anno.tags;
          var success = this._buildChildNodes(annotation, tags, 0, this._root);

          if (!success) {
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

    /**
     * Recursively builds the TOC structure.
     * @param {object} annotation Annotation to be assigned to the parent node
     * @param {string[]} tags
     * @param {number} rowIndex Index of this._root
     * @param {object} parent Parent node
     * @return {boolean} true if the annotation was set to be a TOC node, false if not.
     */

  }, {
    key: '_buildChildNodes',
    value: function _buildChildNodes(annotation, tags, rowIndex, parent) {
      //logger.debug('AnnotationToc#_buildChildNodes anno:', annotation, 'tags:', tags, 'depth:', rowIndex, 'parent:', parent);
      var currentNode = null;

      if (rowIndex >= this.spec.generator.length) {
        // all tags matched with no more levels to explore in the TOC structure
        if (parent.isRoot) {
          // Note: the root is not a TOC node
          return false; // generator has no depth
        } else {
          // Assign the annotation to parent (a TOC node)
          annotation.tocTags = parent.tags;
          if (_annotationUtil2.default.hasTargetOnCanvas(annotation)) {
            parent.canvasAnnotations.push(annotation);
          }
          parent.annotations.push(annotation);
          this.annoToNodeMap[annotation['@id']] = parent;
          return true;
        }
      }

      var _getTagForLevel2 = this._getTagForLevel(tags, rowIndex),
          _getTagForLevel3 = _slicedToArray(_getTagForLevel2, 2),
          tag = _getTagForLevel3[0],
          isDummy = _getTagForLevel3[1];

      if (tag) {
        // one of the tags belongs to the corresponding level of tag hierarchy
        if (!parent.childNodes[tag]) {
          parent.childNodes[tag] = this._newNode(tag, parent, isDummy);
        }
        currentNode = parent.childNodes[tag];

        if (parent.isRoot) {
          currentNode.label = this._extractTagNumber(tag);
        } else {
          currentNode.label = parent.label + '.' + this._extractTagNumber(tag);
        }
        return this._buildChildNodes(annotation, tags, rowIndex + 1, currentNode);
      } else {
        // no more match before reaching a leaf node
        if (parent.isRoot) {
          return false;
        } else {
          annotation.tocTags = parent.tags;
          if (_annotationUtil2.default.hasTargetOnCanvas(annotation)) {
            parent.canvasAnnotations.push(annotation);
          }
          parent.annotations.push(annotation);
          this.annoToNodeMap[annotation['@id']] = parent;
          return true;
        }
      }
    }
  }, {
    key: '_getTagForLevel',
    value: function _getTagForLevel(tags, level) {
      //logger.debug('AnnotationToc#_getTagForLevel tags:', tags, 'level:', level);
      var prefix = this.spec.generator[level].tag.prefix;

      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = tags[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var tag = _step7.value;

          var match = tag.match('^' + prefix + '(\\d+)$');
          if (match) {
            var isDummy = match[1] === '0';
            return [tag, isDummy];
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

      return [null, null];
    }
  }, {
    key: '_extractTagNumber',
    value: function _extractTagNumber(tag) {
      return tag.match(/\d+$/)[0];
    }

    /**
     *
     * @param {string} tag
     * @param {object} parent parent node
     * @param {boolean} isDummy true if a placeholder node
     */

  }, {
    key: '_newNode',
    value: function _newNode(tag, parent, isDummy) {
      if (!parent) {
        // root node
        return {
          isRoot: true,
          childNodes: {}
        };
      } else {
        var tags = parent.isRoot ? [tag] : parent.tags.concat([tag]);

        return {
          annotations: [],
          canvasAnnotations: [],
          tags: tags,
          label: '',
          childNodes: {},
          weight: 0, // to define order among nodes at the same level
          isDummy: isDummy
        };
      }
    }

    // For debugging

  }, {
    key: 'print',
    value: function print() {
      var pad = function pad(level) {
        var s = '';
        for (var i = 0; i < level; ++i) {
          s += '  ';
        }
        return s;
      };

      var trim = function trim(s, maxLen, trimFromRight) {
        if (s.length > maxLen) {
          if (trimFromRight) {
            s = '... ' + s.substring(s.length - maxLen + 4);
          } else {
            s = s.substring(0, maxLen - 4) + ' ...';
          }
        }
        return s;
      };

      var t = '';

      this.walk(function (node, level) {
        t += pad(level) + '- [n] ';
        t += String(node.tags);
        t += '\n';
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = node.annotations[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var anno = _step8.value;

            t += pad(level + 1) + '- [a] ';
            var bodyText = (0, _annotationWrapper2.default)(anno).bodyText || '';
            t += trim(bodyText, 60) + '\n';
            var layerId = anno.layerId || '';
            t += pad(level + 1) + '      ' + trim(layerId, 60, true) + '\n';
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
      });

      console.log('TOC:\n' + t);
    }
  }]);

  return AnnotationToc;
}();

exports.default = AnnotationToc;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _annotationWrapper = __webpack_require__(0);

var _annotationWrapper2 = _interopRequireDefault(_annotationWrapper);

var _annotationExplorer = __webpack_require__(4);

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

/***/ }),
/* 4 */
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
    value: function getAnnotations(options) {
      var _this = this;

      //logger.debug('AnnotationExplorer#getAnnotations options:', options);

      if (!options.canvasId) {
        logger.error('AnnotationExplorer#getAnnotations missing options.canvasId');
        return Promise.resolve([]);
      }

      return this.options.dataSource.getAnnotations(options).catch(function (reason) {
        throw 'ERROR AnnotationExplorer#getAnnotations dataSource.getAnnotations failed: ' + reason;
      }).then(function (annotations) {
        logger.debug('AnnotationExplorer#getAnnotations annotations:', annotations);
        _this._generateInverseTargets(annotations);
        return annotations;
      });
    }
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

/***/ })
/******/ ]);