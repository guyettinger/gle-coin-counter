import { createGlobalStyle, css } from 'styled-components'

const styles = css`
  // your global styles
  :root {
    --font: Roboto, Oxygen, Ubuntu, Fira, 'Droid Sans', san-serif;
    --font-mono: 'Roboto Mono', 'Oxygen Mono', 'Ubuntu Monospace', 'Source Code Pro',
    'Fira Mono', 'Droid Sans Mono', 'Courier New', monospace;
  }

  @media (prefers-color-scheme: light) {
    :root {
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
    }
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    font-family: var(--font);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  pre, code {
    font-family: var(--font-mono);
  }

  @media (prefers-color-scheme: light) {
    html {
      color-scheme: dark;
    }
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export const GlobalStyles = createGlobalStyle`
  ${styles}
`