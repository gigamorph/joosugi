import AnnotationToc from './annotation-toc';
import annoUtil from './annotation-util';

export default class AnnotationExplorer {
  constructor(options) {
    this.options = jQuery.extend({
      dataSource: null,
      tocSpec: null
    }, options);
    this.AnnotationToc = null;
  }

  getLayers() {
    return this.options.dataSource.getLayers();
  }

  getAnnotations(options) {
    console.log('AnnotationExplorer#getAnnotations options:', options);
    return this.options.dataSource.getAnnotations(options);
  }

  createAnnotation(annotation) {
    return this.options.dataSource.createAnnotation(annotation);
  }

  updateAnnotation(annotation) {
    return this.options.dataSource.updateAnnotation(annotation);
  }

  deleteAnnotation(annotationId) {
    console.log('AnnotationExplorer#deleteAnnotation annotationId:', annotationId);
    const promise = this.options.dataSource.deleteAnnotation(annotationId);
    return promise;
  }

  updateAnnotationListOrder(canvasId, layerId, annoIds) {
    console.log('AnnotationExplorer#updateAnnotationListOrder');
    return this.options.dataSource.updateAnnotationListOrder(canvasId, layerId, annoIds);
  }

  getAnnotationToc() {
    return this.annotationToc;
  }

  reloadAnnotationToc(spec, annotations) {
    this.annotationToc = new AnnotationToc(spec, annotations);
    console.log('AnnotationExplorer#reloadAnnotationToc toc:', this.annotationToc.annoHierarchy);
  }
}
