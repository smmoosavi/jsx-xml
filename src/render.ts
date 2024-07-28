import { create } from 'xmlbuilder2';
import { isElement } from 'react-is';

import type {
  XMLBuilder,
  XMLBuilderCreateOptions,
} from 'xmlbuilder2/lib/interfaces';
import { renderReactElement } from './react';
export type { XMLBuilderCreateOptions, XMLBuilder };

export function render(element: any, options?: XMLBuilderCreateOptions) {
  let cur = create(options ?? {});

  if (isElement(element)) {
    return renderReactElement(cur, element);
  }
  throw new Error('Not implemented');
}
