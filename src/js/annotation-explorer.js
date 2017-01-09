import annoUtil from './annotation-util';

export default class AnnotationExplorer {
  constructor(options) {
    this.options = jQuery.extend({
      dataSource: null,
      tocSpec: null
    }, options);
  }

  getLayers() {
    return this.options.dataSource.getLayers();
  }

  getAnnotations(canvasId) {
    console.log('AnnotationExplorer#getAnnotations canvasId:', canvasId);
    return this.options.dataSource.getAnnotations(canvasId);
  }

  createAnnotation(annotation) {
    return this.options.dataSource.createAnnotation(annotation);
  }
  
  updateAnnotation(annotation) {
    return this.options.dataSource.updateAnnotation(annotation);
  }
  
  deleteAnnotation(annotation) {
    return this.options.dataSource.deleteAnnotation(annotation);
  }
  
  updateAnnotationListOrder(canvasId, layerId, annoIds) {
    console.log('AnnotationExplorer#updateAnnotationListOrder');
    return this.options.dataSource.updateAnnotationListOrder(canvasId, layerId, annoIds);
  }

  getAnnotationToc() {
    return this.annotationToc;
  }
}
