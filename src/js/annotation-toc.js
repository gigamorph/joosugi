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

    this.spec = spec;
    this.annotations = annotations;
    this._annoMap = {};
    for (let anno of annotations) {
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
     *   isRoot: A_BOOL // true if the node is the root
     * }
     */
    this._root = null;

    /**
     * Annotations that do not belong to the ToC structure.
     */
    this._unassigned = [];

    this.annoToNodeMap = {}; // key: annotation ID, value: node in annoHierarchy;
    this.init();
  }

  init(annotations) {
    logger.debug('AnnotationToc#init spec: ', this.spec);
    this._root = this._newNode(null, null); // root node
    this.parse(this.annotations);
  }

  /**
   * Find the node corresponding to the sequence of tags.
   * @param {...string} tags
   * @returns {object} a TOC node
   */
  getNode() {
    const tags = Array.from(arguments);
    let node = this._root;

    for (let tag of tags) {
      if (!node) {
        break;
      }
      node = node.childNodes[tag];
    }
    return (node === this._root) ? null : node;
  }

  findNodeForAnnotation(annotation) {
    return this.getNode.apply(this, annotation.tocTags);
  }

  getNodeFromTags(tags) {
    return this.getNode.apply(this, tags);
  }

  /**
   * Return an array of tags for the node to which the annotation belongs
   * @param {string} annotationId
   */
  getTagsFromAnnotationId(annotationId) {
    let tags = [];

    this.walk(node => {
      for (let anno of node.annotations) {
        if (anno['@id'] === annotationId) {
          tags = node.tags;
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
    const node = this.getNodeFromTags(tags);
    return node ? this.matchNode(annotation, node) : false;
  }

  matchNode(annotation, node) {
    let matched = false;

    let annos = node.canvasAnnotations.filter(anno => anno['@id'] === annotation['@id']);
    if (annos.length > 0) {
      return true;
    }

    annos = node.annotations.filter(anno => anno['@id'] === annotation['@id']);
    if (annos.length > 0) {
      return true;
    }

    for (let childNode of Object.values(node.childNodes)) {
      if (this.matchNode(annotation, childNode)) {
        return true;
      }
    }
    return false;
  }

  unassigned() {
    return this._unassigned;
  }

  numUnassigned() {
    return this._unassigned.length;
  }

  /**
   * Traverses the Toc structure and calls visitCallback() for each node.
   * @param {function} visitCallback
   */
  walk(visitCallback) {
    this._visit(this._root, visitCallback);
  }

  _visit(node, callback) {
    const sortedTags = Object.keys(node.childNodes).sort();

    for (let tag of sortedTags) {
      let childNode = node.childNodes[tag];
      let stop = callback(childNode);
      if (!stop) {
        this._visit(childNode, callback);
      }
    }
  }

  parse() {
    // First pass
    const remainingAnnotations = this._buildTocTree(this.annotations);
  }

  /**
   * Build a TOC structure
   * @return An array of annotations that are NOT assigned to a TOC node.
   */
  _buildTocTree(annotations) {
    const remainder = [];

    for (let annotation of annotations) {
      const $anno = Anno(annotation);
      const tags = $anno.tags;
      const success = this._buildChildNodes(annotation, tags, 0, this._root);

      if (!success) {
        remainder.push(annotation);
      }
    }
    return remainder;
  }

  /**
   * Recursively builds the TOC structure.
   * @param {object} annotation Annotation to be assigned to the parent node
   * @param {string[]} tags
   * @param {number} rowIndex Index of this._root
   * @param {object} parent Parent node
   * @return {boolean} true if the annotation was set to be a TOC node, false if not.
   */
  _buildChildNodes(annotation, tags, rowIndex, parent) {
    let currentNode = null;

    if (rowIndex >= this.spec.generator.length) { // all tags matched with no more levels to explore in the TOC structure
      if (parent.isRoot) { // The root is not a TOC node
        return false;
      } else { // Assign the annotation to parent (a TOC node)
        annotation.tocTags = parent.tags;
        if (annoUtil.hasTargetOnCanvas(annotation)) {
          parent.canvasAnnotations.push(annotation);
        }
        parent.annotations.push(annotation);
        this.annoToNodeMap[annotation['@id']] = parent;
        return true;
      }
    }

    const tag = this._getTagForLevel(tags, rowIndex);

    if (tag) { // one of the tags belongs to the corresponding level of tag hierarchy
      if (!parent.childNodes[tag]) {
        parent.childNodes[tag] = this._newNode(tag, parent);
      }
      currentNode = parent.childNodes[tag];

      if (parent.isRoot) {
        currentNode.label = this._extractTagNumber(tag);
      } else {
        currentNode.label = parent.label + '.' + this._extractTagNumber(tag);
      }
      return this._buildChildNodes(annotation, tags, rowIndex+1, currentNode);
    } else { // no more match before reaching a leaf node
      if (parent.isRoot) {
        return false;
      } else {
        annotation.tocTags = parent.tags;
        if (annoUtil.hasTargetOnCanvas(annotation)) {
          parent.canvasAnnotations.push(annotation);
        }
        parent.annotations.push(annotation);
        this.annoToNodeMap[annotation['@id']] = parent;
        return true;
      }
    }
  }

  _getTagForLevel(tags, level) {
    //logger.debug('AnnotationToc#_getTagForLevel tags:', tags, 'level:', level);
    const prefix = this.spec.generator[level].tag.prefix;

    for (let tag of tags) {
      if (tag.match('^' + prefix + '\\d+$')) {
        return tag;
      }
    }
    return null;
  }

  _extractTagNumber(tag) {
    return tag.match(/\d+$/)[0];
  }

  /**
   *
   * @param {*} tag
   * @param {*} parent parent node
   */
  _newNode(tag, parent) {
    if (!parent) { // root node
      return {
        isRoot: true,
        childNodes: {}
      };
    } else {
      const tags = parent.isRoot ? [tag] :
        parent.tags.concat([tag]);

      return {
        annotations: [],
        canvasAnnotations: [],
        tags: tags,
        label: '',
        childNodes: {}
      };
    }
  }
}
