import Anno from './annotation-wrapper';
import AnnotationToc from './annotation-toc';
import annoUtil from './annotation-util';

let logger = null;

export default class AnnotationExplorer {
  constructor(options) {
    this.options = jQuery.extend({
      dataSource: null,
      tocSpec: null,
      logger: { debug: () => null, info: () => null, error: () => null }
    }, options);
    logger = this.options.logger;
    logger.debug('AnnotationExplorer#constructor options:', options);
    this.AnnotationToc = null;
  }

  getLayers() {
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
  async getAnnotations(options) {
    logger.debug('AnnotationExplorer#getAnnotations options:', options);
    const annotations = await this.options.dataSource.getAnnotations(options);
    this._generateInverseTargets(annotations)
    logger.debug('AnnotationExplorer#getAnnotations annotations:', annotations);
    return annotations;
  }

  createAnnotation(annotation) {
    return this.options.dataSource.createAnnotation(annotation);
  }

  updateAnnotation(annotation) {
    return this.options.dataSource.updateAnnotation(annotation);
  }

  deleteAnnotation(annotationId) {
    logger.debug('AnnotationExplorer#deleteAnnotation annotationId:', annotationId);
    const promise = this.options.dataSource.deleteAnnotation(annotationId);
    return promise;
  }

  updateAnnotationListOrder(canvasId, layerId, annoIds) {
    logger.debug('AnnotationExplorer#updateAnnotationListOrder');
    return this.options.dataSource.updateAnnotationListOrder(canvasId, layerId, annoIds);
  }

  getAnnotationToc() {
    return this.annotationToc;
  }

  reloadAnnotationToc(spec, annotations) {
    this.annotationToc = new AnnotationToc(spec, annotations);
    logger.debug('AnnotationExplorer#reloadAnnotationToc toc:', this.annotationToc.annoHierarchy);
  }

  _generateInverseTargets(annotations) {
    const annoMap = {};

    for (let anno of annotations) {
      annoMap[anno['@id']] = Anno(anno);
    }

    for (let anno of annotations) {
      for (let target of Anno(anno).targets) {
        let targetId = target.full;
        if (annoMap[targetId]) {
          annoMap[targetId].addInverseTarget(anno);
        }
      }
    }
  }
}
