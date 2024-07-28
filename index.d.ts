import { JSXElementConstructor } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces';
import { XMLBuilderCreateOptions } from 'xmlbuilder2/lib/interfaces';

export declare function CData(props: {
  children: TextChildren;
}): ReactElement<any, string | JSXElementConstructor<any>>;

declare function Comment_2(props: {
  children: TextChildren;
}): ReactElement<any, string | JSXElementConstructor<any>>;
export { Comment_2 as Comment };

export declare function Fragment(props: {
  children?: ReactNode;
}): ReactElement<any, string | JSXElementConstructor<any>>;

export declare function Ins(props: {
  target: string;
  content?: string;
}): ReactElement<any, string | JSXElementConstructor<any>>;

export declare function render(
  element: any,
  options?: XMLBuilderCreateOptions,
): XMLBuilder;

declare type TextChild = string | number | boolean | null | undefined;

declare type TextChildren = TextChild | TextChildren[];

export {};
