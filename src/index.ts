declare global {
  namespace JSX { // eslint-disable-line
    type IntrinsicElements = {
      [x in keyof HTMLElementTagNameMap]: Attrs<HTMLElementTagNameMap[x]>;
    };

    type Element = HTMLElement;

    type ElementAttributesProperty = {
      props: unknown;
    };

    type ElementChildrenAttribute = {
      children: unknown;
    };
  }
}

export type Component<Props, T extends HTMLElement> = (
  props?: Props,
  children?: Child[]
) => T;

export type Child = HTMLElement | string;

type HTMLElementStyle = {
  [x in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[x];
};
type LifecycleFns = {
  onEnter?: () => void;
  onExit?: () => void;
};
type Attrs<T extends HTMLElement> = (
  | { [x in keyof T]?: T[x] }
  | { style?: HTMLElementStyle }
) & {
  children?: Child[];
} & LifecycleFns;

function createHTMLElement<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  attrs?: Attrs<T>
): T {
  const r = document.createElement(tag) as T;

  if (attrs !== undefined) {
    for (const k in attrs) {
      if (k === "style") {
        for (const sk in attrs.style) {
          const hcksk = sk as unknown as number;

          if (attrs.style[hcksk] !== undefined)
            r.style[hcksk] = attrs.style[hcksk] || "";
        }
      } else {
        const hckk = k as keyof T;
        r[hckk] = (attrs as unknown as T)[hckk];
      }
    }

    if (!attrs.children) return r;

    attrs.children.forEach(x => r.append(x));
  }

  return r;
}

function createComponentElement<Props, T extends HTMLElement>(
  component: Component<Props, T>,
  props?: Props
): T {
  const r = component(props);

  return r;
}

export function el<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  attrs?: Attrs<T>,
  ...children: Child[]
): T;
export function el<Props, T extends HTMLElement>(
  component: Component<Props, T>,
  props?: Props,
  ...children: Child[]
): T;
export function el<Props, T extends HTMLElement>(
  type: keyof HTMLElementTagNameMap | Component<Props, T>,
  props?: Attrs<T> | Props,
  ...children: Child[]
): T {
  const propsWithChildren = {
    ...props,
    children
  };

  if (typeof type === "function") {
    return createComponentElement<Props, T>(type, propsWithChildren as Props);
  } else {
    return createHTMLElement<T>(type, propsWithChildren as Attrs<T>);
  }
}
