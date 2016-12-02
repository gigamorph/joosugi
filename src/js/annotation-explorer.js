import util from './annotation-util';

export default class AnnotationExplorer {
  constructor(options) {
    jQuery.extend(this, {
      dataSource: null
    }, options);
  }
  
  getLayers() {
    return this.dataSource.getLayers();
  }
  
  getAnnotations(options) {
    console.log('options: ' +  JSON.stringify(options));
    const promise = this.dataSource.getAnnotations(options.canvasId);
    
    return promise.then(function(annotations) {
      console.log('annos: ' +  JSON.stringify(annotations));
      if (options.layerId) {
        annotations = annotations.filter(function(anno) {
          for (let layerId of util.getLayers(anno)) {
            if (layerId === options.layerId) {
              return true;
            }
          }
          return false;
        });
        return annotations;
      }
    });
  }
}
