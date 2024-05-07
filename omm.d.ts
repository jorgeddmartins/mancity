declare module '*.svg' {
  const content: string;
  const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
  export const ReactComponent;
  export default content;
}

declare module '*.graphql' {
  const content: string;
  export default content;
}

declare const gtag: Gtag.Gtag;
