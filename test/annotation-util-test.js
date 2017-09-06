import Anno from '../src/js/annotation-wrapper';
import AnnotationToc from '../src/js/annotation-toc';
import annoUtil from '../src/js/annotation-util';
import util from './test-util';

import { expect } from 'chai';

describe('findTocSiblings', function() {
  it('identifies siblings correctly', function() {
    const spec = {
      "generator": [
        {"tag": { "prefix": "chapter" }, "label": { "prefix": "Chapter "}, "max": 2 },
        {"tag": { "prefix": "scene" }, "label": { "prefix": "Scene "}, "max": 5 },
        {"tag": { "prefix": "p" }, "label": { "prefix": "Paragraph "}, "max": 5 }
      ]
    };

    const a_1 = util.createAnnotation({ chars: 'C1',  tags: ['chapter1'], layerId: '/layer/chapter' });
    const a_11 = util.createAnnotation({ chars: '1.1',  tags: ['chapter1', 'scene1'], layerId: '/layer/scene' });
    const a_111_e = util.createAnnotation({ chars: '1.1 p1',  tags: ['chapter1', 'scene1', 'p1'], layerId: '/layer/english' });
    const a_111_t = util.createAnnotation({ chars: '1.1 p1',  tags: ['chapter1', 'scene1', 'p1'], layerId: '/layer/tibetan' });
    const a_112_e = util.createAnnotation({ chars: '1.1 p2',  tags: ['chapter1', 'scene1', 'p2'], layerId: '/layer/english' });
    const a_112_t = util.createAnnotation({ chars: '1.1 p2',  tags: ['chapter1', 'scene1', 'p2'], layerId: '/layer/tibetan' });
    const a_2 = util.createAnnotation({ chars: 'C2',  tags: ['chapter2'], layerId: 'layer/chapter' });
    const a_201_e = util.createAnnotation({ chars: '2 p1',  tags: ['chapter2', 'scene0', 'p1'], layerId: '/layer/english' });
    const a_201_t = util.createAnnotation({ chars: '2 p1',  tags: ['chapter2', 'scene0', 'p1'], layerId: '/layer/tibetan' });

    const annotations = [a_1, a_11, a_111_e, a_111_t, a_112_e, a_112_t, a_2, a_201_e, a_201_t];
    const toc = new AnnotationToc(spec, annotations);

    let siblings = annoUtil.findTocSiblings(a_111_e, annotations, '/layer/tibetan', toc);
    expect(siblings).to.have.lengthOf(1);
    expect(siblings).to.include(a_111_t);

    console.log('hello');
    toc.print();

    siblings = annoUtil.findTocSiblings(a_201_t, annotations, '/layer/english', toc);
    expect(siblings).to.have.lengthOf(1);
    expect(siblings).to.include(a_201_e);
  });
});

describe('mergeTargets (deprecate?)', function() {

  it('merge single target into single', function() {
    const anno = {
      on: {
        full: '/canvas1',
        selector: {
          value: '<svg><path d="M1,1,2,1,2,2z"/></svg>'
        }
      }
    };
    const sourceTarget = {
      full: '/canvas2',
      selector: {
        value: '<svg><path d="M4,1,5,1,5,2z"/></svg>'
      }
    };
    annoUtil.mergeTargetsOld(anno, sourceTarget);
    expect(anno.on.length).to.equal(2);
    expect(anno.on[0].full).to.equal('/canvas1');
    expect(anno.on[0].selector.value).to.equal('<svg><path d="M1,1,2,1,2,2z"/></svg>');
    expect(anno.on[1].full).to.equal('/canvas2');
    expect(anno.on[1].selector.value).to.equal('<svg><path d="M4,1,5,1,5,2z"/></svg>');
  });

  it ('merge single target into multiple (deprecate?)', function() {
    const anno = {
      on: [
        {
          full: '/canvas1',
          selector: {
            value: '<svg><path d="M1,1,2,1,2,2z"/></svg>'
          }
        },
        {
          full: '/canvas2',
          selector: {
            value: '<svg><path d="M5,1,6,1,6,2z"/></svg>'
          }
        }
      ]
    };
    const sourceTarget = {
      full: '/canvas3',
      selector: {
        value: '<svg><path d="M4,1,5,1,5,2z"/></svg>'
      }
    };
    annoUtil.mergeTargetsOld(anno, sourceTarget);
    expect(anno.on.length).to.equal(3);
    expect(anno.on[0].full).to.equal('/canvas1');
    expect(anno.on[0].selector.value).to.equal('<svg><path d="M1,1,2,1,2,2z"/></svg>');
    expect(anno.on[1].full).to.equal('/canvas2');
    expect(anno.on[1].selector.value).to.equal('<svg><path d="M5,1,6,1,6,2z"/></svg>');
    expect(anno.on[2].full).to.equal('/canvas3');
    expect(anno.on[2].selector.value).to.equal('<svg><path d="M4,1,5,1,5,2z"/></svg>');
  });
});
