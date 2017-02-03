import annoUtil from '../src/js/annotation-util';
import util from './test-util';

import { expect } from 'chai';

describe('getText', function() {
  it('should get correct text from the annotation object', function() {
    const text = '<p>Chapter 1</p>';
    const anno = util.createAnnotation({ chars: text });
    const annoText = annoUtil.getText(anno);
    expect(annoText).to.equal(text);
  });
});

describe('getTargetCanvasIds', function() {
  it('chain of single targets', function() {
    const anno1 = util.createAnnotation({ id: 'anno1', 
      on: { type: 'canvas', targetId: 'canvas1' } });
    const anno2 = util.createAnnotation({ id: 'anno2', 
      on: { type: 'anno', targetId: 'anno1'} });
    const anno3 = util.createAnnotation({ id: 'anno3',
      on: { type: 'anno', targetId: 'anno2'} });
    const annos = [anno1, anno2, anno2];

    let canvasIds = annoUtil.getTargetCanvasIds(anno1, {annotations: annos});
    expect(canvasIds.length).to.equal(1);
    expect(canvasIds[0]).to.equal('canvas1');
    
    canvasIds = annoUtil.getTargetCanvasIds(anno2, {annotations: annos});
    expect(canvasIds.length).to.equal(1);
    expect(canvasIds[0]).to.equal('canvas1');
    
    canvasIds = annoUtil.getTargetCanvasIds(anno3, {annotations: annos});
    expect(canvasIds.length).to.equal(1);
    expect(canvasIds[0]).to.equal('canvas1');
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