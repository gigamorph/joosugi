import Anno from '../src/js/annotation-wrapper';
import annoUtil from '../src/js/annotation-util';
import util from './test-util';

import { expect } from 'chai';

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
