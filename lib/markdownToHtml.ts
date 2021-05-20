import math from 'remark-math';
import katex from 'rehype-katex';
import unified from 'unified';
import remark2rehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import markdown from 'remark-parse';
import prism from '@mapbox/rehype-prism';
import refractor from 'refractor';

function ipldsch(Prism) {
  Prism.languages.ipldsch = {
    typedef: {
      pattern: /^[ \t]*(?:type|advanced)[ \t][A-Z](_?[A-Za-z0-9])*\b/m,
      inside: {
        keyword: /^[ \t]*(type|advanced)/m,
        'class-name': /[\w]+$/,
      },
    },
    keyword: /\b(?:bool|int|float|string|bytes|null|nullable|optional)\b/,
    builtin: /\b(struct|union|enum)(?=[ \t]*\{)\b/,
    representation: {
      pattern: /^}[ \t]representation\b/m,
      inside: {
        builtin: /representation/,
      },
    },
    operator: /=/,
    number: /\b-?\d+\.?\d*(?:e[+-]?\d+)?\b/i,
    punctuation: /[(){}:[\]\|&]/,
    string: {
      pattern: /(")(?:\\[\s\S]|(?!\1)[^\\])*\1/,
      greedy: true,
    },
    comment: {
      pattern: /(^|[^"])#.*/,
      lookbehind: true,
      greedy: true,
    },
  };
}

ipldsch.displayName = 'ipldsch';

export default function markdownToHtml(input: string): Promise<string> {
  if (!refractor.registered(ipldsch.displayName)) {
    refractor.register(ipldsch);
  }
  return unified()
    .use(markdown)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(stringify)
    .use(prism)
    .process(input)
    .then((output) => String(output));
}
