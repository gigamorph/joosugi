import Anno from '../src/js/annotation-wrapper';
import annoUtil from '../src/js/annotation-util';
import AnnotationToc from '../src/js/annotation-toc';
import util from './test-util';

const expect = require('chai').expect;

describe('AnnotationToC', function() {

  let spec = null;
  let annotations = [];

  beforeEach(function() {
    spec = {
      "defaultLayer": "/layer/1",
      "generator": [
        {"tag": { "prefix": "chapter" }, "label": { "prefix": "Chapter "}, "max": 2,
         "descriptions": [
           "Chapter 1. Rise of the Planet of the Apes",
           "Chapter 2. Dawn of the Planet of the Apes"
         ]
        },
        {"tag": { "prefix": "scene" }, "label": { "prefix": "Scene "}, "max": 5 }
      ]
    };
    annotations = [
      util.createAnnotation({ chars: 'C1',  tags: ['chapter1'] }),
      util.createAnnotation({ chars: '1.1',  tags: ['chapter1', 'scene1'] }),
      util.createAnnotation({ chars: '1.2',  tags: ['chapter1', 'scene2'] }),
      util.createAnnotation({ chars: 'C2',  tags: ['chapter2'] }),
      util.createAnnotation({ chars: '2.1',  tags: ['chapter2', 'scene1'] }),
      util.createAnnotation({ chars: '2.2',  tags: ['chapter2', 'scene2'] })
    ];
  });

  it('should generate a correct ToC structure', function() {
    let toc = new AnnotationToc(spec, annotations);
    let node = toc.getNode('chapter1');
    expect(node.tags.length, 'tags.length').to.equal(1);
    expect(node.tags[0]).to.equal('chapter1');
    expect(node.annotations.length).to.equal(1);
    expect(node.canvasAnnotations.length).to.equal(1);
    expect(node.label).to.equal('1');
    expect(Anno(node.canvasAnnotations[0]).bodyText).to.equal('C1');

    node = toc.getNode('chapter1', 'scene2');
    expect(node.tags.length).to.equal(2);
    expect(node.tags[0]).to.equal('chapter1');
    expect(node.tags[1]).to.equal('scene2');
    expect(node.label).to.equal('1.2');
    expect(node.annotations.length).to.equal(1);
    expect(node.canvasAnnotations.length).to.equal(1);
    expect(Anno(node.canvasAnnotations[0]).bodyText).to.equal('1.2');
  });
});
