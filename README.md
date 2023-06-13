# Figma Insights

[![TypeScript version][ts-badge]][typescript-5-0]
[![Node.js version][nodejs-badge]][nodejs]

For extracing useful values and information from a figma document that can be used in a project's initial configuration. This extracts all style nodes from a figma dock and converts them to usable code for use in SCSS.

```
npm install
npm run build
npm run start
```

Simply give the app a file ID and it will return a JSON object.

```
localhost:3000?fildId={figmaDocID}
```