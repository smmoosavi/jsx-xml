import type { ReactElement } from 'react';
import { create } from 'xmlbuilder2';
import { isElement } from 'react-is';

import type { XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces';
import { isJsxXmlElement } from './lib/jsx';
import { renderJsxXmlElement } from './render-jsx-xml';
import { renderReactElement } from './render-react';
export type { XMLBuilderCreateOptions, ReactElement };

export function render(element: any, options?: XMLBuilderCreateOptions) {
  let cur = create(options ?? {});

  if (isElement(element)) {
    return renderReactElement(cur, element);
  }
  if (isJsxXmlElement(element)) {
    return renderJsxXmlElement(cur, element);
  }
  throw new Error('Not implemented');
}
