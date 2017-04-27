export default function Anno(oaAnnotation) {
  return new Annotation(oaAnnotation);
}

class Annotation {
  constructor(oaAnnotation) {
    this.oaAnnotation = oaAnnotation;
  }

  get layerId() {
    return this.oaAnnotation.layerId;
  }

  /**
   * @returns {Array} IDs of layers associated with the annotation
   */
  get layers() {
    return this.oaAnnotation.layers;
  }

  /**
   * Returns content of first text (non-tag) resource it finds from the annotation.
   */
  get bodyText() {
    const textResource = this._getTextResource();
    return textResource ? textResource.chars : null;
  }

  set bodyText(s) {
    const textResource = this._getTextResource();
    if (textResource) {
      textResource.chars = s;
      return true;
    } else {
      return false;
    }
  }

  get bodyStyle() {
    const textResource = this._getTextResource();
    return textResource ? textResource.style : null;
  }

  /**
   * Is Mirador implementation of tags IIIF non-conforming?
   */
  get tags() {
    const resources = this._makeArray(this.oaAnnotation.resource);
    const tags = [];

    for (let item of resources) {
      if (item['@type'] === "oa:Tag") {
        tags.push(item.chars);
      }
    }
    return tags;
  }

  hasTags(tags) {
    for (let annoTag of this.tags) {
      for (let tag of tags) {
        if (tag === annoTag) {
          return true;
        }
      }
    }
    return false;
  }

  get targets() {
    return this._makeArray(this.oaAnnotation.on);
  }

  /**
   * Add target ("on" attribute) to annotation
   */
  addTarget(target) {
    const anno = this.oaAnnotation;
    if (anno.on) {
      if (anno.on instanceof Array) {
        anno.on.push(target);
      } else {
        anno.on = [anno.on, target];
      }
    } else {
      anno.on = [target];
    }
  }

  _makeArray(object) {
    if (typeof object === 'null' || typeof object === 'undefined') {
      return [];
    }
    if (object instanceof Array) {
      return object;
    }
    return [object];
  }

  _getTextResource() {
    const resources = this._makeArray(this.oaAnnotation.resource);

    const items = resources.filter(item => item['@type'] === 'dctypes:Text');
    if (items.length > 0) {
      if (items.length > 1) {
        console.log('WARNING Annotation#_getTextResource too many text items:', items.length);
      }
      return items[0];
    } else {
      return null;
    }
  }
}
