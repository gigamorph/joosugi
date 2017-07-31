import Anno from './annotation-wrapper';
import annoUtil from './annotation-util';

let logger = { debug: () => null, info: () => null, warning: () => null, error: () => null };

/**
 * A tag based table-of-contents structure for annotations.
 *
 * Builds a structure (annoHiercrchy) of annotations
 * so they can be accessed and manipulated
 * according to the pre-defined TOC tags hierarchy (spec).
 */
export default class AnnotationToc {
  constructor(spec, annotations, options) {
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
    for (let anno of annotations) {
      this._annoMap[anno['@id']] = anno;
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

  init(annotations) {
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
  getNode() {
    const tags = Array.from(arguments);
    let node = this.annoHierarchy;

    for (let tag of tags) {
      if (!node) {
        break;
      }
      node = node.childNodes[tag];
    }
    return (node === this.annoHierarchy) ? null : node;
  }

  findNodeForAnnotation(annotation) {
    const targetAnno = this._findFinalTargetAnnotationOnCanvas(annotation);
    return targetAnno ? this.annoToNodeMap[targetAnno['@id']] : null;
  }

  /**
   * Assign weights to tags according to their position in the array.
   */
  initTagWeights() {
    var _this = this;
    //jQuery.each(this.spec.nodeSpecs, function(rowIndex, row) {
    for (let row of this.spec.nodeSpecs) {
      //jQuery.each(row, function(index, nodeSpec) {
      for (let [index, nodeSpec] of row.entries()) {
        _this.tagWeights[nodeSpec.tag] = index;
      }
    }
  }

  parse() {
    // First pass
    var remainingAnnotations = this.addTaggedAnnotations(this.annotations);

    // Second pass
    this.addRemainingAnnotations(remainingAnnotations);

    // Third pass
    this.processOrdering();
  }

  /**
   * Build a TOC structure
   * @return An array of annotations that are NOT assigned to a TOC node.
   */
  addTaggedAnnotations(annotations) {
    var _this = this;
    var remainder = [];

    for (let annotation of annotations) {
      const $anno = Anno(annotation);
      var tags = $anno.tags;
      var success = _this.buildChildNodes(annotation, tags, 0, _this.annoHierarchy);

      if (!success) {
        remainder.push(annotation);
      }
    }
    return remainder;
  }

  /**
   * Assign remaining (non-node) annotations to correct toc nodes.
   *
   * @param {object[]} annotations
   */
  addRemainingAnnotations(annotations) {
    for (let annotation of annotations) {
      let targetAnno = this._findFinalTargetAnnotationOnCanvas(annotation);

      if (targetAnno) {
        let node = this.annoToNodeMap[targetAnno['@id']];
        if (targetAnno && node) {
          annotation.tocTags = node.cumulativeTags; // XXX
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
  }

  /**
   * Assign paragraph numbers (tags) to  annotations
   */
  processOrdering() {
    this.walk((node) => {
      const annotations = node.childAnnotations;
      const counts = {};

      for (let anno of annotations) {
        let $anno = Anno(anno);
        let layerId = $anno.layerId;
        if (counts[layerId] === undefined) {
          counts[layerId] = 0;
        }
        let count = ++counts[layerId];
        $anno.addTag('p' + count);
      }
    });
  }

  _findFinalTargetAnnotationOnCanvas(annotation) {
    const annos = annoUtil.findTargetAnnotationsOnCanvas(annotation, this._annoMap);
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
  buildChildNodes(annotation, tags, rowIndex, parent) {
    var currentNode = null;

    if (rowIndex >= this.spec.nodeSpecs.length) { // no more levels to explore in the TOC structure
      if (parent.isRoot) { // The root is not a TOC node
        return false;
      } else { // Assign the annotation to parent (a TOC node)
        parent.annotation = annotation;
        parent.annotation.tocTags = parent.cumulativeTags; // XXX
        this.annoToNodeMap[annotation['@id']] = parent;
        this.registerLayerWithNode(parent, annotation.layerId);
        return true;
      }
    }

    var nodeSpec = this.tagInSpecs(tags, this.spec.nodeSpecs[rowIndex]);

    if (nodeSpec) { // one of the tags belongs to the corresponding level of the pre-defined tag hierarchy
      var tag = nodeSpec.tag;
      var annoHierarchy = this.annoHierarchy;

      if (!parent.childNodes[tag]) {
        parent.childNodes[tag] = this.newNode(nodeSpec, parent);
      }

      currentNode = parent.childNodes[tag];

      if (parent.isRoot) {
        currentNode.cumulativeLabel = currentNode.spec.short;
      } else {
        currentNode.cumulativeLabel = parent.cumulativeLabel +
          this.spec.shortLabelSeparator + currentNode.spec.short;
      }
      return this.buildChildNodes(annotation, tags, rowIndex+1, currentNode);
    } else { // no matching tags so far
      if (parent.isRoot) {
        return false;
      } else {
        parent.annotation = annotation;
        parent.annotation.tocTags = parent.cumulativeTags; // XXX
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
  tagInSpecs(tags, nodeSpecs) {
    var match = null;
    for (let tag of tags) {
      for (let nodeSpec of nodeSpecs) {
        if (tag === nodeSpec.tag) {
          match = nodeSpec;
          break;
        }
      }
      if (match) {
        break;
      }
    }
    return match;
  }

  newNode(nodeSpec, parent) {
    if (!parent) { // root node
      return {
        isRoot: true,
        childNodes: {}
      };
    } else {
      const tags = parent.isRoot ? [nodeSpec.tag] :
        parent.cumulativeTags.concat([nodeSpec.tag]);
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

  getNodeFromTags(tags) {
    var node = this.annoHierarchy;

    for (let tag of tags) {
      console.log('TAG', tag);
      console.log('NODE', node);
      node = node.childNodes[tag];
      if (!node) {
        break;
      }
    }
    console.log('NODENODE:', node);
    return (!node || node.isRoot) ? null : node;
  }

  /**
   * Return an array of tags for the node to which the annotation belongs
   * @param {string} annotationId
   */
  getTagsFromAnnotationId(annotationId) {
    var tags = [];

    this.walk((node) => {
      const annotations = (node.annotation ? [node.annotation] : [])
        .concat(node.childAnnotations);

      for (let anno of annotations) {
        if (anno['@id'] === annotationId) {
          tags = node.cumulativeTags;
          return true;
        }
      }
    });
    return tags;
  }

  /**
   * @param {object} annotation
   * @param {string[]} tags
   */
  matchHierarchy(annotation, tags) {
    var node = this.getNodeFromTags(tags);
    return node ? this.matchNode(annotation, node) : false;
  }

  matchNode(annotation, node) {
    var _this = this;
    var matched = false;

    if (!node.annotation) {
      logger.error('AnnotationToc#matchNode no annotation assigned to node', node.spec);
    }

    if (node.annotation && (node.annotation['@id'] === annotation['@id'])) {
      return true;
    }
    for (let anno of node.childAnnotations) {
      if (anno['@id'] === annotation['@id']) {
        matched = true;
        break;
      }
    }
    for (let childNode of Object.values(node.childNodes)) {
      if (_this.matchNode(annotation, childNode)) {
        matched = true;
        break;
      }
    }
    return matched;
  }

  registerLayerWithNode(node, layerId) {
    node.layerIds.add(layerId);
  }

  unassigned() {
    return this._unassigned;
  }

  numUnassigned() {
    return this._unassigned.length;
  }

  findAllChildAnnotations(node) {

  }

  /**
   * Traverses the Toc structure and calls visitCallback() for each node.
   * @param {function} visitCallback
   */
  walk(visitCallback) {
    this.visit(this.annoHierarchy, visitCallback);
  }

  visit(node, callback) {
    const _this = this;
    const sortedTags = Object.keys(node.childNodes).sort(function(a, b) {
      return _this.tagWeights[a] - _this.tagWeights[b];
    });

    for (let tag of sortedTags) {
      let childNode = node.childNodes[tag];
      let stop = callback(childNode);
      if (!stop) {
        _this.visit(childNode, callback);
      }
    }
  }
}
