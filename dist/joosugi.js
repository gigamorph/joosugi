// Joosugi version 0.1.0
// Build: Tue Jan 24 2017 13:02:49 GMT-0500 (EST)

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _annotationToc = __webpack_require__(1);

	var _annotationToc2 = _interopRequireDefault(_annotationToc);

	var _annotationExplorer = __webpack_require__(3);

	var _annotationExplorer2 = _interopRequireDefault(_annotationExplorer);

	var _annotationUtil = __webpack_require__(2);

	var _annotationUtil2 = _interopRequireDefault(_annotationUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.joosugi = {
	  AnnotationExplorer: _annotationExplorer2.default,
	  AnnotationToc: _annotationToc2.default,
	  annotationUtil: _annotationUtil2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _annotationUtil = __webpack_require__(2);

	var _annotationUtil2 = _interopRequireDefault(_annotationUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * A tag based table-of-contents structure for annotations.
	 *
	 * Builds a structure (annoHiercrchy) of annotations
	 * so they can be accessed and manipulated
	 * according to the pre-defined TOC tags hierarchy (spec).
	 */
	var AnnotationToc = function () {
	  function AnnotationToc(spec, annotations) {
	    _classCallCheck(this, AnnotationToc);

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
	      console.log('Toc#init spec: ' + this.spec);
	      console.dir(this.spec);

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

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var tag = _step.value;

	          if (!node) {
	            break;
	          }
	          node = node.childNodes[tag];
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

	      return node === this.annoHierarchy ? null : node;
	    }
	  }, {
	    key: 'findNodeForAnnotation',
	    value: function findNodeForAnnotation(annotation) {
	      var targetAnno = _annotationUtil2.default.findFinalTargetAnnotation(annotation, this.annotations);
	      return targetAnno ? this.annoToNodeMap[targetAnno['@id']] : null;
	    }

	    /**
	     * Assign weights to tags according to their position in the array.
	     */

	  }, {
	    key: 'initTagWeights',
	    value: function initTagWeights() {
	      var _this = this;
	      jQuery.each(this.spec.nodeSpecs, function (rowIndex, row) {
	        jQuery.each(row, function (index, nodeSpec) {
	          _this.tagWeights[nodeSpec.tag] = index;
	        });
	      });
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

	      jQuery.each(annotations, function (index, annotation) {
	        var tags = _annotationUtil2.default.getTags(annotation);
	        var success = _this.buildChildNodes(annotation, tags, 0, _this.annoHierarchy);
	        if (!success) {
	          remainder.push(annotation);
	        }
	      });
	      return remainder;
	    }
	  }, {
	    key: 'addRemainingAnnotations',
	    value: function addRemainingAnnotations(annotations) {
	      var _this = this;
	      jQuery.each(annotations, function (index, annotation) {
	        var targetAnno = _annotationUtil2.default.findFinalTargetAnnotation(annotation, _this.annotations);
	        if (targetAnno) {
	          var node = _this.annoToNodeMap[targetAnno['@id']];
	          if (targetAnno && node) {
	            node.childAnnotations.push(annotation);
	            _this.registerLayerWithNode(node, annotation.layerId);
	          } else {
	            console.log('WARNING Toc#addRemainingAnnotations not covered by ToC');
	            _this._unassigned.push(annotation);
	          }
	        } else {
	          console.log('WARNING Toc#addRemainingAnnotations orphan');
	          console.dir(annotation);
	          _this._unassigned.push(annotation);
	        }
	      });
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
	      //console.log('ParsedAnnotations#buildNode rowIndex: ' + rowIndex + ', anno:');
	      //console.dir(annotation);

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
	      jQuery.each(tags, function (index, tag) {
	        jQuery.each(nodeSpecs, function (listIndex, nodeSpec) {
	          if (tag === nodeSpec.tag) {
	            match = nodeSpec;
	            return false;
	          }
	        });
	        if (match) {
	          return false;
	        }
	      });
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

	      jQuery.each(tags, function (index, tag) {
	        node = node.childNodes[tag];
	        if (!node) {
	          return false;
	        }
	      });
	      return node;
	    }
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

	      //console.log('Node: ');
	      //console.dir(node);

	      if (node.annotation['@id'] === annotation['@id']) {
	        return true;
	      }
	      jQuery.each(node.childAnnotations, function (index, value) {
	        if (value['@id'] === annotation['@id']) {
	          matched = true;
	          return false;
	        }
	      });
	      jQuery.each(node.childNodes, function (index, childNode) {
	        if (_this.matchNode(annotation, childNode)) {
	          matched = true;
	          return false;
	        }
	      });
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

	      jQuery.each(sortedTags, function (index, tag) {
	        var childNode = node.childNodes[tag];
	        callback(childNode);
	        _this.visit(childNode, callback);
	      });
	    }
	  }]);

	  return AnnotationToc;
	}();

	exports.default = AnnotationToc;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = {

	  /**
	   * @returns {Array} IDs of layers associated with the annotation
	   */
	  getLayers: function getLayers(annotation) {
	    var layers = annotation.layer || annotation.layerId; //TODO remove layerId after refactoring yale-mirador
	    return layers instanceof Array ? layers : [layers];
	  },

	  /**
	   * @returns {boolean} true if the annotation targets a canvas fragment, not another annotation.
	   */
	  isAnnoOnCanvas: function isAnnoOnCanvas(annotation) {
	    return annotation.on['@type'] !== 'oa:Annotation';
	  },

	  /**
	   * Returns content of first text (non-tag) resource it finds from the annotation.
	   */
	  getText: function getText(annotation) {
	    var content = null;
	    var resource = annotation.resource;

	    if (!(resource instanceof Array || (typeof resource === 'undefined' ? 'undefined' : _typeof(resource)) === 'object')) {
	      return null;
	    }
	    if (!(resource instanceof Array)) {
	      resource = [resource];
	    }
	    jQuery.each(resource, function (index, value) {
	      if (value['@type'] === 'dctypes:Text') {
	        content = value.chars;
	        return false;
	      }
	    });
	    return content;
	  },

	  getTags: function getTags(annotation) {
	    var tags = [];

	    if (jQuery.isArray(annotation.resource)) {
	      jQuery.each(annotation.resource, function (index, value) {
	        if (value['@type'] === "oa:Tag") {
	          tags.push(value.chars);
	        }
	      });
	    }
	    return tags;
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

	  getTargetSelectorValue: function getTargetSelectorValue(annotation) {
	    var selector = annotation.on.selector;
	    return selector ? selector.value : null;
	  },

	  // For an annotation of annotation,
	  // follow the "on" relation until the eventual target annotation if found.
	  findFinalTargetAnnotation: function findFinalTargetAnnotation(annotation, annotations) {
	    var nextId = '';
	    var nextAnno = annotation;
	    var targetAnno = annotation;

	    while (nextAnno) {
	      //console.log('nextAnno: ');
	      //console.dir(nextAnno);

	      if (nextAnno.on['@type'] === 'oa:Annotation') {
	        nextId = nextAnno.on.full;
	        nextAnno = null;
	        jQuery.each(annotations, function (index, anno) {
	          if (anno['@id'] === nextId) {
	            targetAnno = anno;
	            nextAnno = anno;
	            return false;
	          }
	        });
	      } else {
	        nextAnno = null;
	      }
	    }
	    return targetAnno;
	  },

	  findTargetAnnotation: function findTargetAnnotation(annotation, annotations) {
	    var nextId = '';
	    var nextAnno = annotation;
	    var targetAnno = annotation;

	    while (nextAnno) {
	      //console.log('nextAnno: ');
	      //console.dir(nextAnno);

	      if (nextAnno.on['@type'] === 'oa:Annotation') {
	        nextId = nextAnno.on.full;
	        nextAnno = null;
	        jQuery.each(annotations, function (index, anno) {
	          if (anno['@id'] === nextId) {
	            targetAnno = anno;
	            nextAnno = anno;
	            return false;
	          }
	        });
	      } else {
	        nextAnno = null;
	      }
	    }
	    return targetAnno;
	  },

	  getTargetCanvasIds: function getTargetCanvasIds(annotation, options) {
	    var canvasIds = [];
	    var targetAnno = null;

	    if (annotation.on['@type'] === 'oa:Annotation') {
	      targetAnno = this.findFinalTargetAnnotation(annotation, options.annotations);
	    } else {
	      targetAnno = annotation;
	    }
	    if (!targetAnno) {
	      return [];
	    }
	    var targets = targetAnno.on;
	    if (targets instanceof Array) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var target = _step.value;

	          if (target.full) {
	            canvasIds.push(target.full);
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
	    } else if ((typeof targets === 'undefined' ? 'undefined' : _typeof(targets)) === 'object') {
	      if (targets.full) {
	        canvasIds.push(targets.full);
	      }
	    } else {
	      console.log('ERROR annoUtil.getFinalTargetCanvasIds: wrong target type ' + (typeof targets === 'undefined' ? 'undefined' : _typeof(targets)));
	    }
	    return canvasIds;
	  },


	  /**
	   * Find annotations from "annotationsList" which this "annotation" annotates 
	   * and which belong to the layer with "layerId".
	   */
	  findTargetAnnotations: function findTargetAnnotations(annotation, annotationsList, layerId) {
	    var targetId = annotation.on.full;
	    return annotationsList.filter(function (currentAnno) {
	      return currentAnno.layerId === layerId && currentAnno['@id'] === targetId;
	    });
	  },

	  /**
	   * Find annotations from "annotationsList" which annotates this "annotation"
	   * and which belong to the layer with "layerId".
	   */
	  findTargetingAnnotations: function findTargetingAnnotations(annotation, annotationsList, layerId) {
	    return annotationsList.filter(function (currentAnno) {
	      var targetId = currentAnno.on.full;
	      return currentAnno.layerId === layerId && annotation['@id'] === targetId;
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
	   * Add target ("on" attribute) to annotation
	   */
	  addTarget: function addTarget(annotation, target) {
	    if (annotation.on) {
	      if (annotation.on instanceof Array) {
	        annotation.on.push(target);
	      } else {
	        annotation.on = [annotation.on, target];
	      }
	    } else {
	      annotation.on = [target];
	    }
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _annotationToc = __webpack_require__(1);

	var _annotationToc2 = _interopRequireDefault(_annotationToc);

	var _annotationUtil = __webpack_require__(2);

	var _annotationUtil2 = _interopRequireDefault(_annotationUtil);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AnnotationExplorer = function () {
	  function AnnotationExplorer(options) {
	    _classCallCheck(this, AnnotationExplorer);

	    this.options = jQuery.extend({
	      dataSource: null,
	      tocSpec: null
	    }, options);
	  }

	  _createClass(AnnotationExplorer, [{
	    key: 'getLayers',
	    value: function getLayers() {
	      return this.options.dataSource.getLayers();
	    }
	  }, {
	    key: 'getAnnotations',
	    value: function getAnnotations(options) {
	      console.log('AnnotationExplorer#getAnnotations options:', options);
	      return this.options.dataSource.getAnnotations(options);
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
	    value: function deleteAnnotation(annotation) {
	      return this.options.dataSource.deleteAnnotation(annotation);
	    }
	  }, {
	    key: 'updateAnnotationListOrder',
	    value: function updateAnnotationListOrder(canvasId, layerId, annoIds) {
	      console.log('AnnotationExplorer#updateAnnotationListOrder');
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
	      console.log('AnnotationExplorer#reloadAnnotationToc toc:', this.annotationToc.annoHierarchy);
	    }
	  }]);

	  return AnnotationExplorer;
	}();

	exports.default = AnnotationExplorer;

/***/ }
/******/ ]);